import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { date2str } from "tools/trans";
import Title from "components/common/Title";
import Modal from "components/common/modal/Modal";
import SubmitButton from "components/common/roomOptions/SubmitButton";
import PropTypes from "prop-types";
import axios from "tools/axios";

import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";
import CircleIcon from "@mui/icons-material/Circle";

const Border = () => {
  const styleLine = {
    height: "2px",
    margin: "5px 15px",
    backgroundImage:
      "linear-gradient(to right, #C8C8C8 50%, rgba(255,255,255,0) 0%)",
    backgroundPosition: "bottom",
    backgroundSize: "15px 2px",
    backgroundRpeat: "repeat-x",
  };

  return <div style={styleLine} />;
};

const PlaceSection = (props) => {
  const style = {
    width: "140px",
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
  if (!props?.roomInfo) return <></>;
  const { roomInfo } = props;
  const history = useHistory();
  const [disableJoinBtn, setDisableJoinBtn] = useState(false);
  const isRoomFull = roomInfo.maxPartLength - roomInfo.part.length === 0;

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

  useEffect(() => {
    axios.get("/json/logininfo/detail").then((res) => {
      const {
        data: { oid: userId },
      } = res;
      if (roomInfo.part.some((user) => user._id === userId))
        setDisableJoinBtn(true);
    });
  }, [roomInfo]);

  const getLocationName = (location) => location?.koName;

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
      btnCloseDisplay={true}
      onClickClose={props.onClose}
      padding={props.isMobile ? "0 10px 10px 10px" : "0 15px 15px 15px"}
    >
      <div style={{ height: "25px" }} />
      <div style={styleTitleWrapper}>
        <Title marginAuto={false}>{roomInfo.name}</Title>
      </div>
      <div style={{ height: "15px" }} />
      <Border />
      <div style={stylePlace}>
        <PlaceSection isFrom={true} name={getLocationName(roomInfo?.from)} />
        <ArrowRightAltRoundedIcon style={styleArrow} />
        <PlaceSection isFrom={false} name={getLocationName(roomInfo?.to)} />
      </div>
      <Border />
      <div style={styleInfoSectionWrapper}>
        <InfoSection
          title="출발 시각 & 날짜"
          text={date2str(roomInfo.time)}
          isBold
        />
        <div style={styleMultipleInfo}>
          <InfoSection
            title="동승자"
            text={roomInfo.part
              .reduce((acc, user) => {
                acc.push(user.nickname);
                return acc;
              }, [])
              .join(", ")}
          />
          <InfoSection
            title="남은 인원"
            text={`${roomInfo.maxPartLength - roomInfo.part.length}명`}
            isAlignLeft={false}
            isColored
          />
        </div>
      </div>
      <SubmitButton
        onClick={requestJoin}
        disable={isRoomFull || disableJoinBtn}
        marginAuto={false}
      >
        {disableJoinBtn
          ? "이미 참여 중입니다"
          : isRoomFull
          ? "인원이 0명인 방은 참여할 수 없습니다"
          : "참여 신청"}
      </SubmitButton>
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
