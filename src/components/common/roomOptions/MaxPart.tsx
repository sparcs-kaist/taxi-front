import React, { CSSProperties } from "react";
import WhiteContainer from "components/common/WhiteContainer";
import { theme } from "styles/theme";

import PeopleRoundedIcon from "@material-ui/icons/PeopleRounded";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import AddRoundedIcon from "@material-ui/icons/AddRounded";

type CounterProps = {
  min: number;
  max: number;
  number: number;
  setNumber: (number: number) => void;
};

type MaxPartProps = {
  value: number;
  handler: (number: number) => void;
};

const Counter = (props: CounterProps) => {
  const { min, max, number, setNumber } = props;
  const decreaseDisabled = number <= min;
  const increaseDisabled = number >= max;

  const styleContainer: CSSProperties = {
    ...theme.font14,
    width: "80px",
    borderRadius: "6px",
    padding: "4px",
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.purple_light,
    boxShadow: theme.shadow_purple_input_inset,
  };

  const styleButton: CSSProperties = {
    ...theme.font14_icon,
    height: "20px",
    padding: "3px",
    boxSizing: "border-box",
    borderRadius: "3px",
    boxShadow: theme.shadow_color_button,
  };
  const styledDecreaseButton: CSSProperties = {
    ...styleButton,
    color: decreaseDisabled ? theme.gray_text : theme.red_button,
    cursor: theme.cursor(decreaseDisabled),
    backgroundColor: decreaseDisabled
      ? theme.gray_background
      : theme.red_background,
  };
  const styleIncreaseButton: CSSProperties = {
    ...styleButton,
    color: increaseDisabled ? theme.gray_text : theme.green_button,
    cursor: theme.cursor(increaseDisabled),
    backgroundColor: increaseDisabled
      ? theme.gray_background
      : theme.green_background,
  };

  const decrease = () => {
    if (!decreaseDisabled) setNumber(number - 1);
  };
  const increase = () => {
    if (!increaseDisabled) setNumber(number + 1);
  };

  return (
    <div style={styleContainer}>
      <div onClick={decrease} style={styledDecreaseButton}>
        <RemoveRoundedIcon fontSize="inherit" />
      </div>
      {number}
      <div onClick={increase} style={styleIncreaseButton}>
        <AddRoundedIcon fontSize="inherit" />
      </div>
    </div>
  );
};

const MaxPart = (props: MaxPartProps) => {
  const { value, handler } = props;
  const styleText: CSSProperties = {
    ...theme.font14,
    margin: "0 8px 0 6px",
    whiteSpace: "nowrap",
  };

  return (
    <WhiteContainer marginAuto={false} padding="9px">
      <div style={{ display: "flex", alignItems: "center" }}>
        <PeopleRoundedIcon
          style={{ ...theme.font15_icon, marginLeft: "15px" }}
        />
        <div style={styleText}>최대 인원 :</div>
        <Counter number={value} setNumber={handler} min={2} max={4} />
        <div style={styleText}>명</div>
      </div>
    </WhiteContainer>
  );
};

export default MaxPart;
