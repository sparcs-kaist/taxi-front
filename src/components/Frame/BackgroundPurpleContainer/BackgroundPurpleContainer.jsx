import React, { Component } from "react";
import PropTypes from "prop-types";

class BackgroundPurpleContainer extends Component {
  render() {
    return (
      <div
        style={{
          marginTop: "20px",
          boxShadow:
            "0px 1.5px 1px -0.5px rgba(110, 54, 120, 0.04), 0px 2.5px 1px -0.5px rgba(110, 54, 120, 0.02), 0px 2px 3px -1px rgba(110, 54, 120, 0.1)",
          borderRadius: "6px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "relative",
            padding: this.props.padding,
            background: "#FAF8FB",
          }}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

BackgroundPurpleContainer.propTypes = {
  // FIXME specify type
  children: PropTypes.any,
  padding: PropTypes.any,
};
BackgroundPurpleContainer.defaultProps = {
  padding: "11px",
};

export default BackgroundPurpleContainer;
