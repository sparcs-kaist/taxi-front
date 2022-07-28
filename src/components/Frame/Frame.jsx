import React, { useState, useEffect } from "react";
import { Redirect, useLocation } from "react-router-dom";
import Navigation from "@frames/Navigation";
import PopupPolicy from "@components/MyPage/PopupPolicy/PopupPolicy";
import Footer from "@frames/Footer";
import PropTypes from "prop-types";
import axios from "@tools/axios";

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

const Frame = () => {
  const [userId, setUserId] = useState(undefined);
  const [showAgree, setShowAgree] = useState(false);

  let location = useLocation();

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
  }, [location]);

  // 로그인 정보 수정될 때 요청
  useEffect(() => {
    axios.get("/json/logininfo/detail").then(({ data }) => {
      setShowAgree(data.agreeOnTermsOfService === false);
    });
  }, [userId]);

  if (userId === undefined) {
    return (
      <div style={styleContainer}>
        <Navigation selected={location} />
        <HeaderLine />
      </div>
    );
  } else if (userId === null) {
    return <Redirect to={"/login?redirect=" + window.location.pathname} />;
  } else if (
    location.pathname.split("/")[1] === "login" ||
    location.pathname.split("/")[1] === "chatting"
  ) {
    return <div></div>;
  } else {
    return (
      <div style={styleContainer}>
        <Footer />
        <Navigation selected={location} />
        <HeaderLine />
        <PopupPolicy isOpen={showAgree} onClose={() => setShowAgree(false)} />
      </div>
    );
  }
};

export default Frame;
