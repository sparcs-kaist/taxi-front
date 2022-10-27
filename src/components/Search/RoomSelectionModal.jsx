import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import preferenceAtom from "recoil/preference";
import loginInfoDetailAtom from "recoil/loginInfoDetail";
import myRoomAtom from "recoil/myRoom";
import PropTypes from "prop-types";
import { date2str } from "tools/moment";
import { getLocationName } from "tools/trans";
import axios from "tools/axios";
import { theme } from "styles/theme";
import { MAX_PARTICIPATION } from "components/Myroom/Myroom";

import Title from "components/common/Title";
import Modal from "components/common/modal/Modal";
import Button from "components/common/Button";
import DottedLine from "components/common/DottedLine";
import Tooltip from "@mui/material/Tooltip";

import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";
import CircleIcon from "@mui/icons-material/Circle";

const PlaceSection = (props) => {
  const style = {
    width: "150px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "10px 0",
  };
  const styleIcon = {
    fontSize: "5px",
    opacity: "0.5",
  };
  const stylePlaceType = {
    fontSize: "12px",
    color: "#888888",
    margin: "5px 0",
  };
  const stylePlaceName = {
    height: "16px",
    lineHeight: "16px",
    textAlign: "center",
    fontSize: "16px",
    fontWeight: 700,
    color: "#6E3678",
    margin: "11px 0",
  };

  return (
    <div style={style}>
      <CircleIcon style={styleIcon} />
      <p style={stylePlaceType}>{props.isFrom ? "출발지" : "도착지"}</p>
      <p style={stylePlaceName}>{props.name}</p>
    </div>
  );
};
PlaceSection.propTypes = {
  isFrom: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
};

const InfoSection = (props) => {
  const style = {
    margin: "12px 0",
    display: "flex",
    flexDirection: "column",
    alignItems: props.isAlignLeft ? "flex-start" : "flex-end",
    maxWidth: "fit-content",
    flex: props.isBold || props.isColored ? "1 0" : "1 1",
  };
  const styleTitle = {
    fontSize: "12px",
    color: "#888888",
    marginBottom: "8px",
  };
  const styleText = {
    fontSize: "15px",
    color: props.isColored ? "#6E3678" : "#323232",
    fontWeight: props.isBold || props.isColored ? 700 : 400,
  };

  return (
    <div style={style}>
      <p style={styleTitle}>{props.title}</p>
      <p style={styleText}>{props.text}</p>
    </div>
  );
};
InfoSection.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isBold: PropTypes.bool,
  isColored: PropTypes.bool,
  isAlignLeft: PropTypes.bool,
};
InfoSection.defaultProps = {
  isBold: false,
  isColored: false,
  isAlignLeft: true,
};

const RoomSelectionModal = (props) => {
  const [roomInfo, setRoomInfo] = useState(null);
  const history = useHistory();
  const myRoom = useRecoilValue(myRoomAtom);
  const loginInfoDetail = useRecoilValue(loginInfoDetailAtom);
  const preference = useRecoilValue(preferenceAtom);
  const disableJoinBtn =
    roomInfo?.part.some((user) => user._id === loginInfoDetail?.oid) ?? true;
  const isRoomFull = roomInfo
    ? roomInfo.maxPartLength - roomInfo.part.length === 0
    : false;
  const fullParticipation = myRoom?.ongoing.length >= MAX_PARTICIPATION;

  useEffect(() => {
    if (props.isOpen) setRoomInfo(props.roomInfo);
  }, [props.isOpen]);

  const styleTitleWrapper = {
    padding: "0 20px 0 10px",
    maxWidth: "100%",
    overflowWrap: "anywhere",
  };
  const stylePlace = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const styleArrow = {
    height: "15px",
    width: "15px",
    color: "#888888",
  };
  const styleInfoSectionWrapper = {
    padding: "8px 20px",
  };
  const styleMultipleInfo = {
    display: "flex",
    justifyContent: "space-between",
  };

  const requestJoin = async () => {
    // TODO: request join api
    try {
      const result = await axios.post("/rooms/v2/join", {
        roomId: roomInfo._id,
      });
      if (result.status === 200) history.push(`/myroom/${roomInfo._id}`);
      else throw Error();
    } catch (_) {
      /**
       * @todo move to error page
       * - 409: already joined
       */
    }
  };

  return (
    <Modal
      display={props.isOpen}
      onClickClose={props.onClose}
      padding="0 12px 12px"
    >
      <div style={{ height: "25px" }} />
      <div style={styleTitleWrapper}>
        <Title>{roomInfo?.name ?? ""}</Title>
      </div>
      <div style={{ height: "15px" }} />
      <DottedLine direction="row" margin={12} />
      <div style={stylePlace}>
        <PlaceSection
          isFrom={true}
          name={getLocationName(roomInfo?.from, preference.lang)}
        />
        <ArrowRightAltRoundedIcon style={styleArrow} />
        <PlaceSection
          isFrom={false}
          name={getLocationName(roomInfo?.to, preference.lang)}
        />
      </div>
      <div style={styleInfoSectionWrapper}>
        <InfoSection
          title="출발 시각 & 날짜"
          text={date2str(roomInfo?.time) ?? ""}
          isBold
        />
        <div style={styleMultipleInfo}>
          <InfoSection
            title="동승자"
            text={
              roomInfo?.part
                .reduce((acc, user) => {
                  acc.push(user.nickname);
                  return acc;
                }, [])
                .join(", ") ?? ""
            }
          />
          <InfoSection
            title="남은 인원"
            text={
              roomInfo
                ? `${roomInfo.maxPartLength - roomInfo.part.length}명`
                : ""
            }
            isAlignLeft={false}
            isColored
          />
        </div>
      </div>
      <Tooltip
        title={"참여할 수 있는 방 개수는 최대 5개입니다."}
        componentsProps={{
          tooltip: {
            sx: {
              display: fullParticipation ? undefined : "none",
              ...theme.font12,
              color: theme.black,
              padding: "8px 10px 7px",
              marginTop: "20px !important",
              width: "148px",
              boxShadow: theme.shadow,
              backgroundColor: theme.white,
              textAlign: "center",
              whiteSpace: "normal",
              borderRadius: "8px",
              cursor: "default",
            },
          },
        }}
        enterTouchDelay={0}
        leaveTouchDelay={2000}
      >
        <div>
          <Button
            type="purple"
            disabled={isRoomFull || disableJoinBtn || fullParticipation}
            padding="10px 0px 9px"
            radius={8}
            font={theme.font14_bold}
            onClick={requestJoin}
          >
            {disableJoinBtn
              ? "이미 참여 중입니다"
              : isRoomFull
              ? "인원이 0명인 방은 참여할 수 없습니다"
              : fullParticipation
              ? "현재 5개의 방에 참여 중입니다"
              : "참여 신청"}
          </Button>
        </div>
      </Tooltip>
    </Modal>
  );
};
RoomSelectionModal.propTypes = {
  isOpen: PropTypes.bool,
  isMobile: PropTypes.bool,
  onClose: PropTypes.func,
  roomInfo: PropTypes.object,
};

export default RoomSelectionModal;
