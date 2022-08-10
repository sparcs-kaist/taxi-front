import React, { useState, useEffect } from "react";
import { useLocation, Redirect } from "react-router-dom";
import Navigation from "@components/Skeleton/Navigation";
import Footer from "@components/Skeleton/Footer";
import PopupPolicy from "@components/Mypage/PopupPolicy/PopupPolicy";
import PropTypes from "prop-types";
import axios from "@tools/axios";

const Container = (props) => {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      {props.children}
    </div>
  );
};
Container.propTypes = {
  children: PropTypes.node,
};

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

const Skeleton = (props) => {
  const [userId, setUserId] = useState(undefined);
  const [showAgree, setShowAgree] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;
  const currentPath = location.pathname + location.search;

  // path가 수정될 때 마다 logininfo 요청
  useEffect(() => {
    axios
      .get("/json/logininfo")
      .then(({ data }) => {
        setUserId(data.id ? data.id : null);
      })
      .catch((e) => {
        // FIXME
      });
  }, [currentPath]);

  // 로그인 정보 수정될 때 요청
  useEffect(() => {
    axios
      .get("/json/logininfo/detail")
      .then(({ data }) => {
        setShowAgree(data.agreeOnTermsOfService === false);
      })
      .catch((e) => {
        // FIXME
      });
  }, [userId]);

  if (userId === null && pathname !== "/login") {
    return (
      <Redirect to={`/login?redirect=${encodeURIComponent(currentPath)}`} />
    );
  }
  if (userId === undefined) {
    return (
      <Container>
        <Navigation path={pathname} />
        <HeaderLine />
      </Container>
    );
  }
  if (pathname.startsWith("/login") || pathname.startsWith("/chatting")) {
    return <Container>{props.children}</Container>;
  }
  return (
    <Container>
      {props.children}
      <Footer />
      <Navigation path={pathname} />
      <HeaderLine />
      <PopupPolicy isOpen={showAgree} onClose={() => setShowAgree(false)} />
    </Container>
  );
};

Skeleton.propTypes = {
  children: PropTypes.node,
};

export default Skeleton;
