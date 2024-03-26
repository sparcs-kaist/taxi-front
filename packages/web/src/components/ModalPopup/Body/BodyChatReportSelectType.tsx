import {
  CSSProperties,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import type { Report } from "@/types/report";

import { useValueRecoilState } from "@/hooks/useFetchRecoilState";
import useIsTimeOver from "@/hooks/useIsTimeOver";
import { useAxios } from "@/hooks/useTaxiAPI";

import Button from "@/components/Button";
import DottedLine from "@/components/DottedLine";
import Select from "@/components/Input/Select";
import User from "@/components/User";

import alertAtom from "@/atoms/alert";
import { useSetRecoilState } from "recoil";

import { dayServerToClient } from "@/tools/day";
import regExpTest from "@/tools/regExpTest";
import theme from "@/tools/theme";

import EditRoundedIcon from "@mui/icons-material/EditRounded";

type BodyChatReportSelectTypeProps = {
  roomInfo: Room;
  reportedId: Report["reportedId"];
  setIsSelected: Dispatch<SetStateAction<boolean>>;
  setIsSubmitted: Dispatch<SetStateAction<boolean>>;
};

const selectOptions = [
  { value: "no-settlement", label: "송금을 하지 않음" },
  { value: "no-show", label: "택시에 동승하지 않음" },
  { value: "etc-reason", label: "기타 사유" },
];

const BodyChatReportSelectType = ({
  roomInfo,
  reportedId,
  setIsSelected,
  setIsSubmitted,
}: BodyChatReportSelectTypeProps) => {
  const axios = useAxios();
  const setAlert = useSetRecoilState(alertAtom);
  const { oid: userOid } = useValueRecoilState("loginInfo") || {};
  const wrapRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [height, setHeight] = useState<CSSProperties["height"]>("28px");
  const [type, setType] = useState<Report["type"]>("no-settlement");
  const [etcDetail, setEtcDetail] = useState<Report["etcDetail"]>("");
  const reportedUser: Nullable<User> = useMemo(
    () => roomInfo.part.find((user) => user._id === reportedId),
    [roomInfo, reportedId]
  );
  const isDeparted = useIsTimeOver(dayServerToClient(roomInfo.time)); // 방 출발 여부
  const isRequesting = useRef<boolean>(false);

  const inValidMessage = useMemo(
    () =>
      type === "no-settlement" && !isDeparted
        ? "출발 시각 이전에는 해당 사유로 사용자를 신고할 수 없습니다."
        : type === "no-settlement" && reportedUser?.isSettlement === "paid"
        ? "정산자는 송금 대상자가 아니기 때문에 해당 사유로 신고할 수 없습니다." +
          " 만약 택시비를 결제하지 않았는데 정산하기를 요청한 사용자라면 기타 사유로 신고해주세요."
        : type === "no-show" && !isDeparted
        ? "출발 시각 이전에는 해당 사유로 사용자를 신고할 수 없습니다."
        : type === "etc-reason" && etcDetail === ""
        ? "기타 사유를 입력해주세요."
        : type === "etc-reason" && !regExpTest.reportMsg(etcDetail)
        ? "기타 사유는 1500자 까지 입력이 허용됩니다."
        : userOid === reportedUser?._id
        ? "나 자신은 신고할 수 없습니다."
        : null,
    [type, etcDetail, isDeparted, userOid, reportedUser]
  );

  const resizeEvent = useCallback(() => {
    if (!wrapRef.current) return;
    const cacheHeight = wrapRef.current.style.height;
    wrapRef.current.style.height = "0";
    const newHeight = `${Math.max(
      Math.min(
        textareaRef.current ? textareaRef.current.scrollHeight : 0,
        document.body.clientHeight / 3
      ),
      28
    )}px`;
    wrapRef.current.style.height = cacheHeight;
    setHeight(newHeight);
  }, [setHeight]);

  useEffect(() => {
    resizeEvent();
    window.addEventListener("resize", resizeEvent);
    return () => window.removeEventListener("resize", resizeEvent);
  }, []);
  useEffect(resizeEvent, [etcDetail]);

  const handleSubmit = async () => {
    if (isRequesting.current) return;
    isRequesting.current = true;
    await axios({
      url: "/reports/create",
      method: "post",
      data: {
        reportedId,
        type,
        etcDetail: type === "etc-reason" ? etcDetail : undefined,
        time: new Date(),
        roomId: roomInfo._id,
      },
      onSuccess: () => setIsSubmitted(true),
      onError: () => setAlert("신고에 실패했습니다."),
    });
    isRequesting.current = false;
  };

  const styleText = {
    ...theme.font12,
    color: theme.gray_text,
    margin: "0 8px 12px",
  };
  const styleSelectWrap = {
    margin: "12px 8px",
    display: "flex",
    alignItems: "center",
    color: theme.gray_text,
    whiteSpace: "nowrap" as const,
    ...theme.font14,
  };
  const styleSelect = {
    width: "100%",
    marginLeft: "10px",
    color: theme.black,
  };
  const styleTextareaWrap = {
    height,
    position: "relative" as const,
    overflow: "hidden",
    margin: "0 8px 12px",
    borderRadius: "6px",
    background: theme.purple_light,
    boxShadow: theme.shadow_purple_input_inset,
  };
  const styleTextarea = {
    width: "100%",
    height: "100%",
    padding: "6px 12px 6px 38px",
    boxSizing: "border-box" as const,
    background: "none",
    border: "none",
    resize: "none" as const,
    outline: "none",
    ...theme.font14,
    color: theme.gray_text,
  };
  const styleIcon = {
    color: theme.black,
    fontSize: "14px",
    position: "absolute" as const,
    top: "6px",
    left: "12px",
  };
  const styleButtons = {
    position: "relative" as const,
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
  };

  return (
    <>
      {reportedUser && (
        <div css={styleText}>
          <User value={reportedUser} isDeparted={isDeparted} />
        </div>
      )}
      <div css={styleText}>
        를 어떤 사유로 신고할까요? 만약 선택지에 원하시는 사유가 없다면
        &quot;기타 사유&quot; 선택 후 자세히 설명해주세요.
      </div>
      <DottedLine />
      <div css={styleSelectWrap}>
        사유
        <Select
          options={selectOptions}
          value={type}
          onChangeValue={setType as (v: string) => void}
          css={styleSelect}
        />
      </div>
      {type === "etc-reason" && (
        <div ref={wrapRef} css={styleTextareaWrap}>
          <EditRoundedIcon style={styleIcon} />
          <textarea
            ref={textareaRef}
            value={etcDetail}
            onChange={(e) => setEtcDetail(e.target.value)}
            css={styleTextarea}
          />
        </div>
      )}
      {inValidMessage && (
        <div css={{ ...styleText, color: theme.red_text }}>
          {inValidMessage}
        </div>
      )}
      {!inValidMessage && type === "no-settlement" && (
        <div css={styleText}>
          신고하기 시 해당 사용자게에게 방 정보와 함께 송금을 재촉하는 메일이
          자동으로 보내집니다.
        </div>
      )}
      <div css={styleButtons}>
        <Button
          type="gray"
          css={{
            width: "calc(50% - 5px)",
            padding: "10px 0 9px",
            borderRadius: "8px",
            ...theme.font14,
          }}
          onClick={() => setIsSelected(false)}
        >
          이전
        </Button>
        <Button
          type="purple_inset"
          css={{
            width: "calc(50% - 5px)",
            padding: "10px 0 9px",
            borderRadius: "8px",
            ...theme.font14_bold,
          }}
          onClick={handleSubmit}
          disabled={!!inValidMessage}
        >
          신고하기
        </Button>
      </div>
    </>
  );
};

export default BodyChatReportSelectType;
