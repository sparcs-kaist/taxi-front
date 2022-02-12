import React, { Component } from "react";
import PropTypes from "prop-types";

class BackgroundPurpleContainer extends Component {
  render() {
    return (
      <div
        style={
          this.props.isSelected
            ? {
                marginTop: "20px",
                boxShadow:
                  "0px 2px 4px rgba(110, 54, 120, 0.2), 0px 1px 18px rgba(110, 54, 120, 0.12), 0px 6px 10px rgba(110, 54, 120, 0.14)",
                borderRadius: "6px",
                overflow: "hidden",
                height: "109px",
              }
            : {
                marginTop: "20px",
                boxShadow:
                  "0px 1.5px 1px -0.5px rgba(110, 54, 120, 0.04), 0px 2.5px 1px -0.5px rgba(110, 54, 120, 0.02), 0px 2px 3px -1px rgba(110, 54, 120, 0.1)",
                borderRadius: "6px",
                overflow: "hidden",
                height: "109px",
              }
        }
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
        <div
          style={
            this.props.isSelected
              ? {
                  position: "relative",
                  width: "8px",
                  height: "109px",
                  left: "0px",
                  top: "-109px",
                  background: "#6E3678",
                }
              : {
                  position: "relative",
                  width: "8px",
                  height: "120px",
                  left: "0px",
                  top: "-120px",
                }
          }
        ></div>
      </div>
    );
  }
}

BackgroundPurpleContainer.propTypes = {
  // FIXME specify type
  children: PropTypes.any,
  padding: PropTypes.any,
  isSelected: PropTypes.bool,
};
BackgroundPurpleContainer.defaultProps = {
  padding: "11px",
};

export default BackgroundPurpleContainer;
