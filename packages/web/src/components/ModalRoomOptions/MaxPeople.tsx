import { memo } from "react";

import WhiteContainer from "@/components/WhiteContainer";

import theme from "@/tools/theme";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";

type CounterProps = {
  min: number;
  max: number;
  number: number;
  setNumber: (number: number) => void;
};

type MaxPeopleProps = {
  value: number;
  handler: (number: number) => void;
};

const Counter = (props: CounterProps) => {
  const { min, max, number, setNumber } = props;
  const decreaseDisabled = number <= min;
  const increaseDisabled = number >= max;

  const styleContainer: CSS = {
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

  const styleButton: CSS = {
    fontSize: "14px",
    height: "20px",
    padding: "3px",
    boxSizing: "border-box",
    borderRadius: "3px",
    boxShadow: theme.shadow_color_button,
  };
  const styledDecreaseButton: CSS = {
    ...styleButton,
    color: decreaseDisabled ? theme.gray_text : theme.red_button,
    ...theme.cursor(decreaseDisabled),
    backgroundColor: decreaseDisabled
      ? theme.gray_background
      : theme.red_background,
  };
  const styleIncreaseButton: CSS = {
    ...styleButton,
    color: increaseDisabled ? theme.gray_text : theme.green_button,
    ...theme.cursor(increaseDisabled),
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

const MaxPeople = (props: MaxPeopleProps) => {
  const { value, handler } = props;
  const styleText: CSS = {
    ...theme.font14,
    margin: "0 8px 0 6px",
    whiteSpace: "nowrap",
  };

  return (
    <WhiteContainer css={{ padding: "9px" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <PeopleRoundedIcon style={{ fontSize: "16px", marginLeft: "15px" }} />
        <div style={styleText}>최대 인원 :</div>
        <Counter number={value} setNumber={handler} min={2} max={4} />
        <div style={styleText}>명</div>
      </div>
    </WhiteContainer>
  );
};

export default memo(MaxPeople);
