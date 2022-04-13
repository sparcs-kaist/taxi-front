import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import PropTypes from "prop-types";
import WhiteContainer from "../../Frame/WhiteContainer/WhiteContainer";
import Popup from "./Popup";

const PopupInput = (props) => {
  const onClick = () => {
    props.onClose();
  };
  return (
    <Popup isOpen={props.isOpen} onClose={props.onClose} onClick={onClick}>
      <div>출발 도착</div>
    </Popup>
  );
};
PopupInput.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  handler: PropTypes.func,
};

const PlaceElement = (props) => {
  const [isHover, setHover] = useState(false);

  const style = useSpring({
    width: "calc(50% - 5px)",
    background: `rgba(120,120,120,${isHover ? 0.05 : 0})`,
    borderRadius: "8px",
    config: { duration: 100 },
  });
  const styleCircle = {
    margin: "auto",
    marginTop: "18px",
    width: "3px",
    height: "3px",
    borderRadius: "2px",
    background: props.value ? "#888888" : "black",
  };
  const styleType = {
    height: "14px",
    lineHeight: "14px",
    marginTop: "5px",
    textAlign: "center",
    fontSize: "12px",
    color: props.value ? "#888888" : "black",
  };
  const styleText = {
    height: "19px",
    lineHeight: "19px",
    marginTop: "15px",
    textAlign: "center",
    fontSize: "16px",
    fontWeight: "bold",
    color: props.value ? "black" : "#C8C8C8",
  };
  return (
    <animated.div
      style={style}
      className="BTNC"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={props.onClick}
    >
      <div style={styleCircle} />
      <div style={styleType}>{props.type}</div>
      <div style={styleText}>
        {props.value ? props.value : "어디로 가나요?"}
      </div>
    </animated.div>
  );
};
PlaceElement.propTypes = {
  value: PropTypes.array,
  type: PropTypes.string,
  onClick: PropTypes.func,
};

const Place = (props) => {
  const [isPopup1, setPopup1] = useState(false);
  const [isPopup2, setPopup2] = useState(false);

  const styleLine = {
    width: "1px",
    height: "100%",
    backgroundImage:
      "linear-gradient(to bottom, #C8C8C8 50%, rgba(255,255,255,0) 0%)",
    backgroundPosition: "up",
    backgroundSize: "1px 14px",
    backgroundRpeat: "repeat-y",
  };

  return (
    <WhiteContainer marginAuto={false} padding="10px">
      <div
        style={{
          height: "100px",
          display: "flex",
          position: "relative",
          justifyContent: "space-between",
        }}
      >
        <PlaceElement
          value={props.value[0]}
          onClick={() => setPopup1(true)}
          type="출발지"
        />
        <div style={styleLine} />
        <PlaceElement
          value={props.value[1]}
          onClick={() => setPopup2(true)}
          type="도착지"
        />
      </div>
      <PopupInput
        isOpen={isPopup1}
        onClose={() => setPopup1(false)}
        handler={(x) => props.handler(x, props.value[1])}
      />
      <PopupInput
        isOpen={isPopup2}
        onClose={() => setPopup2(false)}
        handler={(x) => props.handler(props.value[0], x)}
      />
    </WhiteContainer>
  );
};
Place.propTypes = {
  value: PropTypes.array,
  handler: PropTypes.func,
};

export default Place;
