import axiosOri from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { useEvent2026SpringQuestComplete } from "@/hooks/event/useEvent2026SpringQuestComplete";
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

const CounterClockwiseIcon = ({
  size = 24,
  onClick,
}: {
  size?: number;
  onClick?: () => void;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={theme.purple}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    onClick={onClick}
  >
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </svg>
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
  const [residence, setResidence] = useState("");
  const [badge, setBadge] = useState<boolean>(false);
  const [PhoneAgreeModalOpen, setPhoneAgreeModalOpen] = useState(false);
  const [initialNickname, setInitialNickname] = useState(""); // 처음 닉네임 기억용
  const isResettingRef = useRef(false);

  const loginInfo = useValueRecoilState("loginInfo");
  const fetchLoginInfo = useFetchRecoilState("loginInfo");

  //#region event2026Spring
  const event2026SpringQuestComplete = useEvent2026SpringQuestComplete();
  //#endregion

  const setAlert = useSetRecoilState(alertAtom);

  useEffect(() => {
    if (modalProps.isOpen) {
      const currentNickname = loginInfo?.nickname || "";
      setNickname(currentNickname);
      setInitialNickname(currentNickname); // 👈 초기 닉네임 백업!

      setAccount(loginInfo?.account || "");
      setPhoneNumber(loginInfo?.phoneNumber || "");
      setResidence(loginInfo?.residence || "");
      setBadge(loginInfo?.badge || false);
    } else {
      setNickname("");
    }
  }, [modalProps.isOpen]);

  useEffect(() => {
    // 깃발이 올라가 있고, 새 닉네임이 들어왔을 때만 실행!
    if (isResettingRef.current && loginInfo?.nickname) {
      setNickname(loginInfo.nickname);
      isResettingRef.current = false; // 리셋 완료했으니 깃발 내리기
    }
  }, [loginInfo]);

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
        //#region event2026Spring
        onSuccess: () => event2026SpringQuestComplete("nicknameChanging"),
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
        //#region event2026Spring
        onSuccess: () => event2026SpringQuestComplete("accountChanging"),
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
    if (residence.length === 0) {
      isNeedToUpdateLoginInfo = true;
      await axios({
        url: "/users/deleteResidence",
        method: "post",
        onError: () => setAlert(t("page_modify.residence_failed")),
      });
    } else if (residence.length > 0 && residence.length <= 15) {
      if (residence !== loginInfo?.residence) {
        isNeedToUpdateLoginInfo = true;
        await axios({
          url: "/users/registerResidence",
          method: "post",
          data: { residence },
          onError: () => setAlert(t("page_modify.residence_failed")),
        });
      }
    } else {
      setAlert(t("page_modify.residence_failed"));
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

    // 2026 Spring 기간에는 전화번호 등록 시 이벤트 참여가 진행됩니다.
    await axios({
      url: "/events/2026spring/globalState/create",
      method: "post",
      data: { phoneNumber },
      onSuccess: () => {
        fetchLoginInfo();
        modalProps.onChangeIsOpen?.(false);
        event2026SpringQuestComplete("phoneVerification");
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
  const handleIconClick = useCallback(async () => {
    try {
      isResettingRef.current = true; // 1. 화면 깜빡임 없이 조용히 깃발 올리기

      await axios({
        url: "/users/resetNickname",
        method: "get",
      });

      // 2. 서버 통신 완료 후 최신 정보 땡겨오기
      fetchLoginInfo();
    } catch (e) {
      isResettingRef.current = false; // 에러 나면 조용히 깃발 내리기
      setAlert("닉네임 랜덤 생성에 실패했습니다.");
    }
  }, [axios, fetchLoginInfo, setAlert]);
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
                css={{ width: "80%", marginLeft: "10px", marginRight: "5px" }}
              />
              <CounterClockwiseIcon size={20} onClick={handleIconClick} />
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
            <div css={{ ...styleTitle, marginTop: "10px" }}>
              {t("residence")}
              <Input
                value={residence}
                onChangeValue={setResidence}
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
                // 👇 nickname을 loginInfo.nickname이 아닌 initialNickname과 비교!
                (nickname === initialNickname &&
                  account === (loginInfo?.account || "") &&
                  badge === (loginInfo?.badge ?? false) &&
                  residence === (loginInfo?.residence || "") &&
                  (loginInfo?.phoneNumber !== undefined ||
                    phoneNumber === "")) ||
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
