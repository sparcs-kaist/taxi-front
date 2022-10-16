import React, { CSSProperties } from "react";
import WhiteContainer from "components/common/WhiteContainer";

import PeopleIcon from "@material-ui/icons/PeopleAlt";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";

type CounterProps = {
  min: number;
  max: number;
  number: number;
  setNumber: (number: number) => void;
};

type MaxPartLengthProps = {
  value: number;
  handler: () => void;
};

const Counter = (props: CounterProps) => {
  const { min, max, number, setNumber } = props;
  const decreaseDisabled = number <= min;
  const increaseDisabled = number >= max;

  const styleContainer: CSSProperties = {
    height: "28px",
    width: "100%",
    padding: "4px",
    borderRadius: "6px",
    border: "none",
    outline: "none",
    backgroundColor: "#FAF8FB",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "14px",
    fontWeight: "400",
    textAlign: "center",
    boxSizing: "border-box",
  };

  const styleButton = {
    width: "20px",
    height: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "14px",
    borderRadius: "3px",
    boxShadow: "1px 1px 2.5px -0.5px rgba(110, 54, 120, 0.15)",
  };
  const styledDecreaseButton = {
    ...styleButton,
    backgroundColor: decreaseDisabled ? "#EEEEEE" : "#F9E8E7",
    cursor: decreaseDisabled ? "not-allowed" : "pointer",
  };
  const styleIncreaseButton = {
    ...styleButton,
    backgroundColor: increaseDisabled ? "#EEEEEE" : "#E6F7E4",
    cursor: increaseDisabled ? "not-allowed" : "pointer",
  };

  const styleIcon = {
    width: "14px",
    height: "14px",
  };
  const styleDecreaseIcon = {
    ...styleIcon,
    color: decreaseDisabled ? "#888888" : "#91313B",
  };
  const styleIncreaseIcon = {
    ...styleIcon,
    color: increaseDisabled ? "#888888" : "#23913C",
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

const MaxPartLength = (props: MaxPartLengthProps) => {
  const { value, handler } = props;

  const style = {
    display: "flex",
    alignItems: "center",
  };

  const iconStyle = {
    width: "14px",
    height: "14px",
    marginLeft: "15px",
  };

  const styleText: CSSProperties = {
    height: "28px",
    lineHeight: "28px",
    margin: "0 6px",
    whiteSpace: "nowrap",
    fontSize: "14px",
  };

  const styleCounterWrapper = {
    width: "80px",
  };

  return (
    <WhiteContainer padding="9px">
      <div style={style}>
        <PeopleIcon style={iconStyle} />
        <div style={styleText}>최대 인원 :</div>
        <div style={styleCounterWrapper}>
          <Counter number={value} setNumber={handler} min={2} max={4} />
        </div>
        <div style={styleText}>명</div>
      </div>
    </WhiteContainer>
  );
};

export default MaxPartLength;
