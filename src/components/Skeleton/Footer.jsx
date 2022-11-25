import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <div style={{ height: "calc(88px + env(safe-area-inset-bottom))" }}></div>
    );
  }
}

export default Footer;
