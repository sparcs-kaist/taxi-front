import PropTypes from "prop-types";
import { useMemo } from "react";

import DottedLine from "components/DottedLine";

import "./index.css";

import loginInfoDetailAtom from "atoms/loginInfoDetail";
import { useRecoilValue } from "recoil";

import { date2str } from "tools/moment";
import theme from "tools/theme";
import { getLocationName } from "tools/trans";

import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";

const Tag = (props) => {
  const style = {
    ...theme.font10,
    color: theme.gray_text,
    display: "flex",
    borderRadius: "4px",
    gap: "3px",
    padding: "4px 6px 3px",
    background:
      props.theme === "purple" ? theme.purple_hover : theme.purple_light,
    boxShadow: theme.shadow_purple_input_inset,
  };
  const paid = props.users.find((user) => user.isSettlement === "paid");
  let isDone = null;
  // let person = null;

  if (!props.isDeparted) {
    isDone = (
      <>
        인원 :
        <div style={{ color: theme.purple, ...theme.font10_bold }}>
          {props.users.length}명
        </div>{" "}
        /{props.maxPartLength}명
      </>
    );
  } else if (!paid) {
    isDone = <div style={{ color: theme.purple }}>결제 미완료</div>;
  } else if (props.isSettlementForMe === "paid") {
    isDone = <div>결제 완료</div>;
  } else if (props.isSettlementForMe === "sent") {
    isDone = <div>정산 완료</div>;
  } else if (props.isSettlementForMe === "send-required") {
    isDone = <div style={{ color: theme.purple }}>정산 미완료</div>;
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

const Room = (props) => {
  const users = props.data?.part || [];
  const loginInfoDetail = useRecoilValue(loginInfoDetailAtom);
  const isSettlementForMe = useMemo(
    () => users.find((user) => user._id === loginInfoDetail.oid)?.isSettlement,
    [loginInfoDetail?.oid, JSON.stringify(users)]
  );
  const styleBox = {
    position: "relative",
    background: props.theme === "purple" ? theme.purple_light : theme.white,
    borderRadius: "12px",
    marginTop: props.marginTop,
    marginBottom: props.marginBottom,
    boxShadow:
      theme.shadow +
      (props.selected ? `, inset 0 0 0 0.5px ${theme.purple}` : ""),
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
  };
  const stylePlaceGrid = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "16px",
    padding: "0 8px",
  };
  const stylePlace = {
    ...theme.font14_bold,
    width: "calc(50% - 12px)",
    textAlign: "center",
  };
  const styleArrow = {
    fontSize: "16px",
    color: theme.gray_text,
  };
  const styleDate = {
    ...theme.font12,
    color: theme.purple,
    padding: "12px 0",
    textAlign: "center",
  };

  return (
    <div style={styleBox} className="shadow" onClick={props.onClick}>
      <div style={styleTop}>
        <div style={styleName}>{props.data?.name}</div>
        <Tag
          users={users}
          isDeparted={props.data?.isDeparted}
          isSettlementForMe={isSettlementForMe}
          maxPartLength={props.data?.maxPartLength}
          theme={props.theme}
        />
      </div>
      <DottedLine direction="row" margin="0 12px" />
      <div style={stylePlaceGrid}>
        <div style={stylePlace}>{getLocationName(props.data?.from, "ko")}</div>
        <ArrowRightAltRoundedIcon style={styleArrow} />
        <div style={stylePlace}>{getLocationName(props.data?.to, "ko")}</div>
      </div>
      <div style={styleDate}>{date2str(props.data?.time)}</div>
    </div>
  );
};

Room.propTypes = {
  data: PropTypes.object,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  marginTop: PropTypes.string,
  marginBottom: PropTypes.string,
  theme: PropTypes.string,
};

Room.defaultProps = {
  seleted: false,
  onClick: () => {},
  marginTop: "0px",
  marginBottom: "0px",
};

Tag.propTypes = {
  users: PropTypes.array,
  maxPartLength: PropTypes.number,
  theme: PropTypes.string,
  isDeparted: PropTypes.bool,
  isSettlementForMe: PropTypes.string,
};

export default Room;
