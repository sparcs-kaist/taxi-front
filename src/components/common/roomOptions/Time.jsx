import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import WhiteContainer from "components/common/WhiteContainer";
import Popup from "./Popup";
import Picker from "react-mobile-picker-mod";
import { theme } from "styles/theme";

import ScheduleRoundedIcon from "@material-ui/icons/ScheduleRounded";

const optionsHour = [...Array(24).keys()].map((x) => x.toString());
const optionsMin = ["0", "10", "20", "30", "40", "50"];

const PopupInput = (props) => {
  const [value1, setValue1] = useState({ hour: optionsHour[0] });
  const [value2, setValue2] = useState({ min: optionsMin[0] });
  const option1Group = {
    hour: optionsHour.map((x) => {
      return x;
    }),
  };
  const option2Group = {
    min: optionsMin.map((x) => {
      return x;
    }),
  };

  const resetValue = () => {
    setValue1({ hour: props.value[0] });
    setValue2({ min: props.value[1] });
  };
  useEffect(() => {
    resetValue();
    if (props.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [props.isOpen]);

  const onClick = () => {
    props.handler([value1.hour, value2.min]);
    props.onClose();
  };
  const handler = (key, value) => {
    if (key === "hour") setValue1({ hour: value });
    if (key === "min") setValue2({ min: value });
  };

  const styleContainer = {
    ...theme.font14,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const styleText = {
    color: theme.gray_text,
    marginLeft: "4px",
  };
  const stylePicker = {
    width: "64px",
    borderRadius: "6px",
    marginLeft: "8px",
  };

  return (
    <Popup isOpen={props.isOpen} onClose={props.onClose} onClick={onClick}>
      <div style={styleContainer}>
        <ScheduleRoundedIcon style={{ fontSize: "15px" }} />
        <div style={{ marginLeft: "6px" }}>시간 :</div>
        <div style={stylePicker}>
          <Picker
            optionGroups={option1Group}
            valueGroups={value1}
            onChange={handler}
            itemHeight={29}
            height={221}
          />
        </div>
        <div style={styleText}>시</div>
        <div style={stylePicker}>
          <Picker
            optionGroups={option2Group}
            valueGroups={value2}
            onChange={handler}
            itemHeight={29}
            height={221}
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
    ...theme.font14,
  };
  const styleIcon = {
    fontSize: "15px",
    margin: "0 2px 0 15px",
  };
  const styleText = {
    margin: "0 8px 0 4px",
  };
  const styleInput = {
    width: "41px",
    borderRadius: "6px",
    padding: "6px 0",
    background: theme.purple_light,
    boxShadow: theme.shadow_purple_input_inset,
    textAlign: "center",
    cursor: "pointer",
    boxSizing: "border-box",
  };
  return (
    <WhiteContainer marginAuto={false} padding="9px">
      <div style={style}>
        <ScheduleRoundedIcon style={styleIcon} />
        <div style={styleText}>시간 :</div>
        <div style={styleInput} onClick={() => setPopup(true)}>
          {props.value[0]}
        </div>
        <div style={styleText}>시</div>
        <div style={styleInput} onClick={() => setPopup(true)}>
          {props.value[1]}
        </div>
        <div style={styleText}>
          분 {props.page === "search" ? "이후" : "출발"}
        </div>
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
  page: PropTypes.string,
};

export default Time;
