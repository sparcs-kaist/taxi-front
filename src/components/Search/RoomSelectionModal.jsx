import React from "react";
import Title from "components/common/Title";
import Modal from "components/common/modal/Modal";
import PropTypes from "prop-types";

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
    fontWeight: "bold",
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

const RoomSelectionModal = (props) => {
  if (!props?.roomInfo) return <></>;
  const { roomInfo } = props;

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

  const getLocationName = (location) => location?.koName;

  return (
    <Modal
      display={props.isOpen}
      btnCloseDisplay={true}
      onClickClose={props.onClose}
      padding={props.isMobile ? "0 10px 10px 10px" : "0 15px 15px 15px"}
    >
      <Title header={true}>{roomInfo.name}</Title>
      <Border />
      <div style={stylePlace}>
        <PlaceSection isFrom={true} name={getLocationName(roomInfo?.from)} />
        <ArrowRightAltRoundedIcon style={styleArrow} />
        <PlaceSection isFrom={false} name={getLocationName(roomInfo?.to)} />
      </div>
      <Border />
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
