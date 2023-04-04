import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

import useDateToken from "hooks/useDateToken";

import Title from "components/Title";
import WhiteContainer from "components/WhiteContainer";

import Menu from "./Menu";
import ModalNotification from "./ModalNotification";
import PopupMembers from "./PopupMembers";
import PopupModify from "./PopupModify";
import PopupPolicy from "./PopupPolicy";
import PopupPrivacyPolicy from "./PopupPrivacyPolicy";
import PopupReport from "./PopupReport";
import ProfileImg from "./ProfileImg";

import loginInfoDetailAtom from "atoms/loginInfoDetail";
import notificationOptionsAtom from "atoms/notificationOptions";
import { useRecoilValue } from "recoil";

import theme from "tools/theme";

import { nodeEnv } from "loadenv";
import SuggestLogin from "components/SuggestLogin";

const Mypage = () => {
  const { t, i18n } = useTranslation("mypage");
  const [profImgToken, refreshProfImgToken] = useDateToken();
  const loginInfoDetail = useRecoilValue(loginInfoDetailAtom);
  const notificationOptions = useRecoilValue(notificationOptionsAtom);
  const isOnNotification =
    // notificationOptions?.advertisement ||
    // notificationOptions?.beforeDepart ||
    notificationOptions?.chatting || notificationOptions?.notice;
  // notificationOptions?.keywords?.length;
  const { id: userId } = loginInfoDetail || {};

  const [isOpenProfileModify, setIsOpenProfileModify] = useState(false);
  const [isOpenNotification, setIsOpenNotification] = useState(false);
  const [isOpenReport, setIsOpenReport] = useState(false);
  const [isOpenPolicy, setIsOpenPolicy] = useState(false);
  const [isOpenPrivacyPolicy, setIsOpenPrivacyPolicy] = useState(false);
  const [isOpenMembers, setOpenIsMembers] = useState(false);
  const history = useHistory();

  const onClickProfileModify = useCallback(
    () => setIsOpenProfileModify(true),
    [setIsOpenProfileModify]
  );
  const onClickTranslation = useCallback(
    () => i18n.changeLanguage(i18n.language === "ko" ? "en" : "ko"),
    [i18n.changeLanguage, i18n.language]
  );
  const onClickNotification = useCallback(
    () => setIsOpenNotification(true),
    [setIsOpenNotification]
  );
  const onClickReport = useCallback(
    () => setIsOpenReport(true),
    [setIsOpenReport]
  );
  const onClickPolicy = useCallback(
    () => setIsOpenPolicy(true),
    [setIsOpenPolicy]
  );
  const onClickPrivacyPolicy = useCallback(
    () => setIsOpenPrivacyPolicy(true),
    [setIsOpenPrivacyPolicy]
  );
  const onClickMembers = useCallback(
    () => setOpenIsMembers(true),
    [setOpenIsMembers]
  );
  const onClickLogout = useCallback(() => history.push("/logout"), [history]);

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
        {t("my_page")}
      </Title>
      {userId ? (
        <>
          <WhiteContainer marginAuto padding="16px 24px 24px">
            <div css={{ display: "flex", alignItems: "center" }}>
              <div css={styleProfImg}>
                {loginInfoDetail?.profileImgUrl && (
                  <ProfileImg
                    path={loginInfoDetail.profileImgUrl}
                    token={profImgToken}
                  />
                )}
              </div>
              <div css={theme.font16_bold} className="selectable">
                {loginInfoDetail?.name}
              </div>
            </div>
            <div css={infoTitle}>
              <div css={theme.font14_bold}>{t("my_information")}</div>
              <div css={infoModify} onClick={onClickProfileModify}>
                {t("revise")}
              </div>
            </div>
            <div css={infoType} className="selectable">
              {t("student_id")}
              <div css={infoContent}>{loginInfoDetail?.subinfo?.kaist}</div>
            </div>
            <div css={infoType} className="selectable">
              {t("email")}
              <div css={infoContent}>{loginInfoDetail?.email}</div>
            </div>
            <div css={infoType} className="selectable">
              {t("nickname")}
              <div css={infoContent}>{loginInfoDetail?.nickname}</div>
            </div>
            <div css={infoType} className="selectable">
              {t("account")}
              <div css={infoContent}>{loginInfoDetail?.account}</div>
            </div>
          </WhiteContainer>
          <WhiteContainer marginAuto>
            <div css={{ display: "grid", rowGap: "16px" }}>
              {nodeEnv === "development" && (
                <Menu icon="lang" onClick={onClickTranslation}>
                  {t("translation")}
                </Menu>
              )}
              <Menu
                icon={`notification-${isOnNotification ? "on" : "off"}`}
                onClick={onClickNotification}
              >
                {t("notification")}
              </Menu>
            </div>
          </WhiteContainer>
          <PopupReport
            isOpen={isOpenReport}
            onClose={() => setIsOpenReport(false)}
          />
        </>
      ) : (
        <WhiteContainer marginAuto>
          <SuggestLogin />
        </WhiteContainer>
      )}
      <WhiteContainer marginAuto>
        <div css={{ display: "grid", rowGap: "16px" }}>
          {userId && (
            <Menu icon="report" onClick={onClickReport}>
              {t("report_record")}
            </Menu>
          )}
          <a className="popup-channeltalk">
            <Menu icon="ask">{t("contact")}</Menu>
          </a>
          <Menu icon="policy" onClick={onClickPolicy}>
            {t("terms")}
          </Menu>
          <Menu icon="policy" onClick={onClickPrivacyPolicy}>
            {t("privacy_policy")}
          </Menu>
          <Menu icon="credit" onClick={onClickMembers}>
            {t("credit")}
          </Menu>
          {userId && (
            <Menu icon="logout" onClick={onClickLogout}>
              {t("logout")}
            </Menu>
          )}
        </div>
      </WhiteContainer>
      <PopupModify
        isOpen={isOpenProfileModify}
        onClose={() => setIsOpenProfileModify(false)}
        onUpdate={refreshProfImgToken}
        profToken={profImgToken}
      />
      <ModalNotification
        isOpen={isOpenNotification}
        onChangeIsOpen={setIsOpenNotification}
      />
      <PopupPolicy
        isOpen={isOpenPolicy}
        onClose={() => setIsOpenPolicy(false)}
      />
      <PopupPrivacyPolicy
        isOpen={isOpenPrivacyPolicy}
        onClose={() => setIsOpenPrivacyPolicy(false)}
      />
      <PopupMembers
        isOpen={isOpenMembers}
        onClose={() => setOpenIsMembers(false)}
      />
    </>
  );
};

export default Mypage;
