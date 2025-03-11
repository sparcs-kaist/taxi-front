import axiosOri from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { useEvent2025SpringQuestComplete } from "@/hooks/event/useEvent2025SpringQuestComplete";
import {
  useFetchRecoilState,
  useValueRecoilState,
} from "@/hooks/useFetchRecoilState";
import { useAxios } from "@/hooks/useTaxiAPI";

import Button from "@/components/Button";
import DottedLine from "@/components/DottedLine";
import Input from "@/components/Input";
import InputAccount from "@/components/Input/InputAccount";
import InputPhoneNumber from "@/components/Input/inputPhoneNumber";
import Modal from "@/components/Modal";
import ProfileImage from "@/components/User/ProfileImage";

import alertAtom from "@/atoms/alert";
import { useSetRecoilState } from "recoil";

import { convertImage } from "@/tools/image";
import regExpTest from "@/tools/regExpTest";
import theme from "@/tools/theme";

import PhoneNumberBadge from "@/components/static/assets/profileImgWithPhoneNumber.png";

type ModalMypageModifyProps = Omit<
  Parameters<typeof Modal>[0],
  "padding" | "children" | "onEnter"
>;

type ProfileImageLargeProps = Parameters<typeof ProfileImage>[0];

const ProfileImageLarge = (props: ProfileImageLargeProps) => (
  <div
    css={{
      margin: "auto",
      width: "110px",
      height: "110px",
      borderRadius: "55%",
      overflow: "hidden",
    }}
  >
    <ProfileImage {...props} />
  </div>
);

const ButtonProfileImage = () => {
  const { t } = useTranslation("mypage");
  const axios = useAxios();

  const inputRef = useRef<HTMLInputElement>(null);
  const [profileAlert, setProfileAlert] = useState<Nullable<string>>(null);
  const fetchLoginInfo = useFetchRecoilState("loginInfo");

  useEffect(() => {
    if (profileAlert === "LOADING") return;
    const timeoutID = setTimeout(() => setProfileAlert(null), 1500);
    return () => clearTimeout(timeoutID);
  }, [profileAlert]);

  const handleUploadProfileImage = useCallback(async () => {
    setProfileAlert("LOADING");
    try {
      const image = await convertImage(inputRef.current?.files?.[0]);
      if (!image) return;
      const data = await axios({
        url: "/users/editProfileImg/getPUrl",
        method: "post",
        data: {
          type: image.type,
        },
      });
      if (data.url && data.fields) {
        const formData = new FormData();
        for (const key in data.fields) {
          formData.append(key, data.fields[key]);
        }
        formData.append("file", image);
        const res = await axiosOri.post(data.url, formData);
        if (res.status === 204) {
          const data2 = await axios({
            url: "/users/editProfileImg/done",
            method: "get",
          });
          if (data2?.result) {
            fetchLoginInfo();
            setProfileAlert("SUCCESS");
            return;
          }
        }
      }
      setProfileAlert("FAIL");
    } catch (e) {
      setProfileAlert("FAIL");
    }
  }, []);

  const onClick = useCallback(() => {
    if (!profileAlert) inputRef.current?.click();
  }, [profileAlert]);

  const style = {
    textAlign: "center",
    ...theme.font10_bold,
    color:
      profileAlert === "SUCCESS"
        ? theme.green_button
        : profileAlert === "FAIL"
        ? theme.red_button
        : profileAlert === "LOADING"
        ? theme.gray_text
        : theme.purple,
    width: "fit-content",
    margin: "16px auto",
    cursor: profileAlert ? "default" : "pointer",
  } as const;

  return (
    <div css={style} onClick={onClick}>
      <input
        type="file"
        accept="image/jpg, image/png, image/jpeg, image/heic"
        hidden
        onChange={handleUploadProfileImage}
        ref={inputRef}
      />
      {profileAlert === "SUCCESS"
        ? t("page_modify.profile_image_success")
        : profileAlert === "FAIL"
        ? t("page_modify.profile_image_failed")
        : profileAlert === "LOADING"
        ? t("page_modify.profile_image_loading")
        : t("page_modify.profile_image_change")}
    </div>
  );
};

