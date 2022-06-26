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
  const [userInfoDetail, setUserInfoDetail] = useState({});
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
      setUserInfoDetail(data);
    });
    setProfToken(Date.now());
  };

  useEffect(() => {
    handleUpdate();
  }, []);

  const styleProfImg = {
    width: "50px",
    height: "50px",
    borderRadius: "25px",
    backgroundColor: "#EEEEEE",
    overflow: "hidden",
  };
  const styleName = {
    fontSize: "17px",
    lineHeight: "20px",
    fontWeight: "bold",
    marginLeft: "12px",
  };
  const myInfo = {
    fontSize: "14px",
    fontWeight: "bold",
  };
  const modify = {
    fontSize: "14px",
    color: "#6E3678",
  };
  const infoTitle = {
    display: "flex",
    fontSize: "14px",
    color: "#888888",
    marginTop: "16px",
  };
  const infoContent = {
    fontSize: "14px",
    marginLeft: "12px",
  };

  return (
    <>
      <div style={{ marginTop: "30px", marginBottom: "20px" }}>
        <Title icon="mypage">마이 페이지</Title>
      </div>
      <WhiteContainer padding="16px 24px 24px">
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={`${backServer}/static/profile-images/${userInfo.id}?${profToken}`}
            style={styleProfImg}
            alt="profile-img"
          />
          <div style={styleName}>{userInfo ? userInfo.name : ""}</div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "15px",
          }}
        >
          <div style={myInfo}>내 정보</div>
          <div style={modify} className="BTNC" onClick={() => setOpen3(true)}>
            수정하기
          </div>
        </div>
        {userInfoDetail.subinfo && (
          <>
            <div style={infoTitle}>
              학번
              <div style={infoContent}>{userInfoDetail.subinfo.kaist}</div>
            </div>
            <div style={infoTitle}>
              메일
              <div style={infoContent}>{userInfoDetail.email}</div>
            </div>
            <div style={infoTitle}>
              별명
              <div style={infoContent}>{userInfoDetail.nickname}</div>
            </div>
          </>
        )}
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
        userInfoD={userInfoDetail}
        profToken={profToken}
        isOpen={isOpen3}
        onClose={() => setOpen3(false)}
        onUpdate={() => handleUpdate()}
      />
    </>
  );
};

export default Setting;
