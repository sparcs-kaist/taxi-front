import React, { useState } from "react";
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
import { theme } from "styles/theme";

import ReportGmailerrorredRoundedIcon from "@mui/icons-material/ReportGmailerrorredRounded";
import HelpOutlineRoundedIcon from "@material-ui/icons/HelpOutlineRounded";
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import PortraitRoundedIcon from "@material-ui/icons/PortraitRounded";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import KeyboardArrowLeftRoundedIcon from "@material-ui/icons/KeyboardArrowLeftRounded";

const BtnC = (props) => {
  const [isHover, setHover] = useState(false);
  const style = {
    display: "flex",
    alignItems: "center",
    width: "fit-content",
    color: isHover ? theme.purple : undefined,
  };
  const styleImg = {
    ...theme.font15_icon,
    marginRight: "8px",
  };
  const styleText = {
    ...theme.font14,
    color: "inherit",
  };

  const getIcon = (icon) => {
    switch (icon) {
      case "report":
        return <ReportGmailerrorredRoundedIcon style={styleImg} />;
      case "ask":
        return <HelpOutlineRoundedIcon style={styleImg} />;
      case "rule":
        return <AssignmentOutlinedIcon style={styleImg} />;
      case "credit":
        return <PortraitRoundedIcon style={styleImg} />;
      case "logout":
        return <ExitToAppRoundedIcon style={styleImg} />;
    }
  };

  return (
    <div
      style={style}
      className="BTNC"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onTouchStart={() => setHover(true)}
      onTouchEnd={() => setHover(false)}
      onClick={() => props.onClick()}
    >
      {getIcon(props.icon)}
      <div style={styleText}>{props.children}</div>
      {isHover && <KeyboardArrowLeftRoundedIcon style={styleImg} />}
    </div>
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

  const styleProfile = {
    display: "flex",
    alignItems: "center",
  };
  const styleProfImg = {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    overflow: "hidden",
    marginRight: "12px",
  };
  const infoTitle = {
    display: "flex",
    ...theme.font14,
    color: theme.gray_text,
    marginTop: "16px",
  };
  const infoContent = {
    ...theme.font14,
    marginLeft: "12px",
  };

  return (
    <>
      <Title icon="mypage" header={true} marginAuto={true}>
        마이 페이지
      </Title>
      <WhiteContainer marginAuto={true} padding="16px 24px 24px">
        <div style={styleProfile}>
          <div style={styleProfImg}>
            {userInfoDetail?.profileImgUrl && profToken ? (
              <ProfileImg
                path={userInfoDetail.profileImgUrl}
                token={profToken}
              />
            ) : null}
          </div>
          <div style={theme.font16_bold} className="selectable">
            {userInfo?.name}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "15px",
          }}
        >
          <div style={theme.font14_bold}>내 정보</div>
          <div
            className="BTNC"
            style={{ ...theme.font14, color: theme.purple }}
            onClick={() => setOpen3(true)}
          >
            수정하기
          </div>
        </div>
        <div style={infoTitle}>
          학번
          <div style={infoContent}>{userInfoDetail?.subinfo.kaist}</div>
        </div>
        <div style={infoTitle}>
          메일
          <div style={infoContent}>{userInfoDetail?.email}</div>
        </div>
        <div style={infoTitle}>
          별명
          <div style={infoContent}>{userInfoDetail?.nickname}</div>
        </div>
      </WhiteContainer>
      <WhiteContainer marginAuto={true}>
        <div style={{ display: "grid", rowGap: "16px" }}>
          <BtnC icon="report" onClick={() => {}}>
            신고 내역
          </BtnC>
          <a className="popup-channeltalk">
            <BtnC icon="ask" onClick={() => {}}>
              채널톡 문의하기
            </BtnC>
          </a>
          <BtnC icon="rule" onClick={() => setOpen2(true)}>
            사용 약관 및 개인정보 보호 규칙
          </BtnC>
          <BtnC icon="credit" onClick={() => setOpen1(true)}>
            만든 사람들
          </BtnC>
          <BtnC icon="logout" onClick={handleLogout}>
            로그아웃
          </BtnC>
        </div>
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
