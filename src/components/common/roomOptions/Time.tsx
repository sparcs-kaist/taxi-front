import React, { useState, useEffect } from "react";
import WhiteContainer from "components/common/WhiteContainer";
import Popup from "./Popup";
import Picker from "react-mobile-picker-mod";
import { theme } from "styles/theme";
import { get2digit } from "tools/moment";

import ScheduleRoundedIcon from "@material-ui/icons/ScheduleRounded";

type Page = "add" | "search";

interface TimeCommonProps {
  value: Array<number>;
  handler: (newValues: Array<number>) => void;
}

interface PopupInputProps extends TimeCommonProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TimeProps extends TimeCommonProps {
  page: Page;
}

const optionsHour = Array.from(Array(24).keys()).map((num) => get2digit(num));
const optionsMin = Array.from(Array(6).keys()).map((num) =>
  get2digit(num * 10)
);

const PopupInput = (props: PopupInputProps) => {
  const [hour, setHour] = useState(optionsHour[0]);
  const [min, setMin] = useState(optionsMin[0]);

  const resetValue = () => {
    setHour(get2digit(props.value[0]));
    setMin(get2digit(props.value[1]));
  };
  useEffect(() => {
    resetValue();
  }, [props.isOpen]);

  const onClick = () => {
    props.handler([parseInt(hour), parseInt(min)]);
    props.onClose();
  };
  const handler = (key: string, value: string) => {
    if (key === "hour") setHour(value);
    if (key === "min") setMin(value);
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
        <ScheduleRoundedIcon style={theme.font15_icon} />
        <div style={{ marginLeft: "6px" }}>시간 :</div>
        <div style={stylePicker}>
          <Picker
            optionGroups={{ hour: optionsHour }}
            valueGroups={{ hour: hour }}
            onChange={handler}
            itemHeight={29}
            height={221}
          />
        </div>
        <div style={styleText}>시</div>
        <div style={stylePicker}>
          <Picker
            optionGroups={{ min: optionsMin }}
            valueGroups={{ min: min }}
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

const Time = (props: TimeProps) => {
  const [isPopup, setPopup] = useState(false);

  const style = {
    display: "flex",
    alignItems: "center",
    ...theme.font14,
  };
  const styleIcon = {
    ...theme.font15_icon,
    margin: "0 2px 0 15px",
  };
  const styleText = {
    margin: "0 8px 0 4px",
  };
  const styleInput: CSS = {
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
    <WhiteContainer padding="9px">
      <div style={style}>
        <ScheduleRoundedIcon style={styleIcon} />
        <div style={styleText}>시간 :</div>
        <div style={styleInput} onClick={() => setPopup(true)}>
          {get2digit(props.value[0])}
        </div>
        <div style={styleText}>시</div>
        <div style={styleInput} onClick={() => setPopup(true)}>
          {get2digit(props.value[1])}
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

export default Time;
