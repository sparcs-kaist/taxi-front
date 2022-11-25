import React from "react";
import RLayout from "components/common/RLayout";
import { useRecoilValue } from "recoil";
import loginInfoDetailAtom from "recoil/loginInfoDetail";
import myRoomAtom from "recoil/myRoom";
import theme from "styles/theme";
import moment, { getToday } from "tools/moment";
import { ReactComponent as TaxiLogoWhite } from "static/assets/TaxiLogoWhite.svg";

const InfoSection = () => {
  const styleContainer: CSS = {
    position: "relative",
    height: "fit-content",
    width: "100%",
    paddingTop: "5px",
    background:
      "linear-gradient(to right top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.1) 100%)",
  };
  const styleName: CSS = {
    ...theme.font28,
    color: theme.white,
    margin: "32px 0 12px",
  };

  const loginInfo = useRecoilValue(loginInfoDetailAtom);
  const myRoom = useRecoilValue(myRoomAtom);
  const sortedMyRoom = myRoom?.ongoing
    .slice()
    .sort((a, b) => (a.time > b.time ? 1 : -1));

  const getMessage = () => {
    const notDeparted = sortedMyRoom?.find((room) => !room.isDeparted);
    const notOver = myRoom?.ongoing.find((room) => !room.isOver);
    if (!myRoom?.ongoing.length) {
      return "현재 참여중인 방이 없습니다.";
    } else if (notDeparted) {
      const departure = moment(notDeparted.time);
      const diffDays = departure.diff(getToday(), "days");
      if (diffDays === 0) {
        return "오늘 출발하는 방이 있습니다.";
      } else {
        return `${diffDays}일 후 출발 예정인 방이 있습니다.`;
      }
    } else if (notOver) {
      return "현재 정산/결제가 완료되지 않은 방이 있습니다.\n아래 방을 눌러 완료해주세요.";
    }
  };

  return (
    <div className="info-section" style={styleContainer}>
      <RLayout.R1>
        <div style={{ padding: "25px 20px 32px" }}>
          <TaxiLogoWhite />
          <div style={styleName}>안녕하세요, {loginInfo?.nickname}님!</div>
          <div style={{ ...theme.font14, color: theme.white }}>
            {getMessage()}
          </div>
        </div>
      </RLayout.R1>
    </div>
  );
};
export default InfoSection;
