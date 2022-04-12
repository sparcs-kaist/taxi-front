import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "../Tool/axios";
import Navigation from "./Navigation";
import Footer from "./Footer";
import PropTypes from "prop-types";

const HeaderLine = () => {
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

const Frame = (props) => {
  const [userId, setUserId] = useState(undefined);
  const currentPath = window.location.pathname;

  const styleContainer = {
    width: "100%",
    height: "100%",
    position: "relative",
  };

  // path가 수정될 때 마다 logininfo 요청
  useEffect(() => {
    axios
      .get("/json/logininfo")
      .then(({ data }) => {
        setUserId(data.id ? data.id : null);
      })
      .catch((error) => {
        console.log("Frame error : " + error); // FIXME: 추후 수정 바람
      });
  }, [currentPath]);

  if (userId === undefined) {
    return (
      <div style={styleContainer}>
        <Navigation selected={props.navi} />
        <HeaderLine />
      </div>
    );
  } else if (userId === null) {
    return <Redirect to={"/login?redirect=" + window.location.pathname} />;
  } else {
    return (
      <div style={styleContainer}>
        {props.children}
        <Footer />
        <Navigation selected={props.navi} />
        <HeaderLine />
      </div>
    );
  }
};

Frame.propTypes = {
  navi: PropTypes.string,
  children: PropTypes.element,
};
Frame.defaultProps = {
  children: <div></div>,
};

export default Frame;
