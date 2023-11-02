import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import useDateToken from "@/hooks/useDateToken";
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

import { eventMode, nodeEnv } from "@/tools/loadenv";
import theme from "@/tools/theme";
import { isNotificationOn } from "@/tools/trans";

const Mypage = () => {
  const { t, i18n } = useTranslation("mypage");
  const [profImgToken, refreshProfImgToken] = useDateToken();
  const loginInfo = useValueRecoilState("loginInfo");
  const notificationOptions = useValueRecoilState("notificationOptions");
  const { id: userId } = loginInfo || {};

  const [isOpenProfileModify, setIsOpenProfileModify] = useState(false);
  const [isOpenNotification, setIsOpenNotification] = useState(false);
  const [isOpenReport, setIsOpenReport] = useState(false);
  const [isOpenPolicy, setIsOpenPolicy] = useState(false);
  const [isOpenPrivacyPolicy, setIsOpenPrivacyPolicy] = useState(false);
  const [isOpenEventPolicy, setIsOpenEventPolicy] = useState(false);
  const [isOpenMembers, setOpenIsMembers] = useState(false);

  const onClickProfileModify = useCallback(
    () => setIsOpenProfileModify(true),
    []
  );
  const onClickTranslation = useCallback(
    () => i18n.changeLanguage(i18n.language === "ko" ? "en" : "ko"),
    [i18n.changeLanguage, i18n.language]
  );
  const onClickNotification = useCallback(
    () => setIsOpenNotification(true),
    []
  );
  const onClickReport = useCallback(() => setIsOpenReport(true), []);
  const onClickPolicy = useCallback(() => setIsOpenPolicy(true), []);
  const onClickPrivacyPolicy = useCallback(
    () => setIsOpenPrivacyPolicy(true),
    []
  );
  const onClickEventPolicy = useCallback(() => setIsOpenEventPolicy(true), []);
  const onClickMembers = useCallback(() => setOpenIsMembers(true), []);

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
                  <ProfileImage
                    url={loginInfo.profileImgUrl}
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
          <WhiteContainer>
            <div css={{ display: "grid", rowGap: "16px" }}>
              {nodeEnv && (
                <Menu icon="lang" onClick={onClickTranslation}>
                  {t("translation")}
                </Menu>
              )}
              <Menu
                icon={`notification-${
                  isNotificationOn(notificationOptions) ? "on" : "off"
                }`}
                onClick={onClickNotification}
              >
                {t("notification")}
              </Menu>
            </div>
          </WhiteContainer>
          <ModalMypageModify
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
        </>
      ) : (
        <WhiteContainerSuggestLogin />
      )}
      <WhiteContainer>
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
          {eventMode === "2023fall" && (
            <Menu icon="policy" onClick={onClickEventPolicy}>
              한가위 송편 이벤트 참여 약관
            </Menu>
          )}
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
      <Footer type="only-logo" />
      <ModalPrivacyPolicy
        isOpen={isOpenPrivacyPolicy}
        onChangeIsOpen={setIsOpenPrivacyPolicy}
      />
      <ModalTerms isOpen={isOpenPolicy} onChangeIsOpen={setIsOpenPolicy} />
      <ModalEvent2023FallJoin
        isOpen={isOpenEventPolicy}
        onChangeIsOpen={setIsOpenEventPolicy}
      />
      <ModalCredit isOpen={isOpenMembers} onChangeIsOpen={setOpenIsMembers} />
    </AdaptiveDiv>
  );
};

export default Mypage;
