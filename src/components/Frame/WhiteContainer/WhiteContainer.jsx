import React, { Component } from "react";
import PropTypes from "prop-types";

class WhiteContainer extends Component {
  constructor(props) {
    super(props);
    this.margin = "20px";
  }
  render() {
    return (
      <div
        className="lay_auto ND"
        style={{
          marginBottom: "20px",
          boxShadow: "0px 1px 7.5px 2px rgba(0,0,0,0.05)",
          borderRadius: "15px",
          overflow: "hidden",
        }}
      >
        <div
          style={{ position: "relative", padding: "20px", background: "white" }}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

WhiteContainer.propTypes = {
  // FIXME specify type
  children: PropTypes.any
}

export default WhiteContainer;
