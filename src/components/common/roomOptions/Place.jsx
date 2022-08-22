import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { useRecoilValue } from "recoil";
import { taxiLocataionWithName } from "recoil/taxiLocation";
import preferenceAtom from "recoil/preference";
import PropTypes from "prop-types";
import WhiteContainer from "components/common/WhiteContainer";
import Popup from "./Popup";
import Picker from "react-mobile-picker-mod";

const PopupInput = (props) => {
  const [value, setValue] = useState({
    place: props.value ?? props.placeOptions?.[0]?.name ?? "",
  });

  const optionGroup = {
    place: props.placeOptions.map((x) => {
      return x.name;
    }),
  };

  useEffect(() => {
    if (props.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [props.isOpen]);

  const onClick = () => {
    props.handler(
      props.placeOptions.find((place) => place.name === value.place) ?? null
    );
    props.onClose();
  };

  const handler = (_, changedValue) => {
    if (changedValue && value.place !== changedValue)
      setValue({ place: changedValue });
  };

  return (
    <Popup isOpen={props.isOpen} onClose={props.onClose} onClick={onClick}>
      <div style={{ width: "calc(100% - 20px)", marginLeft: "10px" }}>
        <Picker
          optionGroups={optionGroup}
          valueGroups={value}
          onChange={handler}
          itemHeight={30}
          height={216}
        />
      </div>
    </Popup>
  );
};
PopupInput.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  value: PropTypes.string,
  handler: PropTypes.func,
  placeOptions: PropTypes.array,
};

const PlaceElement = (props) => {
  const [isHover, setHover] = useState(false);

  const style = useSpring({
    width: "calc(50% - 10px)",
    background: `rgba(0,0,0,${isHover ? 0.04 : 0})`,
    borderRadius: "8px",
    config: { duration: 100 },
  });
  const styleCircle = {
    margin: "auto",
    marginTop: "18px",
    width: "3px",
    height: "3px",
    borderRadius: "1.5px",
    background: props.value ? "#888888" : "#323232",
  };
  const styleType = {
    height: "14px",
    marginTop: "5px",
    textAlign: "center",
    fontSize: "12px",
    letterSpacing: "0.03em",
    color: props.value ? "#888888" : "#323232",
  };
  const styleTextGrid = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 49,
  };
  const styleText = {
    lineHeight: "19px",
    textAlign: "center",
    fontSize: "16px",
    letterSpacing: "0.13em",
    fontWeight: "bold",
    color: props.value ? "#323232" : "#C8C8C8",
    wordBreak: "keep-all",
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
      <div style={styleTextGrid}>
        <div style={styleText}>
          {props.value
            ? props.value
            : props.type == "출발지"
            ? "어디서 가시나요?"
            : "어디로 가시나요?"}
        </div>
      </div>
    </animated.div>
  );
};
PlaceElement.propTypes = {
  value: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
};

const Place = (props) => {
  const [isPopup1, setPopup1] = useState(false);
  const [isPopup2, setPopup2] = useState(false);
  const taxiLocation = useRecoilValue(taxiLocataionWithName);
  const preference = useRecoilValue(preferenceAtom);

  const styleLine = {
    width: "0.5px",
    height: "calc(100% + 5px)",
    backgroundImage:
      "linear-gradient(to bottom, #C8C8C8 50%, rgba(255,255,255,0) 0%)",
    backgroundSize: "1px 10px",
    marginTop: -2.5,
  };

  const getPlaceName = (place) =>
    preference.lang === "ko" ? place?.koName : place?.enName;

  return (
    <WhiteContainer marginAuto={false} padding="10px">
      <div
        style={{
          height: "100px",
          display: "flex",
          position: "relative",
          justifyContent: "space-between",
          overflow: "hidden",
        }}
      >
        <PlaceElement
          value={getPlaceName(props.value[0])}
          onClick={() => setPopup1(true)}
          type="출발지"
        />
        <div style={styleLine} />
        <PlaceElement
          value={getPlaceName(props.value[1])}
          onClick={() => setPopup2(true)}
          type="도착지"
        />
      </div>
      <PopupInput
        isOpen={isPopup1}
        onClose={() => setPopup1(false)}
        value={getPlaceName(props.value[0])}
        handler={(x) => props.handler([x, props.value[1]])}
        placeOptions={taxiLocation}
      />
      <PopupInput
        isOpen={isPopup2}
        onClose={() => setPopup2(false)}
        value={getPlaceName(props.value[1])}
        handler={(x) => props.handler([props.value[0], x])}
        placeOptions={taxiLocation}
      />
    </WhiteContainer>
  );
};
Place.propTypes = {
  value: PropTypes.array,
  handler: PropTypes.func,
};

export default Place;
