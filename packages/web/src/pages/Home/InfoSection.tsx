import { useMemo } from "react";
import { Link } from "react-router-dom";

import { useIsLogin, useValueRecoilState } from "@/hooks/useFetchRecoilState";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import Button from "@/components/Button";
import LinkLogin from "@/components/Link/LinkLogin";
import Room from "@/components/Room";
import BadgeImage from "@/components/User/BadgeImage";

import loginInfoAtom from "@/atoms/loginInfo";
import { useRecoilValue } from "recoil";

import moment, { getToday } from "@/tools/moment";
import { randomTaxiSloganGenerator } from "@/tools/random";
import theme from "@/tools/theme";

import BackgroundImage from "@/static/assets/BackgroundImage.jpg";
import BackgroundImageDesktop from "@/static/assets/BackgroundImageDesktop.webp";
import BackgroundImageMobile from "@/static/assets/BackgroundImageMobile.webp";
import { ReactComponent as TaxiLogoWhite } from "@/static/assets/sparcsLogos/TaxiLogoWhite.svg";
import { Padding } from "@mui/icons-material";

interface GaugeProps {
  value: number;
  max: number;
  width?: string;
  height?: string;
  bgColor?: string;
  fillColor?: string;
}

const Gauge: React.FC<GaugeProps> = ({
  value,
  max,
  width = "100%",
  height = "8px",
  bgColor = theme.gray_background,
  fillColor = theme.purple,
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  return (
    <div
      css={{
        width,
        height,
        backgroundColor: bgColor,
        borderRadius: "4px",
        overflow: "hidden",
        marginTop: "8px",
      }}
    >
      <div
        css={{
          width: `${percentage}%`,
          height: "100%",
          backgroundColor: fillColor,
          transition: "width 0.3s ease",
        }}
      />
    </div>
  );
};

const InfoSection = () => {
  const loginInfo = useRecoilValue(loginInfoAtom);
  const isLogin = useIsLogin();
  const myRooms = useValueRecoilState("myRooms");
  const randomTaxiSlogan = useMemo(randomTaxiSloganGenerator, []);

  const savedThisMonth = 8000;
  const maxMileage = 10000;

  const { message, room } = useMemo(() => {
    const sortedMyRoom =
      myRooms?.ongoing.slice().sort((a, b) => (a.time > b.time ? 1 : -1)) ?? [];
    const notDeparted = sortedMyRoom.find((room) => !room.isDeparted);
    const notOver = sortedMyRoom.find(
      (room) => !room.isOver && room.isDeparted
    );
    if (!sortedMyRoom.length)
      return { message: "현재 참여 중인 방이 없습니다.", room: null };
    if (notDeparted) {
      const departure = moment(moment(notDeparted.time).format("YYYY-MM-DD"));
      const diffDays = departure.diff(getToday().format("YYYY-MM-DD"), "days");
      if (diffDays === 0) {
        return { message: "오늘 출발하는 방이 있습니다.", room: notDeparted };
      } else if (diffDays === 1) {
        return {
          message: "내일 출발 예정인 방이 있습니다.",
          room: notDeparted,
        };
      } else if (!notOver) {
        return {
          message: `${diffDays}일 후 출발 예정인 방이 있습니다.`,
          room: notDeparted,
        };
      }
    }
    if (notOver) {
      return {
        message:
          "현재 정산/결제가 완료되지 않은 방이 있습니다.\n아래 방을 눌러 완료해주세요.",
        room: notOver,
      };
    }
    return { message: "", room: null };
  }, [JSON.stringify(myRooms)]);

  // 스타일 객체
  const styleContainer = {
    position: "relative" as any,
    height: "fit-content",
    width: "100%",
    paddingTop: "5px",
    background:
      "linear-gradient(to right top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.1) 100%)",
  };
  const styleImage = {
    backgroundSize: "cover",
    zIndex: -1,
    opacity: 0.8,
    width: "100%",
    height: "100%",
    position: "absolute" as any,
    inset: "0px",
    objectFit: "cover" as any,
  };
  const styleTitle = {
    ...theme.font28,
    wordBreak: "break-all" as any,
    color: theme.white,
    margin: "0 0 12px",
  };
  const styleSubTitle = { ...theme.font14, color: theme.white };
  const styleMileage = {
    ...styleTitle,
    ...theme.font20,
  };

  return (
    <div className="info-section" css={styleContainer}>
      <picture>
        <source
          type="image/webp"
          css={styleImage}
          src={BackgroundImageDesktop}
          srcSet={`${BackgroundImageMobile} 430w, ${BackgroundImageDesktop} 1980w`}
        />
        <img css={styleImage} src={BackgroundImage} />
      </picture>
      <AdaptiveDiv type="center">
        <div css={{ padding: "25px 0 32px" }}>
          <TaxiLogoWhite />
          <div css={{ height: "32px" }} />
          <div css={styleTitle}>
            {isLogin
              ? `안녕하세요, ${loginInfo?.nickname}님!`
              : "카이스트 구성원 간 택시 동승자 모집 서비스, Taxi 입니다!"}
          </div>
          {isLogin && (
            <>
              <div css={styleMileage}>
                이번 달,&nbsp;
                <span
                  css={{
                    ...styleMileage,
                    padding: "5px 10px",
                    borderRadius: "8px",
                    backgroundColor: theme.purple,
                  }}
                >
                  {savedThisMonth.toLocaleString()}원
                </span>
                을 절약했어요! <BadgeImage badge_size="1.5em" />
              </div>
              <div css={{ margin: "0px 0px 10px" }}>
                <Gauge
                  value={savedThisMonth}
                  max={maxMileage}
                  width="80%"
                  height="15px"
                />
              </div>
            </>
          )}
          <div css={styleSubTitle}>{isLogin ? message : randomTaxiSlogan}</div>
          {room ? (
            <Link to={`/myroom/${room._id}`} css={{ textDecoration: "none" }}>
              <Room data={room} marginTop="24px" />
            </Link>
          ) : (
            <div
              css={{ marginTop: "32px", display: "flex", columnGap: "10px" }}
            >
              {isLogin ? (
                <Link to="/addroom" css={{ textDecoration: "none" }}>
                  <Button
                    type="purple"
                    css={{
                      padding: "12px 20px 11px",
                      borderRadius: "8px",
                      ...theme.font16_bold,
                    }}
                  >
                    방 개설하기
                  </Button>
                </Link>
              ) : (
                <LinkLogin>
                  <Button
                    type="purple"
                    css={{
                      padding: "12px 20px 11px",
                      borderRadius: "8px",
                      ...theme.font16_bold,
                    }}
                  >
                    로그인
                  </Button>
                </LinkLogin>
              )}
              <Link to="/search" css={{ textDecoration: "none" }}>
                <Button
                  type="white"
                  css={{
                    padding: "12px 20px 11px",
                    borderRadius: "8px",
                    ...theme.font16_bold,
                  }}
                >
                  방 검색하기
                </Button>
              </Link>
            </div>
          )}
        </div>
      </AdaptiveDiv>
    </div>
  );
};

export default InfoSection;
