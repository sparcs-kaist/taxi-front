import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import type { LayoutType } from "@/types/chat";

import useButterflyState from "@/hooks/useButterflyState";

import SideMenu from "./SideMenu";

import theme from "@/tools/theme";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import CloseFullscreenRoundedIcon from "@mui/icons-material/CloseFullscreenRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import OpenInFullRoundedIcon from "@mui/icons-material/OpenInFullRounded";

type HeaderProps = {
  layoutType: LayoutType;
  roomInfo: Nullable<Room>;
};

const Header = ({ layoutType, roomInfo }: HeaderProps) => {
  const history = useHistory();
  const butterflyState = useButterflyState();
  const [isOpenSideMenu, setIsOpenSideMenu] = useState(false);

  const style = {
    overflow: "hidden",
    background: layoutType === "fullchat" ? theme.white : theme.purple,
    boxShadow: theme.shadow_3,
    zIndex: theme.zIndex_nav,
    height: "40px",
    padding: "calc(max(5px, env(safe-area-inset-top)) + 12px) 20px 12px",
    transition: "height 0.3s",
    display: "flex",
    gap: "16px",
    alignItems: "center",
  };
  const styleIconLarge = {
    fill: layoutType === "fullchat" ? theme.purple : theme.white,
    ...theme.cursor(),
    width: "24px",
    height: "24px",
  };
  const styleIconSmall = {
    ...styleIconLarge,
    width: "22px",
    height: "22px",
  };
  const styleInfo = {
    flexGrow: 1,
    height: "40px",
    display: "flex",
    overflow: "hidden",
    flexDirection: "column" as any,
    justifyContent: "space-between",
  };
  const styleName = {
    color: layoutType === "fullchat" ? theme.purple : theme.white,
    ...theme.ellipsis,
    ...theme.font18,
  };
  const styleFromTo = {
    color: layoutType === "fullchat" ? theme.gray_text : theme.white,
    width: "100%",
    ...theme.ellipsis,
    ...theme.font12,
  };

  if (!roomInfo) return null;
  return (
    <>
      <SideMenu
        roomInfo={roomInfo}
        isOpen={isOpenSideMenu}
        setIsOpen={setIsOpenSideMenu}
      />
      <div css={style}>
        <ArrowBackRoundedIcon
          style={styleIconLarge}
          onClick={
            history.length <= 1
              ? () => history.replace("/myroom")
              : () => history.goBack()
          }
        />
        <div css={styleInfo}>
          <div css={styleName}>{roomInfo.name}</div>
          <div css={styleFromTo}>
            {roomInfo.from?.koName}&nbsp; → &nbsp;
            {roomInfo.to?.koName}
          </div>
        </div>
        {layoutType === "fullchat" && butterflyState !== "fold" && (
          <Link
            to={(location: RouterLocation) => ({
              ...location,
              pathname: `/myroom/${roomInfo._id}`,
            })}
            replace
          >
            <CloseFullscreenRoundedIcon style={styleIconSmall} />
          </Link>
        )}
        {layoutType === "sidechat" && (
          <Link to={`/chatting/${roomInfo._id}`}>
            <OpenInFullRoundedIcon style={styleIconSmall} />
          </Link>
        )}
        <MenuRoundedIcon
          style={styleIconLarge}
          onClick={() => setIsOpenSideMenu(true)}
        />
      </div>
    </>
  );
};

export default Header;
