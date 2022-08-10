import React from "react";
import PropTypes from "prop-types";

const Spacer = (props) => {
  return <div style={{ height: `${props.height}px` }} />;
};
Spacer.propTypes = {
  height: PropTypes.number,
};

export default Spacer;
