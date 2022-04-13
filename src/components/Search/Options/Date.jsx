import React from "react";
import PropTypes from "prop-types";
import WhiteContainer from "../../Frame/WhiteContainer/WhiteContainer";
import DatePicker from "../../Frame/DatePicker/DatePicker";

const Date = (props) => {
  return (
    <WhiteContainer marginAuto={false}>
      <DatePicker handler={props.handler} />
    </WhiteContainer>
  );
};
Date.propTypes = {
  value: PropTypes.array,
  handler: PropTypes.func,
};

export default Date;
