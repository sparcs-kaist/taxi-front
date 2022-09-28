import React from "react";
import PropTypes from "prop-types";
import WhiteContainer from "components/common/WhiteContainer";
import { theme } from "styles/theme";

import PeopleIcon from "@material-ui/icons/PeopleAlt";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";

const Counter = (props) => {
  const { min, max, number, setNumber } = props;
  const decreaseDisabled = number <= min;
  const increaseDisabled = number >= max;

  const styleContainer = {
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

  const styleButton = {
    height: "20px",
    padding: "3px",
    boxSizing: "border-box",
    borderRadius: "3px",
    boxShadow: theme.shadow_color_button,
  };
  const styledDecreaseButton = {
    ...styleButton,
    cursor: theme.cursor(decreaseDisabled),
    backgroundColor: decreaseDisabled ? theme.gray_text : theme.red_background,
  };
  const styleIncreaseButton = {
    ...styleButton,
    cursor: theme.cursor(increaseDisabled),
    backgroundColor: increaseDisabled
      ? theme.gray_text
      : theme.green_background,
  };
  const styleDecreaseIcon = {
    fontSize: "14px",
    color: decreaseDisabled ? theme.gray_text : theme.red_button,
  };
  const styleIncreaseIcon = {
    fontSize: "14px",
    color: increaseDisabled ? theme.gray_text : theme.green_button,
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
        <RemoveIcon style={styleDecreaseIcon} />
      </div>
      {number}
      <div onClick={increase} style={styleIncreaseButton}>
        <AddIcon style={styleIncreaseIcon} />
      </div>
    </div>
  );
};

Counter.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  number: PropTypes.number,
  setNumber: PropTypes.func,
};

const MaxPeople = (props) => {
  const { value, handler } = props;
  const styleText = {
    ...theme.font14,
    margin: "0 8px 0 6px",
    whiteSpace: "nowrap",
  };

  return (
    <WhiteContainer padding="9px">
      <div style={{ display: "flex", alignItems: "center" }}>
        <PeopleIcon style={{ fontSize: "15px", marginLeft: "15px" }} />
        <div style={styleText}>최대 인원 :</div>
        <Counter number={value} setNumber={handler} min={2} max={4} />
        <div style={styleText}>명</div>
      </div>
    </WhiteContainer>
  );
};

MaxPeople.propTypes = {
  value: PropTypes.number,
  handler: PropTypes.func,
};

export default MaxPeople;
