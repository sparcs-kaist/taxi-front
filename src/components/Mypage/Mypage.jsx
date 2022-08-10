import React, { useEffect, useState } from "react";
import { animated, useSpring } from "react-spring";
import { useHistory } from "react-router";
import PropTypes from "prop-types";
import Title from "components/common/Title";
import WhiteContainer from "components/common/WhiteContainer";
import PopupSparcs from "./PopupSparcs/PopupSparcs";
import PopupPolicy from "./PopupPolicy/PopupPolicy";
import PopupMypage from "./PopupMypage/PopupMypage";
import ProfileImg from "./ProfileImg";
import useTaxiAPI from "hooks/useTaxiAPI";
import axios from "tools/axios";

import AssignmentRoundedIcon from "@material-ui/icons/AssignmentRounded";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import SparcsLogoBlack from "static/assets/SparcsLogoBlack.svg";

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
    width: "16px",
    height: "16px",
  };
  const styleText = {
    height: "35px",
    lineHeight: "35px",
    paddingLeft: "35px",
    fontSize: "14px",
  };

  const getIcon = (icon) => {
    switch (icon) {
      case "rule":
        return <AssignmentRoundedIcon style={styleImg} />;
      case "logo":
        return <img src={SparcsLogoBlack} alt="" style={styleImg} />;
      case "logout":
        return <ExitToAppRoundedIcon style={styleImg} />;
      default:
        return <></>;
    }
  };

  return (
    <animated.div
      style={style}
      className="BTNC"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => props.onClick()}
    >
      {getIcon(props.icon)}
      <div style={styleText}>{props.children}</div>
    </animated.div>
  );
};
BtnC.propTypes = {
  icon: PropTypes.string,
  children: PropTypes.any,
  onClick: PropTypes.func,
};

const Mypage = () => {
  const [profToken, setProfToken] = useState(Date.now().toString());
  const [errorUserInfo, userInfo] = useTaxiAPI.get("/json/logininfo");
  const [errorUserInfoDetail, userInfoDetail] = useTaxiAPI.get(
    "/json/logininfo/detail",
    {},
    [profToken]
  );
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
  const handleUpdate = () => setProfToken(Date.now().toString());

  const styleProfImg = {
    width: "50px",
    height: "50px",
    borderRadius: "25px",
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
      <Title icon="mypage" header={true}>
        마이 페이지
      </Title>
      <WhiteContainer padding="16px 24px 24px">
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={styleProfImg}>
            {userInfoDetail?.profileImgUrl && profToken ? (
              <ProfileImg
                path={userInfoDetail?.profileImgUrl}
                token={profToken}
              />
            ) : null}
          </div>
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
        {userInfoDetail?.subinfo && (
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
        <BtnC icon="rule" onClick={() => setOpen2(true)}>
          사용 약관 및 개인정보 보호 규칙
        </BtnC>
        <BtnC icon="logo" onClick={() => setOpen1(true)}>
          만든 사람들
        </BtnC>
        <BtnC icon="logout" onClick={handleLogout}>
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

export default Mypage;
