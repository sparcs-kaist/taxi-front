// 최상위 컴포넌트
// 로그인 여부를 체크하고, 로그인이 되어있지 않으면 로그인 페이지로 리다이렉트
// props 주석은 최하단 참조

import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "../Tool/axios";
import Navigation from "./Navigation";
import Footer from "./Footer";
import "./Frame.css";
import PropTypes from "prop-types";

const TopBar = (props) => {
  return (
    <div
      style={{
        background: "#663D71",
        width: "100%",
        height: "5px",
        position: "fixed",
        top: "0px",
        left: "0px",
      }}
    />
  );
};

class Frame extends Component {
  constructor(props) {
    // constructor 에서 빼기
    super(props);

    this.state = { loginCheck: undefined };
    axios
      .get("/json/logininfo")
      .then((userInfo) => {
        if (userInfo.data.id) this.setState({ loginCheck: true });
        else this.setState({ loginCheck: false });
      })
      .catch((error) => {
        console.log("axios error : " + error); // FIXME: 추후 수정 바람
      });
  }
  render() {
    if (this.state.loginCheck === undefined) {
      // 백 서버 offline인 경우 (FIXME)
      return (
        <div id="main-container">
          <Navigation selected={this.props.navi} />
          <TopBar />
        </div>
      );
    } else if (this.state.loginCheck === false) {
      // 로그인이 되어 있지 않은 경우(백 서버 online), 로그인 페이지로 리다이렉트
      return <Redirect to={"/login?redirect=" + window.location.pathname} />;
    } else {
      // 로그인이 되어있는 경우
      return (
        <div id="main-container">
          {this.props.children}
          <Footer />
          <Navigation selected={this.props.navi} />
          <TopBar />
        </div>
      );
    }
  }
}

Frame.propTypes = {
  // FIXME: specify type
  // navi: 하단 바에 어떤 항목이 선택되어있어야 하는가?
  // children: ??
  navi: PropTypes.string,
  children: PropTypes.any,
};
Frame.defaultProps = {
  children: <div></div>,
};

export default Frame;
