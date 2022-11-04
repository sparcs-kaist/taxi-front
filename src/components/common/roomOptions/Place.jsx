import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { taxiLocataionWithName } from "recoil/taxiLocation";
import preferenceAtom from "recoil/preference";
import PropTypes from "prop-types";
import WhiteContainer from "components/common/WhiteContainer";
import Popup from "./Popup";
import Picker from "react-mobile-picker-mod";
import { theme } from "styles/theme";
import DottedLine from "components/common/DottedLine";
import MiniCircle from "components/common/MiniCircle";

const PopupInput = (props) => {
  const [value, setValue] = useState({
    place: props.value ?? props.placeOptions?.[0]?.name ?? "",
  });

  const optionGroup = {
    place: props.placeOptions.map((x) => {
      return x.name;
    }),
  };

  const onClick = () => {
    props.handler(
      props.placeOptions.find((place) => place.name === value.place)._id ?? null
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
          itemHeight={29}
          height={221}
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

  const style = {
    width: "calc(50% - 10px)",
    background: isHover ? theme.gray_background : undefined,
    borderRadius: "6px",
    transitionDuration: theme.duration,
    overflow: "hidden",
    padding: "18px 0 16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: theme.cursor(),
  };
  const styleType = {
    margin: "5px 0",
    textAlign: "center",
    color: props.value ? theme.gray_text : theme.black,
    ...theme.font12,
  };
  const styleTextGrid = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "39px",
  };
  const styleText = {
    ...theme.font16_bold,
    textAlign: "center",
    color: props.value ? theme.black : theme.gray_line,
    wordBreak: "keep-all",
    maxHeight: "100%",
    overflow: "hidden",
  };
  return (
    <div
      style={style}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={props.onClick}
    >
      <MiniCircle type={props.type} isRequired={!props.value} />
      <div style={styleType}>{props.type === "from" ? "출발지" : "도착지"}</div>
      <div style={styleTextGrid}>
        <div style={styleText}>
          {props.value ??
            (props.type === "from" ? "어디서 가시나요?" : "어디로 가시나요?")}
        </div>
      </div>
    </div>
  );
};
PlaceElement.propTypes = {
  value: PropTypes.string,
  type: PropTypes.oneOf(["from", "to"]),
  onClick: PropTypes.func,
};

const Place = (props) => {
  const [isPopup1, setPopup1] = useState(false);
  const [isPopup2, setPopup2] = useState(false);
  const taxiLocation = useRecoilValue(taxiLocataionWithName);
  const preference = useRecoilValue(preferenceAtom);

  const getPlaceName = (placeId) => {
    const place = taxiLocation.find((location) => location._id === placeId);
    return preference.lang === "ko" ? place?.koName : place?.enName;
  };

  return (
    <WhiteContainer padding="10px">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <PlaceElement
          value={getPlaceName(props.value[0])}
          onClick={() => setPopup1(true)}
          type="from"
        />
        <DottedLine direction="column" />
        <PlaceElement
          value={getPlaceName(props.value[1])}
          onClick={() => setPopup2(true)}
          type="to"
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
