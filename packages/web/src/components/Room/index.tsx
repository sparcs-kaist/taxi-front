import type { ReactNode } from "react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import DottedLine from "@/components/DottedLine";

import "./index.css";

import loginInfoAtom from "@/atoms/loginInfo";
import { useRecoilValue } from "recoil";

import { date2str } from "@/tools/moment";
import theme from "@/tools/theme";
import { getLocationName } from "@/tools/trans";

import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";

type RoomData = Room & { isDeparted?: boolean };

type TagProps = {
  users: User[];
  isDeparted?: boolean;
  isSettlementForMe: "not-departed" | "paid" | "send-required" | "sent";
  maxPartLength?: number;
  theme: "purple" | "white";
};

type RoomProps = {
  data?: RoomData | null;
  selected?: boolean;
  onClick?: () => void;
  marginTop?: string;
  marginBottom?: string;
  theme?: "purple" | "white";
};

const Tag = (props: TagProps) => {
  const style: React.CSSProperties = {
    ...theme.font10,
    color: theme.gray_text,
    display: "flex",
    borderRadius: "4px",
    gap: "3px",
    padding: "4px 6px 3px",
    background:
      props.theme === "purple" ? theme.purple_hover : theme.purple_light,
    boxShadow: theme.shadow_purple_input_inset,
    flexGrow: "0",
    flexShrink: "0",
  };
  const paid = props.users.find((user) => user.isSettlement === "paid");
  let isDone: ReactNode = null;
  // let person = null;
  const usersNotGhost = props.users.filter((user) => user.name !== "유령");

  if (!props.isDeparted) {
    isDone = (
      <>
        인원 :
        <div style={{ color: theme.purple, ...theme.font10_bold }}>
          {usersNotGhost.length}명
        </div>{" "}
        /{props.maxPartLength ?? 4}명
      </>
    );
  } else if (!paid) {
    isDone = <div style={{ color: theme.purple }}>정산 미완료</div>;
  } else if (props.isSettlementForMe === "paid") {
    isDone = <div>정산 완료</div>;
  } else if (props.isSettlementForMe === "sent") {
    isDone = <div>송금 완료</div>;
  } else if (props.isSettlementForMe === "send-required") {
    isDone = <div style={{ color: theme.purple }}>송금 미완료</div>;
  }

  // if (paid.length === 0) {
  //   person = null;
  // } else {
  //   person = (
  //     <div style={style}>
  //       <div>
  //         <div>{paid[0].nickname}</div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    // <div style={{ display: "flex" }}>
    <div style={style}>
      {isDone}
      {/* {person} */}
    </div>
    // </div>
  );
};

const Room = ({
  data,
  selected = false,
  onClick = () => {},
  marginTop = "0px",
  marginBottom = "0px",
  theme: themeProp = "purple",
}: RoomProps) => {
  
  const { i18n } = useTranslation();

  const users = data?.part ?? [];
  const loginInfo = useRecoilValue(loginInfoAtom);
  const isSettlementForMe = useMemo(
    () =>
      (users.find((user) => user._id === loginInfo?.oid)?.isSettlement ??
        "paid") as "not-departed" | "paid" | "send-required" | "sent",
    [loginInfo?.oid, JSON.stringify(users)]
  );
  const styleBox: React.CSSProperties = {
    position: "relative",
    background:
      themeProp === "purple" ? theme.purple_light : theme.white,
    borderRadius: "12px",
    marginTop: marginTop,
    marginBottom: marginBottom,
    boxShadow:
      theme.shadow +
      (selected ? `, inset 0 0 0 0.5px ${theme.purple}` : ""),
    ...theme.cursor(),
  };
  const styleTop = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 12px 0 20px",
  };
  const styleName = {
    ...theme.font12,
    margin: "13px 0 12px",
    flexShrink: "1",
    flexGrow: "0",
  };
  const stylePlaceGrid = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "16px",
    padding: "0 8px",
  };
  const stylePlace: React.CSSProperties = {
    ...theme.font14_bold,
    width: "calc(50% - 12px)",
    textAlign: "center",
  };
  const styleArrow = {
    fontSize: "16px",
    color: theme.gray_text,
  };
  const styleDate: React.CSSProperties = {
    ...theme.font12,
    color: theme.purple,
    padding: "12px 0",
    textAlign: "center",
  };

  return (
    <div style={styleBox} className="shadow" onClick={onClick}>
      <div style={styleTop}>
        <div style={styleName}>{data?.name}</div>
        <Tag
          users={users}
          isDeparted={data?.isDeparted}
          isSettlementForMe={isSettlementForMe}
          maxPartLength={data?.maxPartLength}
          theme={themeProp}
        />
      </div>
      <DottedLine direction="row" margin="0 12px" />
      <div style={stylePlaceGrid}>
        <div style={stylePlace}>
          {getLocationName(data?.from, i18n.language)}
        </div>
        <ArrowRightAltRoundedIcon style={styleArrow} />
        <div style={stylePlace}>
          {getLocationName(data?.to, i18n.language)}
        </div>
      </div>
      <div style={styleDate}>{date2str(data?.time)}</div>
    </div>
  );
};

export default Room;
