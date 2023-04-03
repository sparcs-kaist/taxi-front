import { memo, useEffect, useState } from "react";

import Button from "components/Button";
import Modal from "components/Modal";
import WhiteContainer from "components/WhiteContainer";

import Picker from "./Picker";

import { time2str } from "tools/moment";
import theme from "tools/theme";

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

const optionsHour = Array.from(Array(24).keys()).map((num) => time2str(num));
const optionsMin = Array.from(Array(6).keys()).map((num) => time2str(num * 10));

const PopupInput = (props: PopupInputProps) => {
  const [hour, setHour] = useState(optionsHour[0]);
  const [min, setMin] = useState(optionsMin[0]);

  const resetValue = () => {
    setHour(time2str(props.value[0]));
    setMin(time2str(props.value[1]));
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

  const style = {
    height: "266px",
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
  const styleBtnContainer = {
    display: "flex",
    justifyContent: "space-between",
    margin: "0px 10px",
  };

  return (
    <Modal
      isOpen={props.isOpen}
      onChangeIsOpen={() => props.onClose()}
      onEnter={onClick}
      displayCloseBtn={false}
    >
      <div style={style}>
        <div style={styleContainer}>
          <ScheduleRoundedIcon style={{ fontSize: "16px" }} />
          <div style={{ marginLeft: "6px" }}>시간 :</div>
          <div style={stylePicker}>
            <Picker
              optionGroups={{ hour: optionsHour }}
              valueGroups={{ hour: hour }}
              onChange={handler}
            />
          </div>
          <div style={styleText}>시</div>
          <div style={stylePicker}>
            <Picker
              optionGroups={{ min: optionsMin }}
              valueGroups={{ min: min }}
              onChange={handler}
            />
          </div>
          <div style={styleText}>분</div>
        </div>
        <div style={styleBtnContainer}>
          <Button
            type="gray"
            width="calc(40% - 10px)"
            padding="10px 0 9px"
            radius={8}
            font={theme.font14}
            onClick={props.onClose}
          >
            취소
          </Button>
          <Button
            type="purple"
            width="60%"
            padding="10px 0 9px"
            radius={8}
            font={theme.font14_bold}
            onClick={onClick}
          >
            선택하기
          </Button>
        </div>
      </div>
    </Modal>
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
    fontSize: "16px",
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
          {time2str(props.value[0])}
        </div>
        <div style={styleText}>시</div>
        <div style={styleInput} onClick={() => setPopup(true)}>
          {time2str(props.value[1])}
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

export default memo(Time);
