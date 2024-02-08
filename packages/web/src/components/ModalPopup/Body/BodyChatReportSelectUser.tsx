import { Dispatch, SetStateAction, useState } from "react";

import type { Report } from "@/types/report";

import useIsTimeOver from "@/hooks/useIsTimeOver";

import Button from "@/components/Button";
import DottedLine from "@/components/DottedLine";
import User from "@/components/User";

import { dayServerToClient } from "@/tools/day";
import theme from "@/tools/theme";

import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

type BodyChatReportSelectUserProps = {
  roomInfo: Room;
  setReportedId: Dispatch<SetStateAction<Nullable<Report["reportedId"]>>>;
  onChangeIsOpen?: (isOpen: boolean) => void;
};

const BodyChatReportSelectUser = ({
  roomInfo,
  setReportedId,
  onChangeIsOpen,
}: BodyChatReportSelectUserProps) => {
  const [selectedUser, setSelectedUser] =
    useState<Nullable<Report["reportedId"]>>(null);
  const isDeparted = useIsTimeOver(dayServerToClient(roomInfo.time)); // 방 출발 여부

  const styleText = {
    ...theme.font12,
    color: theme.gray_text,
    margin: "0 8px 12px",
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
    gap: "6px",
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

  return (
    <>
      <div css={styleText}>
        택시 동승 후 송금을 하지 않았거나, 부적절한 언어 또는 상업적 광고의
        채팅, 기타 규정 위반 등의 행위를 목격하셨다면 해당 사용자를
        신고해주세요. SPARCS Taxi팀은 안전하고 청결한 택시 동승을 위해 최선을
        다할 것 입니다.
      </div>
      <div css={styleText}>신고할 사용자를 선택해주세요.</div>
      <DottedLine />
      <div css={styleUsers}>
        {roomInfo.part.map((user) => (
          <div
            key={user._id}
            css={styleUser}
            onClick={() => setSelectedUser(user._id)}
          >
            <div
              css={{
                ...styleCheckBox,
                background:
                  selectedUser === user._id ? theme.purple : theme.purple_light,
              }}
            >
              {selectedUser === user._id && (
                <CheckRoundedIcon style={styleCheckBoxIcon} />
              )}
            </div>
            <User value={user} isDeparted={isDeparted} />
          </div>
        ))}
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
          onClick={() => setReportedId(selectedUser)}
          disabled={!selectedUser}
        >
          다음
        </Button>
      </div>
    </>
  );
};

export default BodyChatReportSelectUser;
