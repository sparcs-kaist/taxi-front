import React, { Component } from "react";
import CreateIcon from "@material-ui/icons/Create";
import PropTypes from "prop-types";
import WhiteContainer from "../../Frame/WhiteContainer/WhiteContainer";

const Place = (props) => {
  return <WhiteContainer marginAuto={false}>123</WhiteContainer>;
};
Place.propTypes = {
  value: PropTypes.array,
  handler: PropTypes.func,
};

export default Place;
