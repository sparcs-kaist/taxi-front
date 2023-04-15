import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import useDateToken from "hooks/useDateToken";

import LinkLogout from "components/Link/LinkLogout";
import {
  ModalCredit,
  ModalModify,
  ModalNotification,
  ModalPrivacyPolicy,
  ModalReport,
  ModalTerms,
} from "components/ModalPopup";
import ProfileImg from "components/ProfileImg";
import SuggestLogin from "components/SuggestLogin";
import Title from "components/Title";
import WhiteContainer from "components/WhiteContainer";

import Menu from "./Menu";

import loginInfoAtom from "atoms/loginInfo";
import notificationOptionsAtom from "atoms/notificationOptions";
import { useRecoilValue } from "recoil";

import theme from "tools/theme";

import { nodeEnv } from "loadenv";

const Mypage = () => {
  const { t, i18n } = useTranslation("mypage");
  const [profImgToken, refreshProfImgToken] = useDateToken();
  const loginInfo = useRecoilValue(loginInfoAtom);
  const notificationOptions = useRecoilValue(notificationOptionsAtom);
  const isOnNotification =
    // notificationOptions?.advertisement ||
    // notificationOptions?.beforeDepart ||
    notificationOptions?.chatting || notificationOptions?.notice;
  // notificationOptions?.keywords?.length;
  const { id: userId } = loginInfo || {};

  const [isOpenProfileModify, setIsOpenProfileModify] = useState(false);
  const [isOpenNotification, setIsOpenNotification] = useState(false);
  const [isOpenReport, setIsOpenReport] = useState(false);
  const [isOpenPolicy, setIsOpenPolicy] = useState(false);
  const [isOpenPrivacyPolicy, setIsOpenPrivacyPolicy] = useState(false);
  const [isOpenMembers, setOpenIsMembers] = useState(false);

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
                {loginInfo?.profileImgUrl && (
                  <ProfileImg
                    path={loginInfo.profileImgUrl}
                    token={profImgToken}
                  />
                )}
              </div>
              <div css={theme.font16_bold} className="selectable">
                {loginInfo?.name}
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
              <div css={infoContent}>{loginInfo?.subinfo?.kaist}</div>
            </div>
            <div css={infoType} className="selectable">
              {t("email")}
              <div css={infoContent}>{loginInfo?.email}</div>
            </div>
            <div css={infoType} className="selectable">
              {t("nickname")}
              <div css={infoContent}>{loginInfo?.nickname}</div>
            </div>
            <div css={infoType} className="selectable">
              {t("account")}
              <div css={infoContent}>{loginInfo?.account}</div>
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
          <ModalModify
            isOpen={isOpenProfileModify}
            onChangeIsOpen={setIsOpenProfileModify}
            onUpdate={refreshProfImgToken}
            profToken={profImgToken}
          />
          <ModalReport isOpen={isOpenReport} onChangeIsOpen={setIsOpenReport} />
          <ModalNotification
            isOpen={isOpenNotification}
            onChangeIsOpen={setIsOpenNotification}
          />
          <ModalTerms isOpen={isOpenPolicy} onChangeIsOpen={setIsOpenPolicy} />
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
          {userId && (
            <Menu icon="policy" onClick={onClickPolicy}>
              {t("terms")}
            </Menu>
          )}
          <Menu icon="policy" onClick={onClickPrivacyPolicy}>
            {t("privacy_policy")}
          </Menu>
          <Menu icon="credit" onClick={onClickMembers}>
            {t("credit")}
          </Menu>
          {userId && (
            <LinkLogout>
              <Menu icon="logout">{t("logout")}</Menu>
            </LinkLogout>
          )}
        </div>
      </WhiteContainer>
      <ModalPrivacyPolicy
        isOpen={isOpenPrivacyPolicy}
        onChangeIsOpen={setIsOpenPrivacyPolicy}
      />
      <ModalCredit isOpen={isOpenMembers} onChangeIsOpen={setOpenIsMembers} />
    </>
  );
};

export default Mypage;
