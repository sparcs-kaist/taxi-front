import { useState } from "react";

import Button from "@/components/Button";
import DottedLine from "@/components/DottedLine";

import theme from "@/tools/theme";

import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

type BodyChatReportSelectUserProps = {
  onChangeIsOpen?: (isOpen: boolean) => void;
};

const BodyChatReportSelectUser = ({
  onChangeIsOpen,
}: BodyChatReportSelectUserProps) => {
  const styleText = {
    ...theme.font12,
    color: theme.gray_text,
    margin: "0 8px 12px",
  };
  const styleTextWarn = {
    ...theme.font12,
    height: "36px",
    width: "90%",
    marginLeft: "5px",
    marginBottom: "12px",
    color: theme.red_text,
  };
  const styleButtons = {
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
  } as const;
  const styleUsers = {
    margin: "12px 8px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "10px",
  };
  const styleUser = {
    display: "flex",
    alignItems: "center",
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
      <div css={styleText}>정말 방을 생성하실 건가요?</div>
      <div css={styleText}>
        짧은 시간동안 반복적으로 여러 개의 방을 생성하신 것 같습니다. 방 생성 후
        정산/송금 기능을 사용하실 경우, 실제 택시 탑승 목적의 방인지 확인하기
        위해 Taxi팀에서 택시 영수증 등 증빙 서류의 제출을 요청드릴 수 있고,
        실제로 택시를 탑승하지 않으신 경우 획득한 넙죽코인이 모두 회수되고,
        추가적인 이벤트 참여가 제한될 수 있습니다.
      </div>
      <div css={styleText}>그래도 방을 생성할까요?</div>
      <DottedLine />
      <div css={styleUsers}>
        <div css={styleUser} onClick={() => setIsAgree(!isAgree)}>
          <div
            css={{
              ...styleCheckBox,
              background: isAgree ? theme.purple : theme.purple_light,
            }}
          >
            {<CheckRoundedIcon style={styleCheckBoxIcon} />}
          </div>
          <div style={styleTextWarn}>
            위 경고 사항을 인지 하였으며,명시된 책임 소지를 다하지 못하였을때
            서비스 사용에 불이익이 있을 수 있음을 동의합니다.
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

export default BodyChatReportSelectUser;
