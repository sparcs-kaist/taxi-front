import React, { useState } from "react";
import { useHistory } from "react-router";
import Title from "components/common/Title";
import WhiteContainer from "components/common/WhiteContainer";
import PopupModify from "./PopupModify";
import PopupReport from "./PopupReport";
import PopupPolicy from "./PopupPolicy";
import PopupMembers from "./PopupMembers";
import ProfileImg from "./ProfileImg";
import axios from "tools/axios";
import theme from "styles/theme";
import { useRecoilValue, useSetRecoilState } from "recoil";
import loginInfoDetailAtom from "recoil/loginInfoDetail";
import alertAtom from "recoil/alert";
import Menu from "./Menu";
import betaNotice from "static/betaNotice";

const Mypage = () => {
  const [profToken, setProfToken] = useState(Date.now().toString());
  const userInfoDetail = useRecoilValue(loginInfoDetailAtom);
  const [isOpenModify, setOpenModify] = useState(false);
  const [isOpenReport, setOpenReport] = useState(false);
  const [isOpenPolicy, setOpenPolicy] = useState(false);
  const [isOpenMembers, setOpenMembers] = useState(false);
  const history = useHistory();
  const setAlert = useSetRecoilState(alertAtom);
  const handleLogout = async () => {
    const response = await axios.get("/auth/logout");
    if (response.status === 200) {
      history.push("/logout");
    } else {
      setAlert("로그아웃에 실패했습니다.");
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
    justifyContent: "space-between",
    marginTop: "15px",
  };
  const infoModify = {
    ...theme.font14,
    color: theme.purple,
    cursor: "pointer",
  };
  const infoType = {
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
      <Title icon="mypage" header marginAuto>
        마이 페이지
      </Title>
      <WhiteContainer marginAuto padding="16px 24px 24px">
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
            {userInfoDetail?.name}
          </div>
        </div>
        <div style={infoTitle}>
          <div style={theme.font14_bold}>내 정보</div>
          <div style={infoModify} onClick={() => setOpenModify(true)}>
            수정하기
          </div>
        </div>
        <div style={infoType} className="selectable">
          학번
          <div style={infoContent}>{userInfoDetail?.subinfo.kaist}</div>
        </div>
        <div style={infoType} className="selectable">
          메일
          <div style={infoContent}>{userInfoDetail?.email}</div>
        </div>
        <div style={infoType} className="selectable">
          별명
          <div style={infoContent}>{userInfoDetail?.nickname}</div>
        </div>
      </WhiteContainer>
      <WhiteContainer padding="16px 24px" marginAuto>
        <Menu icon="beta" onClick={() => setAlert(betaNotice)}>
          베타 서비스 안내
        </Menu>
      </WhiteContainer>
      <WhiteContainer marginAuto>
        <div style={{ display: "grid", rowGap: "16px" }}>
          <Menu icon="report" onClick={() => setOpenReport(true)}>
            신고 내역
          </Menu>
          <a className="popup-channeltalk">
            <Menu icon="ask" onClick={() => {}}>
              채널톡 문의하기
            </Menu>
          </a>
          <Menu icon="policy" onClick={() => setOpenPolicy(true)}>
            사용 약관 및 개인정보 보호 규칙
          </Menu>
          <Menu icon="credit" onClick={() => setOpenMembers(true)}>
            만든 사람들
          </Menu>
          <Menu icon="logout" onClick={handleLogout}>
            로그아웃
          </Menu>
        </div>
      </WhiteContainer>
      <PopupReport isOpen={isOpenReport} onClose={() => setOpenReport(false)} />
      <PopupModify
        isOpen={isOpenModify}
        onClose={() => setOpenModify(false)}
        onUpdate={() => handleUpdate()}
        profToken={profToken}
      />
      <PopupPolicy isOpen={isOpenPolicy} onClose={() => setOpenPolicy(false)} />
      <PopupMembers
        isOpen={isOpenMembers}
        onClose={() => setOpenMembers(false)}
      />
    </>
  );
};

export default Mypage;
