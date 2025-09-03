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

import { ReactComponent as GoldBadgeIcon } from "@/static/assets/phone_badge_gold.svg";
import { ReactComponent as NormalBadgeIcon } from "@/static/assets/phone_badge_normal.svg";
import { ReactComponent as SilverBadgeIcon } from "@/static/assets/phone_badge_silver.svg";

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

// ---------- 배지 순환 로직 ----------
type BadgeSetting = "none" | "normal" | "silver" | "gold";
const BADGE_ORDER: BadgeSetting[] = ["none", "normal", "silver", "gold"];
const nextBadge = (s: BadgeSetting) =>
  BADGE_ORDER[(BADGE_ORDER.indexOf(s) + 1) % BADGE_ORDER.length];

function mapLoginInfoBadgeToState(raw: any): BadgeSetting {
  if (raw === true) return "normal";
  if (raw === false || raw === undefined || raw === null) return "none";
  if (raw === "normal" || raw === "silver" || raw === "gold") return raw;
  return "none";
}
// -----------------------------------

const ModalMypageModify = ({ ...modalProps }: ModalMypageModifyProps) => {
  const { t } = useTranslation("mypage");
  const axios = useAxios();

  const [nickname, setNickname] = useState("");
  const [account, setAccount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [badgeState, setBadgeState] = useState<BadgeSetting>("none");
  const [PhoneAgreeModalOpen, setPhoneAgreeModalOpen] = useState(false);

  const loginInfo = useValueRecoilState("loginInfo");
  const fetchLoginInfo = useFetchRecoilState("loginInfo");
  const event2025SpringQuestComplete = useEvent2025SpringQuestComplete();
  const setAlert = useSetRecoilState(alertAtom);

  useEffect(() => {
    if (modalProps.isOpen) {
      setNickname(loginInfo?.nickname || "");
      setAccount(loginInfo?.account || "");
      setPhoneNumber(loginInfo?.phoneNumber || "");
      setBadgeState(mapLoginInfoBadgeToState(loginInfo?.badge));
    }
  }, [loginInfo, modalProps.isOpen]);

  const prevBadgeState = mapLoginInfoBadgeToState(loginInfo?.badge);

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
        onSuccess: () => event2025SpringQuestComplete("nicknameChanging"),
      });
    }
    if (account !== loginInfo?.account) {
      isNeedToUpdateLoginInfo = true;
      await axios({
        url: "/users/editAccount",
        method: "post",
        data: { account },
        onError: () => setAlert(t("page_modify.account_failed")),
        onSuccess: () => event2025SpringQuestComplete("accountChanging"),
      });
    }

    const hadPhone = loginInfo?.phoneNumber !== undefined;
    if (!hadPhone && phoneNumber) {
      setPhoneAgreeModalOpen(true);
      return;
    }

    // 배지 상태 변경 저장
    if (badgeState !== prevBadgeState) {
      isNeedToUpdateLoginInfo = true;
      await axios({
        url: "/users/editbadge",
        method: "post",
        data: { badge: badgeState }, // 서버가 문자열 상태를 받도록
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

  // 배지 프리뷰용 컴포넌트 선택
  const CurrentBadgeIcon =
    badgeState === "gold"
      ? GoldBadgeIcon
      : badgeState === "silver"
        ? SilverBadgeIcon
        : badgeState === "normal"
          ? NormalBadgeIcon
          : null;

  const badgeLabel =
    badgeState === "none"
      ? "없음"
      : badgeState === "normal"
        ? "Normal"
        : badgeState === "silver"
          ? "Silver"
          : "Gold";

  // ====== 레이아웃 고정 + 상태별 스케일 ======
  const ICON_BOX = 18; // 아이콘 프레임 고정(px)
  const BUTTON_FIXED_W = 90; // 버튼 전체 폭 고정(px) 필요 시 조정
  const SCALE: Record<"normal" | "silver" | "gold", number> = {
    normal: 1.0,
    silver: 1.23,
    gold: 1.15,
  };
  const scale =
    badgeState === "none"
      ? 1
      : SCALE[badgeState as "normal" | "silver" | "gold"];
  // ===========================================

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
              <BadgeImage badge_live={badgeState !== "none"} />
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
                  gap: "8px",
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
                    gap: "8px",
                  }}
                >
                  {/* 배지 순환 버튼 - 외곽 폭 고정, 아이콘 왼쪽 / 라벨 오른쪽 */}
                  <div css={{ width: BUTTON_FIXED_W }}>
                    <button
                      type="button"
                      onClick={() => setBadgeState(nextBadge(badgeState))}
                      css={{
                        // 아이콘 고정폭 + 라벨 가변폭
                        display: "grid",
                        gridTemplateColumns: `${ICON_BOX}px 1fr`,
                        alignItems: "center",
                        padding: "6px 10px",
                        borderRadius: "8px",
                        background: theme.purple_light,
                        boxShadow: theme.shadow_purple_input_inset,
                        border: "none",
                        cursor: "pointer",
                        width: "100%", // 버튼 자체 폭 고정
                        whiteSpace: "nowrap", // 줄바꿈 방지
                        columnGap: "8px", // 아이콘-라벨 간 기본 간격
                      }}
                      aria-label={`배지 설정: ${badgeLabel}`}
                    >
                      {/* 아이콘: 왼쪽 고정폭 박스, 내부 아이콘만 scale */}
                      <div
                        css={{
                          width: ICON_BOX,
                          height: ICON_BOX,
                          display: "grid",
                          placeItems: "center",
                          overflow: "visible", // 확대 시 잘림 방지
                        }}
                      >
                        {CurrentBadgeIcon ? (
                          <CurrentBadgeIcon
                            css={{
                              width: "100%",
                              height: "100%",
                              transform: `scale(${scale})`,
                              transformOrigin: "center",
                              display: "block",
                            }}
                          />
                        ) : (
                          <div
                            css={{
                              width: ICON_BOX - 4,
                              height: ICON_BOX - 4,
                              background: theme.gray_background,
                            }}
                          />
                        )}
                      </div>

                      {/* 라벨: 오른쪽 정렬 */}
                      <span
                        css={{
                          ...theme.font12,
                          color: theme.black,
                          lineHeight: 1,
                          textAlign: "right", // ✅ 오른쪽 맞춤
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {badgeLabel}
                      </span>
                    </button>
                  </div>

                  <BadgeTooltip text="이 배지가 있는 회원분들은 문제가 생길 시 스팍스의 중계를 통해 문제를 해결할 수 있습니다." />
                </div>{" "}
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
                <div css={{ ...styleContent, marginLeft: "10px" }}>
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
                  badgeState === prevBadgeState &&
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
