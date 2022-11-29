import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import RLayout from "components/common/RLayout";
import { useRecoilValue } from "recoil";
import loginInfoDetailAtom from "recoil/loginInfoDetail";
import myRoomAtom from "recoil/myRoom";
import theme from "styles/theme";
import moment, { getToday } from "tools/moment";
import Button from "components/common/Button";

import Room from "components/common/room/Room";
import { ReactComponent as TaxiLogoWhite } from "static/assets/TaxiLogoWhite.svg";
import BackgroundImage from "static/assets/BackgroundImage.jpg";
import BackgroundImageMobile from "static/assets/BackgroundImageMobile.webp";
import BackgroundImageDesktop from "static/assets/BackgroundImageDesktop.webp";

const InfoSection = () => {
  const styleContainer: CSS = {
    position: "relative",
    height: "fit-content",
    width: "100%",
    paddingTop: "5px",
    background:
      "linear-gradient(to right top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.1) 100%)",
  };
  const styleImage: CSS = {
    backgroundSize: "cover",
    zIndex: -1,
    opacity: 0.8,
    width: "100%",
    height: "100%",
    position: "absolute",
    inset: "0px",
    objectFit: "cover",
  };
  const styleName: CSS = {
    ...theme.font28,
    color: theme.white,
    margin: "32px 0 12px",
  };

  const loginInfo = useRecoilValue(loginInfoDetailAtom);
  const myRoom = useRecoilValue(myRoomAtom);

  const { message, room } = useMemo(() => {
    const sortedMyRoom =
      myRoom?.ongoing.slice().sort((a, b) => (a.time > b.time ? 1 : -1)) ?? [];
    const notDeparted = sortedMyRoom.find((room) => !room.isDeparted);
    const notOver = sortedMyRoom.find(
      (room) => !room.isOver && room.isDeparted
    );
    if (!sortedMyRoom.length)
      return { message: "현재 참여중인 방이 없습니다.", room: null };
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
  }, [JSON.stringify(myRoom)]);

  return (
    <div className="info-section" style={styleContainer}>
      <picture>
        <source
          type="image/webp"
          style={styleImage}
          src={BackgroundImageDesktop}
          srcSet={`${BackgroundImageMobile} 430w, ${BackgroundImageDesktop} 1980w`}
        />
        <img style={styleImage} src={BackgroundImage} />
      </picture>
      <RLayout.R1>
        <div style={{ padding: "25px 0 32px" }}>
          <TaxiLogoWhite />
          <div style={styleName}>안녕하세요, {loginInfo?.nickname}님!</div>
          <div style={{ ...theme.font14, color: theme.white }}>{message}</div>
          {room ? (
            <Link to={`/myroom/${room._id}`} style={{ textDecoration: "none" }}>
              <Room data={room} marginTop="24px" />
            </Link>
          ) : (
            <div
              style={{ marginTop: "32px", display: "flex", columnGap: "10px" }}
            >
              <Link to="/search" style={{ textDecoration: "none" }}>
                <Button
                  type="purple"
                  padding="12px 20px 11px"
                  radius={8}
                  font={theme.font16_bold}
                >
                  방 검색하기
                </Button>
              </Link>
              <Link to="/addroom" style={{ textDecoration: "none" }}>
                <Button
                  type="white"
                  padding="12px 20px 11px"
                  radius={8}
                  font={theme.font16_bold}
                >
                  방 개설하기
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
