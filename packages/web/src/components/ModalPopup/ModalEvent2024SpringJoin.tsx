import { useCallback, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

import { useEvent2024SpringQuestComplete } from "@/hooks/event/useEvent2024SpringQuestComplete";
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

import alertAtom from "@/atoms/alert";
import { useSetRecoilState } from "recoil";

import regExpTest from "@/tools/regExpTest";
import theme from "@/tools/theme";

import FestivalRoundedIcon from "@mui/icons-material/FestivalRounded";

type ModalEvent2024SpringJoinProps = Parameters<typeof Modal>[0];

const ModalEvent2024SpringJoin = (
  modalProps: ModalEvent2024SpringJoinProps
) => {
  const axios = useAxios();
  const setAlert = useSetRecoilState(alertAtom);
  const isLogin = useIsLogin();
  const { phoneNumber: phoneNumberFromLoginInfo } =
    useValueRecoilState("loginInfo") || {};
  const { isAgreeOnTermsOfEvent } =
    useValueRecoilState("event2024SpringInfo") || {};
  const { group: groupFromLoginInfo } =
    useValueRecoilState("event2024SpringInfo") || {};
  const fetchLoginInfo = useFetchRecoilState("loginInfo");
  //#region event2024Spring
  const event2024SpringQuestComplete = useEvent2024SpringQuestComplete();
  //#endregion

  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [group, setGroup] = useState<number>(0);
  // 추천인 구현 방식에 따라 삭제가 필요할 수도 있습니다.
  const [inviter] = useState<string>("");

  const isValidPhoneNumber = useMemo(
    () => regExpTest.phoneNumber(phoneNumber),
    [phoneNumber]
  );

  const isValidGroup = useMemo(() => group > 0 && group < 27, [group]);

  const location = useLocation();
  const path = location.pathname;
  const isInvited = path.startsWith("/home/startEvent/");

  const onClickJoin = useCallback(
    () =>
      axios({
        url: "/events/2024spring/globalState/create",
        method: "post",
        data: { phoneNumber, group, inviter },
        onSuccess: () => {
          fetchLoginInfo();
          //#region event2024Spring
          event2024SpringQuestComplete("firstLogin");
          //#endregion
          modalProps.onChangeIsOpen?.(false);
        },
        onError: () => setAlert("이벤트 참여에 실패하였습니다."),
      }),
    [phoneNumber, setPhoneNumber, event2024SpringQuestComplete]
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

  return (
    <Modal padding="16px 12px 12px" {...modalProps}>
      <div css={styleTitle}>
        <FestivalRoundedIcon style={styleIcon} />
        새터반 택시대제전 이벤트
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
          입력해주신 새터반으로 점수가 합산됩니다.
        </b>{" "}
        또한, 입력해주신 전화번호는 서비스 신고 대응 및 본인 확인을 위해 사용될
        수 있습니다.
      </div>
      <div css={{ height: "12px" }} />
      <div css={styleText}>
        •{" "}
        <b css={{ color: theme.red_text }}>
          입력해주신 새터반과 연락처는 이후 수정이 불가능합니다.
        </b>{" "}
      </div>
      <div css={{ height: "12px" }} />
      <div css={styleText}>
        • 본 약관은 동의 이후에도 {'"'}마이페이지{">"}새터반 택시 대제전 이벤트
        참여 약관{'"'}에서 다시 확인하실 수 있습니다.{" "}
      </div>
      <div css={{ height: "12px" }} />
      <div css={styleText}>
        •{" "}
        <b css={{ color: theme.red_text }}>
          추천인 이벤트 참여를 위해서는 추천인이 발송한 링크로 이벤트에
          참여해야합니다.
        </b>{" "}
        추천인 이벤트를 통해 이벤트를 참여할 시 참가자와 추천인 모두에게 50
        넙죽코인이 제공됩니다.
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
            <div css={styleInputWrap}>
              새터반
              <Input
                value={groupFromLoginInfo?.toString() || ""}
                css={{ width: "100%", marginLeft: "10px" }}
              />
            </div>
            {/* 추천인이 있을 경우에만 표시하도록 변경 필요 */}
            {/* <div css={styleInputWrap}>
              추천인
              <img
                src=""
                alt="추천인"
                css={{ width: "24px", height: "24px", marginLeft: "10px" }}
              />
              <span css={{ marginLeft: "5px" }}>추천인닉네임</span>
            </div> */}
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
            <div css={styleInputWrap}>
              새터반
              <Input
                type="number"
                value={group.toString()}
                onChangeValue={(value) => {
                  const number = parseInt(value, 10);
                  setGroup(number);
                }}
                placeholder="숫자만 입력하세요"
                css={{ width: "100%", marginLeft: "10px" }}
              />
            </div>
            {isInvited && (
              <div css={styleInputWrap}>
                추천인
                <img
                  src=""
                  alt="추천인"
                  css={{ width: "24px", height: "24px", marginLeft: "10px" }}
                />
                <span css={{ marginLeft: "5px" }}>추천인닉네임</span>
              </div>
            )}

            <Button
              type="purple_inset"
              css={{
                width: "100%",
                padding: "10px 0 9px",
                borderRadius: "8px",
                ...theme.font14_bold,
              }}
              onClick={onClickJoin}
              disabled={!isValidPhoneNumber || !isValidGroup}
            >
              {!isValidPhoneNumber
                ? "올바른 전화번호를 입력하세요"
                : !isValidGroup
                ? "올바른 새터반을 입력하세요"
                : "동의 후 이벤트 참여하기"}
            </Button>
          </>
        ))}
    </Modal>
  );
};

export default ModalEvent2024SpringJoin;
