import { useState } from "react";

import Button from "@/components/Button";
import DottedLine from "@/components/DottedLine";

import theme from "@/tools/theme";

import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

type BodyEvent2025FallAbuseWarningProps = {
  onChangeIsOpen?: (isOpen: boolean) => void;
};

const BodyEvent2025FallAbuseWarning = ({
  onChangeIsOpen,
}: BodyEvent2025FallAbuseWarningProps) => {
  const styleText = {
    ...theme.font12,
    color: theme.gray_text,
    margin: "0 8px 12px",
  };
  const styleTextWarn = {
    ...theme.font12,
    display: "flex",
    alignItem: "center",
    marginLeft: "5px",
    lineHeight: "16px",
    color: theme.red_text,
  };
  const styleButtons = {
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
  } as const;
  const styleWarn = {
    display: "flex",
    margin: "12px 8px",
    gap: "6px",
    ...theme.cursor(),
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
  const [isAgree, setIsAgree] = useState<boolean>(false);

  return (
    <>
      <div css={styleText}>
        짧은 시간 동안 반복적으로 여러 개의 방을 생성하신 것 같습니다.
      </div>
      <div css={styleText}>
        • 방 생성 후 <b css={{ color: theme.black }}>정산/송금 기능을 사용</b>
        하실 경우, 실제로 택시 탑승이 이루어졌는지 확인하기 위해 Taxi팀에서{" "}
        <b css={{ color: theme.black }}>영수증 등 증빙 서류의 제출을 요청</b>
        드릴 수 있습니다.
      </div>
      <div css={styleText}>
        • 실제로 택시에 탑승하지 않으신 경우,{" "}
        <b css={{ color: theme.black }}>
          획득한 넙죽코인 경품 응모권이 모두 회수되고
        </b>{" "}
        추가적인 <b css={{ color: theme.black }}>이벤트 참여가 제한</b>될 수
        있습니다.
      </div>
      <div css={styleText}>
        • 자세한 이벤트 약관은 {'"'}마이 페이지{">"}새학기 이벤트 참여 약관{'"'}
        에서 확인하실 수 있습니다.{" "}
      </div>
      <div css={styleText}>그래도 방을 생성할까요?</div>
      <DottedLine />
      <div css={{ display: "flex", alignItems: "center" }}>
        <div css={styleWarn} onClick={() => setIsAgree(!isAgree)}>
          <div
            css={{
              ...styleCheckBox,
              background: isAgree ? theme.purple : theme.purple_light,
            }}
          >
            <CheckRoundedIcon style={styleCheckBoxIcon} />
          </div>
          <div style={styleTextWarn}>
            이 방은 실제로 택시에 탑승하기 위한 목적의 방입니다.
          </div>
        </div>
      </div>
      <div css={styleButtons}>
        <Button
          type="gray"
          css={{
            width: "calc(50% - 5px)",
            padding: "10px 0 9px",
            borderRadius: "8px",
            ...theme.font14,
          }}
          onClick={() => onChangeIsOpen?.(false)}
        >
          돌아가기
        </Button>
        <Button
          type="purple_inset"
          css={{
            width: "calc(50% - 5px)",
            padding: "10px 0 9px",
            borderRadius: "8px",
            ...theme.font14_bold,
          }}
          onClick={() => onChangeIsOpen?.(true)}
          disabled={!isAgree}
        >
          생성하기
        </Button>
      </div>
    </>
  );
};

export default BodyEvent2025FallAbuseWarning;
