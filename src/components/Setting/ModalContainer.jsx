import React, { Component } from "react";
import PropTypes from "prop-types";

class ModalContainer extends Component {
  render() {
    return (
      <div
        className="lay_auto ND"
        style={{
          marginBottom: "20px",
          boxShadow: "0px 1px 7.5px 2px rgba(0,0,0,0.05)",
          borderRadius: "15px",
          overflow: "hidden",
          minWidth: "460px",
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

ModalContainer.propTypes = {
  // FIXME specify type
  children: PropTypes.any,
  padding: PropTypes.any,
};
ModalContainer.defaultProps = {
  padding: "20px",
};

export default ModalContainer;
