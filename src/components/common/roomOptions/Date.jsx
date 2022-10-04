import React from "react";
import PropTypes from "prop-types";
import WhiteContainer from "components/common/WhiteContainer";
import DatePicker from "components/common/roomOptions/DatePicker";

const Date = (props) => {
  return (
    <WhiteContainer padding="10px 15px 9px">
      <DatePicker
        selectedDate={props.value}
        handler={(x, y, z) => props.handler([x, y, z])}
      />
    </WhiteContainer>
  );
};
Date.propTypes = {
  value: PropTypes.array,
  handler: PropTypes.func,
};

export default Date;
