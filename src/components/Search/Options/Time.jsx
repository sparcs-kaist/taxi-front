import React, { useState, useEffect } from "react";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import PropTypes from "prop-types";
import WhiteContainer from "../../Frame/WhiteContainer/WhiteContainer";
import Popup from "./Popup";
import Picker from "react-scrollable-picker";

const optionsHour = [...Array(24).keys()].map((x) => x.toString());
const optionsMin = ["00", "15", "30", "45"];

const PopupInput = (props) => {
  const [value1, setValue1] = useState({ hour: optionsHour[9] });
  const [value2, setValue2] = useState({ min: optionsMin[0] });
  const option1Group = {
    hour: optionsHour.map((x) => {
      return { value: x, label: x };
    }),
  };
  const option2Group = {
    min: optionsMin.map((x) => {
      return { value: x, label: x };
    }),
  };

  const resetValue = () => {
    if (props.value[0]) setValue1({ hour: props.value[0] });
    else setValue1({ hour: optionsHour[9] });
    if (props.value[1]) setValue2({ min: props.value[1] });
    else setValue2({ min: optionsMin[0] });
  };
  useEffect(() => {
    if (props.isOpen) resetValue();
  }, [props.isOpen]);

  const onClick = () => {
    props.handler([value1.hour, value2.min]);
    props.onClose();
  };
  const handler = (key, value) => {
    if (key === "hour") setValue1({ hour: value });
    if (key === "min") setValue2({ min: value });
  };

  const height = 176;
  const stylePicker = {
    width: "100px",
    height: `${height}px`,
    background: "#EEEEEE",
    borderRadius: "6px",
    overflow: "hiddne",
  };
  const styleIcon = {
    alignSelf: "center",
    width: "18px",
    height: "18px",
  };
  const styleName = {
    alignSelf: "center",
    fontSize: "15px",
    color: "#323232",
    paddingLeft: "6px",
    paddingRight: "6px",
  };
  const styleText = {
    alignSelf: "center",
    fontSize: "15px",
    color: "#888888",
    paddingLeft: "5px",
    paddingRight: "5px",
  };

  return (
    <Popup isOpen={props.isOpen} onClose={props.onClose} onClick={onClick}>
      <div style={{ height: `${(216 - height) / 2}px` }} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <AccessTimeIcon style={styleIcon} />
        <div style={styleName}>시간 :</div>
        <div style={stylePicker}>
          <Picker
            optionGroups={option1Group}
            valueGroups={value1}
            onChange={handler}
            height={height}
          />
        </div>
        <div style={styleText}>시</div>
        <div style={stylePicker}>
          <Picker
            optionGroups={option2Group}
            valueGroups={value2}
            onChange={handler}
            height={height}
          />
        </div>
        <div style={styleText}>분</div>
      </div>
    </Popup>
  );
};
PopupInput.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  value: PropTypes.array,
  handler: PropTypes.func,
};

const Time = (props) => {
  const [isPopup, setPopup] = useState(false);

  const style = {
    display: "flex",
    alignItems: "center",
  };
  const styleIcon = {
    width: "14px",
    height: "14px",
    marginLeft: "15px",
  };
  const styleName = {
    height: "28px",
    lineHeight: "28px",
    marginLeft: "6px",
    whiteSpace: "nowrap",
    fontSize: "14px",
  };
  const styleInput = {
    height: "28px",
    lineHeight: "28px",
    width: "41px",
    marginLeft: "6px",
    background: "#FAF8FB",
    boxShadow: "inset 1px 1px 2.5px -1px rgba(110, 54, 120, 0.1)",
    borderRadius: "6px",
    fontSize: "14px",
    textAlign: "center",
  };
  const styleText = {
    lineHeight: "28px",
    marginLeft: "6px",
    fontSize: "14px",
  };
  return (
    <WhiteContainer marginAuto={false} padding="9px">
      <div style={style}>
        <AccessTimeIcon style={styleIcon} />
        <div style={styleName}>시간 :</div>
        <div style={styleInput} className="BTNC" onClick={() => setPopup(true)}>
          {props.value[0]}
        </div>
        <div style={styleText}>시</div>
        <div style={styleInput} className="BTNC" onClick={() => setPopup(true)}>
          {props.value[1]}
        </div>
        <div style={styleText}>분 이후</div>
      </div>
      <PopupInput
        isOpen={isPopup}
        onClose={() => setPopup(false)}
        value={props.value}
        handler={props.handler}
      />
    </WhiteContainer>
  );
};
Time.propTypes = {
  value: PropTypes.array,
  handler: PropTypes.func,
};

export default Time;
