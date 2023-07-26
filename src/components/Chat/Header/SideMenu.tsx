import DottedLine from "components/DottedLine";

import theme from "tools/theme";

import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import CalendarTodayRounded from "@mui/icons-material/CalendarTodayRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";

type SideMenuProps = {
  roomInfo: Room;
  fetchRoomInfo: () => void;
  isOpen: boolean;
  setIsOpen: (x: boolean) => void;
};

const SideMenu = ({
  roomInfo,
  fetchRoomInfo,
  isOpen,
  setIsOpen,
}: SideMenuProps) => {
  const styleBackground = {
    position: "absolute" as any,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: theme.black_40,
    zIndex: theme.zIndex_background,
    pointerEvents: isOpen ? "auto" : ("none" as any),
    opacity: isOpen ? 1 : 0,
    transition: "opacity 0.3s",
  };
  const style = {
    position: "absolute" as any,
    top: 0,
    right: isOpen ? 0 : "max(calc(-100% + 60px), -370px)",
    width: "min(calc(100% - 60px), 370px)",
    height: "100%",
    padding: "16px",
    boxSizing: "border-box" as any,
    background: theme.white,
    zIndex: theme.zIndex_modal - 1,
    transition: "right 0.3s",
  };
  const styleNameSection = {
    margin: "0 8px 16px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  };
  const styleIcon = {
    width: "16px",
    height: "16px",
    fill: theme.black,
  };
  const styleInfoSection = {
    padding: "20px 0",
  };
  const styleInfo = {
    ...theme.font14,
    color: theme.black,
  };

  return (
    <>
      <div css={styleBackground} onClick={() => setIsOpen(false)}></div>
      <div css={style}>
        <div css={styleNameSection}>
          <ArrowForwardRoundedIcon
            style={{ fontSize: "24px", fill: theme.purple }}
            onClick={() => setIsOpen(false)}
          />
          <div css={{ color: theme.purple, ...theme.font18 }}>
            {roomInfo.name}
          </div>
        </div>
        <DottedLine />
        <div css={styleInfoSection}>
          <div css={{ display: "flex", gap: "8px" }}>
            <LocationOnRoundedIcon css={styleIcon} />
            <div css={{ ...styleInfo, ...theme.font14_bold }}>
              {roomInfo.from?.koName}&nbsp; → &nbsp;{roomInfo.to?.koName}
            </div>
          </div>
          <div css={{ height: "16px" }} />
          <div css={{ display: "flex", gap: "8px" }}>
            <CalendarTodayRounded css={styleIcon} />
            <div css={styleInfo}>{roomInfo.time}</div>
          </div>
        </div>
        <DottedLine />
        <div css={styleInfoSection}>
          <div css={styleInfo}>
            <PeopleAltRoundedIcon css={styleIcon} />
            <div css={{ ...styleInfo }}>탑승인원 : ?명 / ?명</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
