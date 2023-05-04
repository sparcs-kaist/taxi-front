import { useMemo } from "react";
import { Link } from "react-router-dom";

import Button from "components/Button";
import LinkLogin from "components/Link/LinkLogin";
import RLayout from "components/RLayout";
import Room from "components/Room";

import loginInfoAtom from "atoms/loginInfo";
import myRoomsAtom from "atoms/myRooms";
import { useRecoilValue } from "recoil";

import moment, { getToday } from "tools/moment";
import { randomTaxiSloganGenerator } from "tools/random";
import theme from "tools/theme";

import BackgroundImage from "static/assets/BackgroundImage.jpg";
import BackgroundImageDesktop from "static/assets/BackgroundImageDesktop.webp";
import BackgroundImageMobile from "static/assets/BackgroundImageMobile.webp";
import { ReactComponent as TaxiLogoWhite } from "static/assets/TaxiLogoWhite.svg";

const InfoSection = () => {
  const loginInfo = useRecoilValue(loginInfoAtom);
  const isLogin = !!loginInfo?.id;
  const myRooms = useRecoilValue(myRoomsAtom);
  const randomTaxiSlogan = useMemo(randomTaxiSloganGenerator, []);

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
      const departure = moment(notDeparted.time);
      const diffDays = departure.diff(getToday(), "days");
      if (diffDays === 0) {
        return { message: "오늘 출발하는 방이 있습니다.", room: notDeparted };
      } else if (diffDays < 2) {
        return {
          message: `${diffDays}일 후 출발 예정인 방이 있습니다.`,
          room: notDeparted,
        };
      } else {
        if (!notOver) {
          return {
            message: `${diffDays}일 후 출발 예정인 방이 있습니다.`,
            room: notDeparted,
          };
        }
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
      <RLayout.R1>
        <div css={{ padding: "25px 0 32px" }}>
          <TaxiLogoWhite />
          <div css={{ height: "32px" }} />
          <div css={styleTitle}>
            {isLogin
              ? `안녕하세요, ${loginInfo?.nickname}님!`
              : "카이스트 구성원 간 택시 동승자 모집 서비스, Taxi 입니다!"}
          </div>
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
                    padding="12px 20px 11px"
                    radius={8}
                    font={theme.font16_bold}
                  >
                    방 개설하기
                  </Button>
                </Link>
              ) : (
                <LinkLogin>
                  <Button
                    type="purple"
                    padding="12px 20px 11px"
                    radius={8}
                    font={theme.font16_bold}
                  >
                    로그인
                  </Button>
                </LinkLogin>
              )}
              <Link to="/search" css={{ textDecoration: "none" }}>
                <Button
                  type="white"
                  padding="12px 20px 11px"
                  radius={8}
                  font={theme.font16_bold}
                >
                  방 검색하기
                </Button>
              </Link>
            </div>
          )}
        </div>
      </RLayout.R1>
    </div>
  );
};
export default InfoSection;
