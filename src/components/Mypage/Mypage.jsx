import React, { useState } from "react";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";
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
import { nodeEnv } from "../../serverconf.js";

const Mypage = () => {
  const { t, i18n } = useTranslation("mypage");
  const [profToken, setProfToken] = useState(Date.now().toString());
  const userInfoDetail = useRecoilValue(loginInfoDetailAtom);
  const [isOpenModify, setOpenModify] = useState(false);
  const [isOpenReport, setOpenReport] = useState(false);
  const [isOpenPolicy, setOpenPolicy] = useState(false);
  const [isOpenMembers, setOpenMembers] = useState(false);
  const history = useHistory();
  const setAlert = useSetRecoilState(alertAtom);

  const handleLogout = () => history.push("/logout");
  const handleUpdate = () => setProfToken(Date.now().toString());
  const handleTranslation = () =>
    i18n.changeLanguage(i18n.language === "ko" ? "en" : "ko");

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
        {t("myPage")}
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
          <div style={theme.font14_bold}>{t("myInformation")}</div>
          <div style={infoModify} onClick={() => setOpenModify(true)}>
            {t("revise")}
          </div>
        </div>
        <div style={infoType} className="selectable">
          {t("student_id")}
          <div style={infoContent}>{userInfoDetail?.subinfo.kaist}</div>
        </div>
        <div style={infoType} className="selectable">
          {t("mail")}
          <div style={infoContent}>{userInfoDetail?.email}</div>
        </div>
        <div style={infoType} className="selectable">
          {t("nickname")}
          <div style={infoContent}>{userInfoDetail?.nickname}</div>
        </div>
      </WhiteContainer>
      <WhiteContainer marginAuto>
        <Menu icon="lang" onClick={handleTranslation}>
          {t("btn.translation")}
        </Menu>
      </WhiteContainer>
      <WhiteContainer marginAuto>
        <div style={{ display: "grid", rowGap: "16px" }}>
          <Menu icon="report" onClick={() => setOpenReport(true)}>
            {t("report_record")}
          </Menu>
          <a className="popup-channeltalk">
            <Menu icon="ask" onClick={() => {}}>
              {t("channeltalk_ask")}
            </Menu>
          </a>
          <Menu icon="policy" onClick={() => setOpenPolicy(true)}>
            {t("rule")}
          </Menu>
          <Menu icon="credit" onClick={() => setOpenMembers(true)}>
            {t("developer")}
          </Menu>
          <Menu icon="logout" onClick={handleLogout}>
            {t("logout")}
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
