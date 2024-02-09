import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useHistory, useParams } from "react-router-dom";

import { useValueRecoilState } from "@/hooks/useFetchRecoilState";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import Footer from "@/components/Footer";
import LinkLogout from "@/components/Link/LinkLogout";
import {
  ModalCredit,
  ModalEvent2023FallJoin,
  ModalMypageModify,
  ModalNotification,
  ModalPrivacyPolicy,
  ModalReport,
  ModalTerms,
} from "@/components/ModalPopup";
import Title from "@/components/Title";
import ProfileImage from "@/components/User/ProfileImage";
import WhiteContainer from "@/components/WhiteContainer";
import WhiteContainerSuggestLogin from "@/components/WhiteContainer/WhiteContainerSuggestLogin";

import Menu from "./Menu";

import { eventMode, isDev } from "@/tools/loadenv";
import theme from "@/tools/theme";
import { isNotificationOn } from "@/tools/trans";

const Mypage = () => {
  const { t, i18n } = useTranslation("mypage");
  const loginInfo = useValueRecoilState("loginInfo");
  const notificationOptions = useValueRecoilState("notificationOptions");
  const { id: userId } = loginInfo || {};
  const { page } = useParams<{ page?: string }>();
  const history = useHistory();

  const closeModal = useCallback(() => {
    history.push("/mypage");
  }, []);

  const onClickTranslation = useCallback(
    () => i18n.changeLanguage(i18n.language === "ko" ? "en" : "ko"),
    [i18n.changeLanguage, i18n.language]
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
  const styleLink = {
    textDecoration: "none",
  };

  return (
    <AdaptiveDiv type="center">
      <Title icon="mypage" isHeader>
        {t("my_page")}
      </Title>
      {userId ? (
        <>
          <WhiteContainer css={{ padding: "16px 24px 24px" }}>
            <div css={{ display: "flex", alignItems: "center" }}>
              <div css={styleProfImg}>
                {loginInfo?.profileImgUrl && (
                  <ProfileImage url={loginInfo.profileImgUrl} />
                )}
              </div>
              <div css={theme.font16_bold} className="selectable">
                {loginInfo?.name}
              </div>
            </div>
            <div css={infoTitle}>
              <div css={theme.font14_bold}>{t("my_information")}</div>
              <Link to="/mypage/modify" css={[infoModify, styleLink]}>
                {t("revise")}
              </Link>
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
          <WhiteContainer>
            <div css={{ display: "grid", rowGap: "16px" }}>
              {isDev && (
                <Menu icon="lang" onClick={onClickTranslation}>
                  {t("translation")}
                </Menu>
              )}
              <Link to="/mypage/notification" css={styleLink}>
                <Menu
                  icon={`notification-${
                    isNotificationOn(notificationOptions) ? "on" : "off"
                  }`}
                >
                  {t("notification")}
                </Menu>
              </Link>
            </div>
          </WhiteContainer>
          <ModalMypageModify
            isOpen={page === "modify"}
            onChangeIsOpen={closeModal}
          />
          <ModalReport isOpen={page === "report"} onChangeIsOpen={closeModal} />
          <ModalNotification
            isOpen={page === "notification"}
            onChangeIsOpen={closeModal}
          />
        </>
      ) : (
        <WhiteContainerSuggestLogin />
      )}
      <WhiteContainer>
        <div css={{ display: "grid", rowGap: "16px" }}>
          {userId && (
            <Link to="/mypage/report" css={styleLink}>
              <Menu icon="report">{t("report_record")}</Menu>
            </Link>
          )}
          <a className="popup-channeltalk">
            <Menu icon="ask">{t("contact")}</Menu>
          </a>
          <Link to="/mypage/terms" css={styleLink}>
            <Menu icon="policy">{t("terms")}</Menu>
          </Link>
          <Link to="/mypage/privacyPolicy" css={styleLink}>
            <Menu icon="policy">{t("privacy_policy")}</Menu>
          </Link>
          {eventMode === "2023fall" && (
            <Link to="/mypage/event2023FallJoin" css={styleLink}>
              <Menu icon="policy">한가위 송편 이벤트 참여 약관</Menu>
            </Link>
          )}
          <Link to="/mypage/credit" css={styleLink}>
            <Menu icon="credit">{t("credit")}</Menu>
          </Link>
          {userId && (
            <LinkLogout>
              <Menu icon="logout">{t("logout")}</Menu>
            </LinkLogout>
          )}
        </div>
      </WhiteContainer>
      <Footer type="only-logo" />
      <ModalPrivacyPolicy
        isOpen={page === "privacyPolicy"}
        onChangeIsOpen={closeModal}
      />
      <ModalTerms isOpen={page === "terms"} onChangeIsOpen={closeModal} />
      <ModalEvent2023FallJoin
        isOpen={page === "event2023FallJoin"}
        onChangeIsOpen={closeModal}
      />
      <ModalCredit isOpen={page === "credit"} onChangeIsOpen={closeModal} />
    </AdaptiveDiv>
  );
};

export default Mypage;