const ModalMypageModify = ({ ...modalProps }: ModalMypageModifyProps) => {
  const { t } = useTranslation("mypage");
  const axios = useAxios();

  const [nickname, setNickname] = useState("");
  const [account, setAccount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const loginInfo = useValueRecoilState("loginInfo");
  const fetchLoginInfo = useFetchRecoilState("loginInfo");
  //#region event2025Spring
  const event2025SpringQuestComplete = useEvent2025SpringQuestComplete();
  //#endregion
  const setAlert = useSetRecoilState(alertAtom);

  useEffect(() => {
    if (modalProps.isOpen) {
      setNickname(loginInfo?.nickname || "");
      setAccount(loginInfo?.account || "");
      setPhoneNumber(loginInfo?.phoneNumber || "");
    }
  }, [loginInfo, modalProps.isOpen]);

  const isEditable =
    regExpTest.account(account) && regExpTest.nickname(nickname);
  const handleEditProfile = async () => {
    let isNeedToUpdateLoginInfo = false;
    if (!isEditable) return;

    if (nickname !== loginInfo?.nickname) {
      isNeedToUpdateLoginInfo = true;
      await axios({
        url: "/users/editNickname",
        method: "post",
        data: { nickname },
        onError: () => setAlert(t("page_modify.nickname_failed")),
        //#region event2025Spring
        onSuccess: () => event2025SpringQuestComplete("nicknameChanging"),
        //#endregion
      });
    }
    if (account !== loginInfo?.account) {
      isNeedToUpdateLoginInfo = true;
      await axios({
        url: "/users/editAccount",
        method: "post",
        data: { account },
        onError: () => setAlert(t("page_modify.account_failed")),
        //#region event2025Spring
        onSuccess: () => event2025SpringQuestComplete("accountChanging"),
        //#endregion
      });
    }
    if (phoneNumber !== loginInfo?.phoneNumber) {
      isNeedToUpdateLoginInfo = true;
      await axios({
        url: "/users/editPhoneNumber",
        method: "post",
        data: { phoneNumber },
        onError: () => setAlert(t("page_modify.phone_number_failed")),
        //#region event2025Spring
        onSuccess: () => event2025SpringQuestComplete("accountChanging"),
        //#endregion
      });
    }
    if (isNeedToUpdateLoginInfo) {
      fetchLoginInfo();
    }
    modalProps.onChangeIsOpen?.(false);
  };

  const styleName = {
    ...theme.font20,
    textAlign: "center",
    marginBottom: "16px",
  } as const;
  const styleTitle = {
    display: "flex",
    alignItems: "center",
    color: theme.gray_text,
    whiteSpace: "nowrap",
    ...theme.font14,
  } as const;
  const styleContent = {
    ...theme.font14,
    marginLeft: "12px",
  };
  const styleButton = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "24px",
  };

  return (
    <Modal padding="32px 10px 10px" onEnter={handleEditProfile} {...modalProps}>
      <div css={styleName}>{loginInfo?.name} {loginInfo?.phoneNumber && (<img src={PhoneNumberBadge} />)}</div>
      {loginInfo?.profileImgUrl && (
        <ProfileImageLarge url={loginInfo?.profileImgUrl} />
      )}
      <ButtonProfileImage />
      <DottedLine direction="row" margin="0 2px" />
      <div css={{ rowGap: "10px", padding: "0px 20px" }}>
        <div css={{ ...styleTitle, marginTop: "24px" }}>
          {t("student_id")}
          <div css={styleContent}>{loginInfo?.subinfo?.kaist}</div>
        </div>
        <div css={{ ...styleTitle, marginTop: "16px" }}>
          {t("email")}
          <div css={styleContent}>{loginInfo?.email}</div>
        </div>
        <div css={{ ...styleTitle, marginTop: "10px" }}>
          {t("nickname")}
          <Input
            value={nickname}
            onChangeValue={setNickname}
            css={{ width: "100%", marginLeft: "10px" }}
          />
        </div>
        <div css={{ ...styleTitle, marginTop: "10px" }}>
          {t("account")}
          <InputAccount
            value={account}
            onChangeValue={setAccount}
            css={{ width: "100%", marginLeft: "10px" }}
          />
        </div>
        <div css={{ ...styleTitle, marginTop: "10px"}}>
          {t("phone_number")}
          <InputPhoneNumber
            value={phoneNumber}
            onChangeValue={setPhoneNumber}
            css={{ width: "100%", marginLeft: "10px" }}
          />
        </div>
      </div>
      <div css={styleButton}>
        <Button
          type="gray"
          css={{
            width: "calc(50% - 5px)",
            padding: "10px 0 9px",
            borderRadius: "8px",
            ...theme.font14,
          }}
          onClick={() => modalProps.onChangeIsOpen?.(false)}
        >
          {t("page_modify.cancel")}
        </Button>
        <Button
          type="purple_inset"
          disabled={
            !isEditable ||
            (nickname === loginInfo?.nickname && account === loginInfo?.account)
          }
          css={{
            width: "calc(50% - 5px)",
            padding: "10px 0 9px",
            borderRadius: "8px",
            ...theme.font14_bold,
          }}
          onClick={handleEditProfile}
        >
          {t("page_modify.modify")}
        </Button>
      </div>
    </Modal>
  );
};

export default ModalMypageModify;
