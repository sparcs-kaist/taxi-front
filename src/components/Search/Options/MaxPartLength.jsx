import React from "react";
import PropTypes from "prop-types";
import WhiteContainer from "@frames/WhiteContainer/WhiteContainer";
import Counter from "../../Frame/Counter/Counter";

import PeopleIcon from "@material-ui/icons/PeopleAlt";

const MaxPartLength = (props) => {
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

  const styleText = {
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
    <WhiteContainer marginAuto={false} padding="9px">
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

MaxPartLength.propTypes = {
  value: PropTypes.number,
  handler: PropTypes.func,
};

export default MaxPartLength;
