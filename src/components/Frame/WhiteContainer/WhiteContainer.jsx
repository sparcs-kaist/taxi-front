import React, { Component } from "react";
import PropTypes from "prop-types";

class WhiteContainer extends Component {
  render() {
    return (
      <div
        className={ this.props.layAuto ? "lay_auto ND" : "ND" }
        style={{
          marginBottom: "20px",
          boxShadow: "0px 1px 7.5px 2px rgba(0,0,0,0.05)",
          borderRadius: "15px",
          overflow: "hidden",
          minWidth: "270px",
        }}
      >
        <div
          style={{
            position: "relative",
            padding: this.props.padding,
            background: "white",
          }}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

WhiteContainer.propTypes = {
  // FIXME specify type
  children: PropTypes.any,
  padding: PropTypes.any,
  layAuto: PropTypes.bool
};
WhiteContainer.defaultProps = {
  padding: "20px",
  layAuto: true
};

export default WhiteContainer;
