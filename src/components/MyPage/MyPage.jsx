import React, { useEffect, useState } from "react";
import { animated, useSpring } from "react-spring";
import { useHistory } from "react-router";
import PropTypes from "prop-types";
import Title from "../Frame/Title/Title";
import WhiteContainer from "../Frame/WhiteContainer/WhiteContainer";
import PopupSparcs from "./PopupSparcs/PopupSparcs";
import PopupPolicy from "./PopupPolicy/PopupPolicy";
import PopupMypage from "./PopupMypage/PopupMypage";
import axios from "../Tool/axios";
import { backServer } from "../../serverconf";

import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import LibraryBooksRoundedIcon from "@material-ui/icons/LibraryBooksRounded";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import SparcsLogoBlack from "../../asset/SparcsLogoBlack.svg";

const BtnC = (props) => {
  const [isHover, setHover] = useState(false);
  const style = useSpring({
    height: "35px",
    borderRadius: "8px",
    overflow: "hidden",
    position: "relative",
    background: `rgba(120,120,120,${isHover ? 0.08 : 0})`,
    config: { duration: 100 },
  });
  const styleImg = {
    position: "absolute",
    top: "8px",
    left: "8px",
    width: "14px",
    height: "14px",
  };
  const styleText = {
    height: "35px",
    lineHeight: "35px",
    paddingLeft: "35px",
    fontSize: "14px",
  };

  return (
    <animated.div
      style={style}
      className="BTNC"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => props.onClick()}
    >
      <img src={props.img} alt="" style={styleImg} />
      <div style={styleText}>{props.children}</div>
    </animated.div>
  );
};
BtnC.propTypes = {
  img: PropTypes.img,
  children: PropTypes.any,
  onClick: PropTypes.func,
};

const Setting = () => {
  const [profToken, setProfToken] = useState(Date.now());
  const [userInfo, setUserInfo] = useState({});
  const [userInfoD, setUserInfoD] = useState({});
  const [isOpen1, setOpen1] = useState(false);
  const [isOpen2, setOpen2] = useState(false);
  const [isOpen3, setOpen3] = useState(false);
  const history = useHistory();

  const handleLogout = async () => {
    const response = await axios.get("/auth/logout");
    if (response.status === 200) {
      history.push("/login");
    } else {
      alert("로그아웃에 실패했습니다.");
    }
  };
  const handleUpdate = () => {
    axios.get("/json/logininfo").then(({ data }) => {
      setUserInfo(data);
    });
    axios.get("/json/logininfo/detail").then(({ data }) => {
      setUserInfoD(data);
    });
    setProfToken(Date.now());
  };

  useEffect(() => {
    handleUpdate();
  }, []);

  const styleProfImg = {
    position: "absolute",
    top: "0px",
    left: "0px",
    width: "50px",
    height: "50px",
    borderRadius: "26px",
    background: "#EEEEEE",
    overflow: "hidden",
  };
  const styleName = {
    height: "50px",
    lineHeight: "50px",
    fontSize: "17px",
    fontWeight: "bold",
    paddingLeft: "60px",
  };
  const styleT1 = {
    fontSize: "14px",
    fontWeight: "bold",
  };
  const styleT2 = {
    fontSize: "14px",
    color: "#6E3678",
  };
  const styleT3 = {
    fontSize: "14px",
    color: "#888888",
    width: "50px",
  };
  const styleT4 = {
    fontSize: "14px",
  };

  return (
    <div>
      <div style={{ height: "30px" }} />
      <Title icon={(style) => <AccountCircleRoundedIcon style={style} />}>
        마이 페이지
      </Title>
      <div style={{ height: "20px" }} />
      <WhiteContainer>
        <div style={{ position: "relative" }}>
          {userInfo.id ? (
            <img
              src={`${backServer}/static/profile-images/${userInfo.id}?${profToken}`}
              style={styleProfImg}
              alt="profile-img"
            />
          ) : null}
          <div style={styleName}>{userInfo ? userInfo.name : ""}</div>
        </div>
        <div style={{ height: "15px" }} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={styleT1}>내 정보</div>
          <div style={styleT2} className="BTNC" onClick={() => setOpen3(true)}>
            수정하기
          </div>
        </div>
        <div style={{ height: "10px" }} />
        <div style={{ display: "flex" }}>
          <div style={styleT3}>학번</div>
          <div style={styleT4}>
            {userInfoD && userInfoD.subinfo && userInfoD.subinfo.kaist
              ? userInfoD.subinfo.kaist
              : ""}
          </div>
        </div>
        <div style={{ height: "10px" }} />
        <div style={{ display: "flex" }}>
          <div style={styleT3}>메일</div>
          <div style={styleT4}>
            {userInfoD && userInfoD.email ? userInfoD.email : ""}
          </div>
        </div>
        <div style={{ height: "10px" }} />
        <div style={{ display: "flex" }}>
          <div style={styleT3}>별명</div>
          <div style={styleT4}>{userInfoD ? userInfoD.nickname : ""}</div>
        </div>
      </WhiteContainer>
      <WhiteContainer>
        <BtnC
          img={(style) => <LibraryBooksRoundedIcon style={style} />}
          onClick={() => setOpen2(true)}
        >
          사용 약관 및 개인정보 보호 규칙
        </BtnC>
        <BtnC img={SparcsLogoBlack} onClick={() => setOpen1(true)}>
          만든 사람들
        </BtnC>
        <BtnC
          img={(style) => <ExitToAppRoundedIcon style={style} />}
          onClick={handleLogout}
        >
          로그아웃
        </BtnC>
      </WhiteContainer>
      <PopupSparcs isOpen={isOpen1} onClose={() => setOpen1(false)} />
      <PopupPolicy isOpen={isOpen2} onClose={() => setOpen2(false)} />
      <PopupMypage
        userInfo={userInfo}
        userInfoD={userInfoD}
        profToken={profToken}
        isOpen={isOpen3}
        onClose={() => setOpen3(false)}
        onUpdate={() => handleUpdate()}
      />
    </div>
  );
};

export default Setting;
