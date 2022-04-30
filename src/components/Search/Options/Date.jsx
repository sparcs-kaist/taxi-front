import React from "react";
import PropTypes from "prop-types";
import WhiteContainer from "../../Frame/WhiteContainer/WhiteContainer";
import DatePicker from "../../Frame/DatePicker/DatePicker";

const Date = (props) => {
  return (
    <WhiteContainer marginAuto={false} padding="10px 15px 9px">
      <DatePicker handler={(x, y, z) => props.handler([x, y, z])} />
    </WhiteContainer>
  );
};
Date.propTypes = {
  value: PropTypes.array,
  handler: PropTypes.func,
};

export default Date;
