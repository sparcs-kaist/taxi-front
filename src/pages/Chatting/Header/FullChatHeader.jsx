import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import { useR2state } from "hooks/useReactiveState";

import DottedLine from "components/DottedLine";
import { ModalRoomShare } from "components/ModalPopup";

import HeaderBody from "./HeaderBody";

import theme from "tools/theme";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import CloseFullscreenRoundedIcon from "@mui/icons-material/CloseFullscreenRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import UnfoldLessRoundedIcon from "@mui/icons-material/UnfoldLessRounded";
import UnfoldMoreRoundedIcon from "@mui/icons-material/UnfoldMoreRounded";

const Header = (props) => {
  const bodyRef = useRef();
  const [isOpen, setOpen] = useState(false);
  const [isOpenShare, setIsOpenShare] = useState(false);
  const [bodyHeight, setBodyHeight] = useState(0);
  const history = useHistory();
  const reactiveState = useR2state();

  const style = {
    height: "calc(64px + max(5px, env(safe-area-inset-top)))",
  };
  const styleBgd = {
    position: "fixed",
    top: "5px",
    width: "100%",
    height: "100%",
    background: theme.black_40,
    zIndex: theme.zIndex_nav - 1,
    pointerEvents: isOpen ? "auto" : "none",
    opacity: isOpen ? 1 : 0,
    transition: "opacity 0.3s",
  };
  const styleHeader = {
    position: "absolute",
    width: "100%",
    overflow: "hidden",
    background: theme.white,
    boxShadow: theme.shadow_3,
    zIndex: theme.zIndex_nav,
    height: `${64 + (isOpen ? bodyHeight : 0)}px`,
    paddingTop: "max(5px, env(safe-area-inset-top))",
    transition: "height 0.3s",
  };
  const styleHeaderTop = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 20px",
    minHeight: "40px",
  };
  const styleIcon = {
    fill: theme.purple,
    ...theme.cursor(),
  };
  const styleInfo = {
    width: "100%",
    rowGap: "5px",
    margin: "0 8px 0 16px",
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  };
  const styleText = {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
  };

  const resizeEvent = () => {
    setBodyHeight(bodyRef.current?.clientHeight);
  };
  useEffect(() => {
    resizeEvent();
    window.addEventListener("resize", resizeEvent);
    return () => window.removeEventListener("resize", resizeEvent);
  }, [props.info]);

  console.log("!!");
  console.log(history);

  return (
    <div css={style}>
      <div css={styleBgd} onClick={() => setOpen(false)} />
      <div css={styleHeader}>
        <div css={styleHeaderTop}>
          <ArrowBackRoundedIcon
            style={styleIcon}
            onClick={
              history.length <= 1
                ? () => history.replace("/myroom")
                : () => history.goBack()
            }
          />
          <div css={styleInfo}>
            <div css={{ ...theme.font18, color: theme.purple, ...styleText }}>
              {props.info?.name}
            </div>
            <div
              css={{ ...theme.font12, color: theme.gray_text, ...styleText }}
            >
              {props?.info?.from?.koName}&nbsp; → &nbsp;
              {props?.info?.to?.koName}
            </div>
          </div>
          <ShareRoundedIcon
            style={{ ...styleIcon, marginRight: "18px", fontSize: "20px" }}
            onClick={() => setIsOpenShare(true)}
          />
          {reactiveState !== 3 && (
            <CloseFullscreenRoundedIcon
              style={{ ...styleIcon, marginRight: "12px", fontSize: "20px" }}
              onClick={() => history.replace(`/myroom/${props.info?._id}`)}
            />
          )}
          {isOpen ? (
            <UnfoldLessRoundedIcon
              style={styleIcon}
              onClick={() => setOpen(!isOpen)}
            />
          ) : (
            <UnfoldMoreRoundedIcon
              style={styleIcon}
              onClick={() => setOpen(!isOpen)}
            />
          )}
        </div>
        <div css={{ opacity: isOpen ? 1 : 0, transition: "opacity 0.3s" }}>
          <DottedLine direction="row" margin="0 16px" />
        </div>
        <div ref={bodyRef} css={{ padding: "16px" }}>
          <HeaderBody info={props.info} recallEvent={props.recallEvent} />
        </div>
      </div>
      <ModalRoomShare
        isOpen={isOpenShare}
        onChangeIsOpen={setIsOpenShare}
        roomInfo={props.info}
      />
    </div>
  );
};
Header.propTypes = {
  info: PropTypes.any,
  recallEvent: PropTypes.func,
};

export default Header;
