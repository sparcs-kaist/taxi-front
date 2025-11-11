import axiosOri from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { useEvent2025FallQuestComplete } from "@/hooks/event/useEvent2025FallQuestComplete";
import {
  useFetchRecoilState,
  useValueRecoilState,
} from "@/hooks/useFetchRecoilState";
import { useAxios } from "@/hooks/useTaxiAPI";

import Button from "@/components/Button";
import DottedLine from "@/components/DottedLine";
import Input from "@/components/Input";
import InputAccount from "@/components/Input/InputAccount";
import InputPhoneNumber from "@/components/Input/InputPhoneNumber";
import Modal from "@/components/Modal";
import PhoneAgreeModal from "@/components/ModalPopup/ModalPhoneAgree";
import BadgeTooltip from "@/components/Tooltip_badge";
import BadgeImage from "@/components/User/BadgeImage";
import ProfileImage from "@/components/User/ProfileImage";

import alertAtom from "@/atoms/alert";
import { useSetRecoilState } from "recoil";

import { convertImage } from "@/tools/image";
import regExpTest from "@/tools/regExpTest";
import theme from "@/tools/theme";

import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

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
      if (data.url) {
        await axiosOri({
          url: data.url,
          method: "put",
          headers: {
            "Content-Type": image.type,
          },
          data: image,
        });
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
  const [badge, setBadge] = useState<boolean>(false);
  const [PhoneAgreeModalOpen, setPhoneAgreeModalOpen] = useState(false);

  const loginInfo = useValueRecoilState("loginInfo");
  const fetchLoginInfo = useFetchRecoilState("loginInfo");
  const completeQuest = useEvent2025FallQuestComplete();

  //#region event2025Spring
  // const event2025SpringQuestComplete = useEvent2025SpringQuestComplete();
  //#region event2025Fall

  //#endregion
  const setAlert = useSetRecoilState(alertAtom);

  useEffect(() => {
    if (modalProps.isOpen) {
      setNickname(loginInfo?.nickname || "");
      setAccount(loginInfo?.account || "");
      setPhoneNumber(loginInfo?.phoneNumber || "");
      setBadge(loginInfo?.badge || false);
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
        // onSuccess: () => event2025SpringQuestComplete("nicknameChanging"),
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
        // onSuccess: () => event2025SpringQuestComplete("accountChanging"),
        //#endregion
      });
    }

    const hadPhone = loginInfo?.phoneNumber !== undefined;
    if (!hadPhone && phoneNumber) {
      setPhoneAgreeModalOpen(true);
      return;
    }

    if (badge == true) {
      isNeedToUpdateLoginInfo = true;
      await axios({
        url: "/users/editbadge",
        method: "post",
        data: { badge: "true" },
        onError: () => setAlert(t("page_modify.badge_display_failed")),
      });
    }
    if (badge == false) {
      isNeedToUpdateLoginInfo = true;
      await axios({
        url: "/users/editbadge",
        method: "post",
        data: { badge: "false" },
        onError: () => setAlert(t("page_modify.badge_display_failed")),
      });
    }
    if (isNeedToUpdateLoginInfo) {
      fetchLoginInfo();
    }
    modalProps.onChangeIsOpen?.(false);
  };

  const handlePhoneNumberYes = async () => {
    await axios({
      url: "/users/registerPhoneNumber",
      method: "post",
      data: { phoneNumber },
      onError: () => setAlert(t("page_modify.phone_number_failed")),
    });

    // 2025 Fall 기간에는 전화번호 등록 시 이벤트 참여가 진행됩니다.
    await axios({
      url: "/events/2025fall/globalState/create",
      method: "post",
      data: { phoneNumber },
      onSuccess: () => {
        fetchLoginInfo();
        modalProps.onChangeIsOpen?.(false);
        completeQuest("phoneVerification");
      },
      onError: () => setAlert("이벤트 참여에 실패하였습니다."),
    });

    fetchLoginInfo();
    setPhoneAgreeModalOpen(false);
    modalProps.onChangeIsOpen?.(false);
  };
  const handlePhoneNumberNo = () => {
    setPhoneAgreeModalOpen(false);
    modalProps.onChangeIsOpen?.(true);
    setPhoneNumber(loginInfo?.phoneNumber || "");
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
  const styleCheckBox = {
    width: "16px",
    height: "16px",
    overflow: "hidden",
    borderRadius: "50%",
    background: theme.purple_light,
    boxShadow: theme.shadow_purple_input_inset,
    transitionDuration: theme.duration,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const styleCheckBoxIcon = {
    width: "14px",
    height: "14px",
    fill: theme.white,
  };

  return (
    <>
      {!PhoneAgreeModalOpen && (
        <Modal
          padding="32px 10px 10px"
          onEnter={handleEditProfile}
          {...modalProps}
        >
          <div css={styleName} className="selectable">
            {loginInfo?.name}
            {loginInfo?.phoneNumber !== undefined && (
              <BadgeImage badge_live={badge} />
            )}
          </div>
          {loginInfo?.profileImgUrl && (
            <ProfileImageLarge url={loginInfo?.profileImgUrl} />
          )}
          <ButtonProfileImage />
          <div>
            {loginInfo?.phoneNumber !== undefined && (
              <div
                css={{
                  justifyContent: "flex-end",
                  gap: "6px",
                  padding: "0px 20px",
                  marginBottom: "8px",
                  rowGap: "10px",
                  ...styleTitle,
                }}
              >
                {t("Badge Display")}
                <div
                  css={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <div
                    onClick={() => {
                      setBadge(!badge);
                    }}
                    css={{
                      ...styleCheckBox,
                      background: badge ? theme.purple : theme.purple_light,
                    }}
                  >
                    <CheckRoundedIcon style={styleCheckBoxIcon} />
                  </div>
                  <BadgeTooltip text="이 배지가 있는 회원분들은 문제가 생길 시 스팍스의 중계를 통해 문제를 해결할 수 있습니다." />
                </div>
              </div>
            )}
          </div>
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
            <div css={{ ...styleTitle, marginTop: "10px" }}>
              {t("phone_number")}
              {loginInfo?.phoneNumber !== undefined ? (
                <div css={{ styleContent, marginLeft: "10px" }}>
                  {loginInfo.phoneNumber}
                </div>
              ) : (
                <InputPhoneNumber
                  value={phoneNumber}
                  onChangeValue={setPhoneNumber}
                  css={{ width: "100%", marginLeft: "10px" }}
                />
              )}
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
                (nickname === loginInfo?.nickname &&
                  account === loginInfo?.account &&
                  badge === loginInfo?.badge &&
                  // 기존에 전화번호가 있거나, 없었고 입력란도 빈 상태면 변경 없음
                  (loginInfo?.phoneNumber !== undefined ||
                    phoneNumber === "")) ||
                // 신규 전화번호 입력 중이고, 길이가 13자 미만이면 비활성화
                (loginInfo?.phoneNumber === undefined &&
                  phoneNumber !== "" &&
                  phoneNumber.length < 13)
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
      )}
      <PhoneAgreeModal
        isOpen={PhoneAgreeModalOpen}
        onConfirm={handlePhoneNumberYes}
        onCancel={handlePhoneNumberNo}
      />
    </>
  );
};

export default ModalMypageModify;
