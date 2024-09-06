import { useCallback, useEffect, useMemo, useState } from "react";

import { useEvent2024FallQuestComplete } from "@/hooks/event/useEvent2024FallQuestComplete";
import {
  useFetchRecoilState,
  useIsLogin,
  useValueRecoilState,
} from "@/hooks/useFetchRecoilState";
import { useAxios } from "@/hooks/useTaxiAPI";

import Button from "@/components/Button";
import DottedLine from "@/components/DottedLine";
import Input from "@/components/Input";
import Modal from "@/components/Modal";

import ProfileImage from "../User/ProfileImage";

import alertAtom from "@/atoms/alert";
import { useSetRecoilState } from "recoil";

import regExpTest from "@/tools/regExpTest";
import theme from "@/tools/theme";

import FestivalRoundedIcon from "@mui/icons-material/FestivalRounded";

type ModalEvent2024FallJoinProps = Parameters<typeof Modal>[0] & {
  inviterId?: string;
  defaultPhoneNumber?: string;
};

const ModalEvent2024FallJoin = ({
  inviterId,
  ...modalProps
}: ModalEvent2024FallJoinProps) => {
  const axios = useAxios();
  const setAlert = useSetRecoilState(alertAtom);
  const isLogin = useIsLogin();
  const { phoneNumber: phoneNumberFromLoginInfo } =
    useValueRecoilState("loginInfo") || {};
  const { isAgreeOnTermsOfEvent } =
    useValueRecoilState("event2024FallInfo") || {};
  const fetchLoginInfo = useFetchRecoilState("loginInfo");
  //#region event2024fall
  const event2024FallQuestComplete = useEvent2024FallQuestComplete();
  //#endregion

  const [phoneNumber, setPhoneNumber] = useState<string>(
    phoneNumberFromLoginInfo || ""
  );
  const isValidPhoneNumber = useMemo(
    () => regExpTest.phoneNumber(phoneNumber),
    [phoneNumber]
  );

  const [inviterInfo, setInviterInfo] = useState<{
    profileImageUrl: string;
    nickname: string;
  }>();
  const isInvited = !!inviterId;

  useEffect(() => {
    setPhoneNumber(phoneNumberFromLoginInfo || "");
  }, [modalProps.isOpen]);

  useEffect(() => {
    if (isAgreeOnTermsOfEvent || !isInvited) return;
    axios({
      url: `/events/2024fall/invites/search/${inviterId}`,
      method: "get",
      onSuccess: (data) => {
        setInviterInfo(data);
      },
      onError: () => setAlert("올바르지 않은 추천인입니다."),
    });
  }, [inviterId]);

  const onClickJoin = useCallback(
    () =>
      axios({
        url: "/events/2024fall/globalState/create",
        method: "post",
        data: { phoneNumber, inviter: inviterId },
        onSuccess: () => {
          fetchLoginInfo();
          //#region event2024fall
          event2024FallQuestComplete("firstLogin");
          //#endregion
          modalProps.onChangeIsOpen?.(false);
        },
        onError: () => setAlert("이벤트 참여에 실패하였습니다."),
      }),
    [phoneNumber, setPhoneNumber, event2024FallQuestComplete]
  );

  const styleTitle = {
    ...theme.font18,
    display: "flex",
    alignItems: "center",
    margin: "0 8px 12px",
  };
  const styleIcon = {
    fontSize: "21px",
    margin: "0 4px 0 0",
  };
  const styleText = {
    ...theme.font12,
    color: theme.gray_text,
    margin: "0 8px",
  };
  const styleInputWrap = {
    margin: "12px 8px",
    display: "flex",
    alignItems: "center",
    color: theme.gray_text,
    whiteSpace: "nowrap",
    ...theme.font14,
  } as const;

  // ToDo : 글 작성
  return (
    <Modal padding="16px 12px 12px" {...modalProps}>
      <div css={styleTitle}>
        <FestivalRoundedIcon style={styleIcon} />
        Taxi 추석 이벤트
      </div>
      <div css={styleText}>
        • 택시 동승을 하지 않는 사용자는{" "}
        <b css={{ color: theme.black }}>
          택시 출발 시각이 지나기 전에 탑승 취소
        </b>
        를 하여 방에서 나가야 합니다.
      </div>
      <div css={{ height: "12px" }} />
      <div css={styleText}>
        • 실제 Taxi 동승을 하지 않고{" "}
        <b css={{ color: theme.black }}>허위로 방을 개설하거나 참여</b>하여
        이벤트 퀘스트를 달성하는 것은{" "}
        <b css={{ color: theme.black }}>부정 이용</b>에 해당됩니다. Taxi 서비스
        이용 중 서비스를 부정 이용하였다고 판단되거나, 신고를 받은 사용자에게는
        사안에 따라{" "}
        <b css={{ color: theme.black }}>
          이벤트 상품이 지급되지 않을 수 있습니다.
        </b>{" "}
        위 경우, SPARCS Taxi팀 서비스 관리자는 서비스 부정 이용을 방지하기 위해
        택시 탑승을 인증할 수 있는{" "}
        <b css={{ color: theme.black }}>영수증 또는 카카오T 이용기록</b>을
        요청할 수 있습니다. 또한, 본 서비스를 부정 이용하는 사용자에게는 택시
        서비스 이용 제한 및 법적 조치를 취할 수 있습니다.
      </div>
      <div css={{ height: "12px" }} />
      <div css={styleText}>
        •{" "}
        <b css={{ color: theme.red_text }}>
          입력해주신 연락처로 이벤트 상품을 전달해드립니다.
        </b>{" "}
        또한, 서비스 신고 대응 및 본인 확인을 위해 사용될 수 있습니다.{" "}
        <b css={{ color: theme.red_text }}>
          입력해주신 연락처는 이후 수정이 불가능합니다.
        </b>
      </div>
      <div css={{ height: "12px" }} />
      <div css={styleText}>
        •{" "}
        <b css={{ color: theme.red_text }}>
          추천인 이벤트 참여를 위해서는 추천인이 발송한 링크로 이벤트에 참여해야
          합니다.
        </b>{" "}
        추천인을 통해 이벤트에 참여할 시, 참가자와 추천인 모두에게 700
        송편코인이 지급됩니다.
      </div>
      <div css={{ height: "12px" }} />
      <div css={styleText}>
        • 본 약관은 동의 이후에도 {'"'}마이페이지{">"}추석 이벤트 참여 약관{'"'}
        에서 다시 확인하실 수 있습니다.{" "}
      </div>
      {isLogin &&
        (isAgreeOnTermsOfEvent ? (
          <>
            <div css={{ height: "12px" }} />
            <DottedLine />
            <div css={styleInputWrap}>
              전화번호
              <Input
                value={phoneNumberFromLoginInfo || ""}
                css={{ width: "100%", marginLeft: "10px" }}
              />
            </div>
            <Button
              type="purple_inset"
              css={{
                width: "100%",
                padding: "10px 0 9px",
                borderRadius: "8px",
                ...theme.font14_bold,
              }}
              disabled
            >
              이미 동의하셨습니다
            </Button>
          </>
        ) : (
          <>
            <div css={{ height: "12px" }} />
            <DottedLine />
            <div css={styleInputWrap}>
              전화번호
              <Input
                value={phoneNumber}
                onChangeValue={setPhoneNumber}
                placeholder="010-0000-0000 형식으로 입력하세요"
                css={{ width: "100%", marginLeft: "10px" }}
              />
            </div>
            <Button
              type="purple_inset"
              css={{
                width: "100%",
                padding: "10px 0 9px",
                borderRadius: "8px",
                ...theme.font14_bold,
              }}
              onClick={onClickJoin}
              disabled={!isValidPhoneNumber}
            >
              {!isValidPhoneNumber
                ? "올바른 전화번호를 입력하세요"
                : "동의 후 이벤트 참여하기"}
            </Button>
          </>
        ))}
      {isInvited && inviterInfo && (
        <div css={styleInputWrap}>
          추천인
          <div
            css={{
              width: "24px",
              height: "24px",
              margin: "0px 10px",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: theme.shadow,
              flexShrink: 0,
            }}
          >
            <ProfileImage url={inviterInfo?.profileImageUrl} />
          </div>
          <span css={{ width: "100%", ...theme.ellipsis }}>
            {inviterInfo?.nickname}
          </span>
        </div>
      )}
    </Modal>
  );
};

export default ModalEvent2024FallJoin;
