import React, { useState, useEffect, useCallback } from "react";
import { useLocation, Redirect } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import taxiLocationAtom from "recoil/taxiLocation";
import loginInfoDetailAtom from "recoil/loginInfoDetail";
import myRoomAtom from "recoil/myRoom";
import PropTypes from "prop-types";
import axios from "tools/axios";

import HeaderBar from "components/common/HeaderBar";
import Navigation from "components/Skeleton/Navigation";
import Footer from "components/Skeleton/Footer";
import PopupPolicy from "components/Mypage/PopupPolicy";

const Container = (props) => {
  return (
    <div
      style={{
        width: "100%",
        height: "calc(100% + env(safe-area-inset-top))",
        position: "relative",
      }}
    >
      {props.children}
    </div>
  );
};
Container.propTypes = {
  children: PropTypes.node,
};

const Skeleton = (props) => {
  const [userId, setUserId] = useState(undefined);
  const [showAgree, setShowAgree] = useState(false);
  const [taxiLocation, setTaxiLocation] = useRecoilState(taxiLocationAtom);
  const [loginInfoDetail, setLoginInfoDetail] =
    useRecoilState(loginInfoDetailAtom);
  const setMyRoom = useSetRecoilState(myRoomAtom);
  const location = useLocation();
  const pathname = location.pathname;
  const currentPath = location.pathname + location.search;

  const initializeGlobalInfo = useCallback(() => {
    const getLoginInfoDetail = axios.get("/json/logininfo/detail");
    const getLocation = axios.get("/locations");
    const getRoomList = axios.get("/rooms/v2/searchByUser");
    Promise.all([getLoginInfoDetail, getLocation, getRoomList]).then(
      ([
        { data: loginInfoDetailData },
        { data: locationData },
        { data: roomData },
      ]) => {
        setTaxiLocation(locationData.locations);
        setLoginInfoDetail(loginInfoDetailData);
        setMyRoom(roomData);
      }
    );
  }, []);
  useEffect(() => {
    if (userId) initializeGlobalInfo();
  }, [userId]);

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
        <HeaderBar />
      </Container>
    );
  }
  if (pathname.startsWith("/login")) {
    return <Container>{props.children}</Container>;
  }
  if (taxiLocation.length === 0 || loginInfoDetail === null) {
    /**
     * @todo 로딩 화면 추가
     */
    return <></>;
  }
  if (pathname.startsWith("/chatting")) {
    return <Container>{props.children}</Container>;
  }
  if (pathname.startsWith("/error")) {
    return (
      <Container>
        <HeaderBar />
        {props.children}
      </Container>
    );
  }
  return (
    <Container>
      <Navigation path={pathname} />
      <HeaderBar />
      {props.children}
      <Footer />
      <PopupPolicy isOpen={showAgree} onClose={() => setShowAgree(false)} />
    </Container>
  );
};

Skeleton.propTypes = {
  children: PropTypes.node,
};

export default Skeleton;
