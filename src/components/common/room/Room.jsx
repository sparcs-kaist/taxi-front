import React, { useState, useMemo } from "react";
import { useRecoilValue } from "recoil";
import preferenceAtom from "recoil/preference";
import { useSpring, animated } from "react-spring";
import PropTypes from "prop-types";
import { getLocationName } from "tools/trans";
import { date2str } from "tools/moment";
import loginInfoDetailAtom from "recoil/loginInfoDetail";
import DottedLine from "../DottedLine";

import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";

const Tag = (props) => {
  const style = {
    boxShadow:
      props.theme === "purple"
        ? "0px 1.5px 1px -0.5px rgba(110, 54, 120, 0.05), 0px 2.5px 1px -0.5px rgba(110, 54, 120, 0.03), 0px 2px 3px -1px rgba(110, 54, 120, 0.11)"
        : "inset 1px 1px 2.5px -1px rgba(110, 54, 120, 0.1)",
    borderRadius: "4px",
    background: props.theme === "purple" ? "#FFFFFF" : "#FAF8FB",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    padding: "3.5px 5px 2.5px",
    gap: "3px",
    height: "18px",
    lineHeight: "18px",
    fontSize: "10px",
    margin: "3px",
  };
  const paid = props.users.filter((user) => user.isSettlement === "paid");
  let isDone = null;
  let person = null;

  if (!props.isDeparted) {
    isDone = (
      <div style={style}>
        <div>남은 인원: </div>
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
  const [isHover, setHover] = useState(false);
  const users = props.data?.part || [];
  const preference = useRecoilValue(preferenceAtom);
  const loginInfoDetail = useRecoilValue(loginInfoDetailAtom);
  const isSettlementForMe = useMemo(
    () =>
      users.filter((user) => user._id === loginInfoDetail.oid)?.[0]
        ?.isSettlement,
    [loginInfoDetail?.oid, JSON.stringify(users)]
  );

  const style = {
    position: "relative",
    background: props.theme === "purple" ? "#FAF8FB" : "white",
    overflow: "hidden",
    borderRadius: "12px",
    marginTop: props.marginTop,
    marginBottom: props.marginBottom,
    boxShadow:
      isHover || props.selected
        ? "0px 2px 4px rgba(110, 54, 120, 0.2), 0px 1px 18px rgba(110, 54, 120, 0.12), 0px 6px 10px rgba(110, 54, 120, 0.14)"
        : "0px 1.5px 1px -0.5px rgba(110, 54, 120, 0.05), 0px 2.5px 1px -0.5px rgba(110, 54, 120, 0.03), 0px 2px 3px -1px rgba(110, 54, 120, 0.11)",
  };
  const styleName = {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    height: "39px",
    lineHeight: "39px",
    fontSize: "12px",
    paddingLeft: "18px",
    paddingRight: "5px",
  };
  const styleLay1 = {
    height: "16px",
    marginTop: "15px",
    display: "flex",
    justifyContent: "center",
  };
  const styleLay1Place = {
    height: "16px",
    lineHeight: "16px",
    width: "calc(50% - 13px)",
    textAlign: "center",
    fontSize: "14px",
    fontWeight: "bold",
  };
  const styleArrow = {
    height: "15px",
    width: "16px",
  };
  const styleDate = {
    marginTop: "13px",
    marginBottom: "13px",
    height: "14px",
    lineHeight: "14px",
    textAlign: "center",
    fontSize: "12px",
    color: "#6E3678",
  };
  const styleSelected = useSpring({
    position: "absolute",
    top: "0px",
    left: "0px",
    width: "8px",
    height: "100%",
    background: "#6E3678",
    opacity: props.selected ? 1 : 0,
    config: { duration: 100 },
  });

  return (
    <div
      style={style}
      className="BTNC container"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={props.onClick}
    >
      <div style={styleName}>
        <div style={{ marginRight: "auto" }}>{props.data?.name}</div>
        <Tag
          users={users}
          isDeparted={props.data?.isDeparted}
          isSettlementForMe={isSettlementForMe}
          maxPartLength={props.data?.maxPartLength}
          theme={props.theme}
        />
      </div>
      <DottedLine direction="row" margin={12} />
      <div style={styleLay1}>
        <div style={styleLay1Place}>
          {getLocationName(props.data?.from, preference.lang)}
        </div>
        <ArrowRightAltRoundedIcon style={styleArrow} />
        <div style={styleLay1Place}>
          {getLocationName(props.data?.to, preference.lang)}
        </div>
      </div>
      <div style={styleDate}>{date2str(props.data?.time)}</div>
      <animated.div style={styleSelected} />
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
