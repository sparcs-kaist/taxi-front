import React, { useState, useMemo } from "react";
import { useRecoilValue } from "recoil";
import preferenceAtom from "recoil/preference";
import PropTypes from "prop-types";
import { getLocationName } from "tools/trans";
import { date2str } from "tools/moment";
import loginInfoDetailAtom from "recoil/loginInfoDetail";
import DottedLine from "components/common/DottedLine";
import { theme } from "styles/theme";
import "./Room.css";

import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";

const Tag = (props) => {
  const style = {
    ...theme.font10,
    display: "flex",
    alignItems: "flex-start",
    borderRadius: "4px",
    gap: "3px",
    padding: "4px 6px 3px",
    background:
      props.theme === "purple" ? theme.gray_background : theme.purple_light,
    boxShadow:
      props.theme === "purple"
        ? theme.shadow_purple_input_inset
        : theme.shadow_gray_input_inset,
  };
  const paid = props.users.filter((user) => user.isSettlement === "paid");
  let isDone = null;
  let person = null;

  if (!props.isDeparted) {
    isDone = (
      <div style={style}>
        <div>남은 인원 : </div>
        <div style={{ color: "#6E3678", fontWeight: "400" }}>
          {props.maxPartLength - props.users.length} / {props.maxPartLength} 명
        </div>
      </div>
    );
  } else if (paid.length === 0) {
    isDone = (
      <div style={style}>
        <div style={{ color: "#6E3678", fontWeight: "400" }}>결재 미완료</div>
      </div>
    );
  } else if (props.isSettlementForMe === "paid") {
    isDone = (
      <div style={style}>
        <div>결제 완료</div>
      </div>
    );
  } else if (props.isSettlementForMe === "sent") {
    isDone = (
      <div style={style}>
        <div>정산 완료</div>
      </div>
    );
  } else if (props.isSettlementForMe === "send-required") {
    isDone = (
      <div style={style}>
        <div style={{ color: "#6E3678", fontWeight: "400" }}>정산 미완료</div>
      </div>
    );
  }

  if (paid.length === 0) {
    person = null;
  } else {
    person = (
      <div style={style}>
        <div>
          <div>{paid[0].nickname}</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex" }}>
      {isDone}
      {person}
    </div>
  );
};

const Room = (props) => {
  const users = props.data?.part || [];
  const preference = useRecoilValue(preferenceAtom);
  const loginInfoDetail = useRecoilValue(loginInfoDetailAtom);
  const isSettlementForMe = useMemo(
    () =>
      users.filter((user) => user._id === loginInfoDetail.oid)?.[0]
        ?.isSettlement,
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
    cursor: theme.cursor(false),
    zIndex: 1,
  };
  const styleTop = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 12px 0 16px",
  };
  const styleName = {
    ...theme.font12,
    margin: "13px 0 12px",
  };
  const stylePlaceGrid = {
    marginTop: "16px",
    display: "flex",
    justifyContent: "space-between",
    padding: "0 8px",
  };
  const stylePlace = {
    ...theme.font14_bold,
    width: "calc(50% - 20px)",
    textAlign: "center",
  };
  const styleArrow = {
    ...theme.font16_icon,
    color: theme.gray_text,
  };
  const styleDate = {
    ...theme.font12,
    color: theme.purple,
    padding: "12px 0",
    textAlign: "center",
  };

  return (
    <div style={styleBox} className="room" onClick={props.onClick}>
      <div className="pseudo" />
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
      <DottedLine direction="row" margin={12} />
      <div style={stylePlaceGrid}>
        <div style={stylePlace}>
          {getLocationName(props.data?.from, preference.lang)}
        </div>
        <ArrowRightAltRoundedIcon style={styleArrow} />
        <div style={stylePlace}>
          {getLocationName(props.data?.to, preference.lang)}
        </div>
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
