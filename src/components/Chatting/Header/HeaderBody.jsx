import React, { useState, useMemo } from "react";
import PopupCancel from "./Popup/PopupCancel";
import PopupPay from "./Popup/PopupPay";
import PopupSend from "./Popup/PopupSend";
import { date2str } from "tools/moment";
import PropTypes from "prop-types";
import ProfileImg from "components/Mypage/ProfileImg";

import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PaymentRoundedIcon from "@mui/icons-material/PaymentRounded";
import PeopleRoundedIcon from "@mui/icons-material/EmojiPeopleRounded";
import useTaxiAPI from "hooks/useTaxiAPI";

const InfoSide = (props) => {
  return (
    <div>
      <div
        style={{
          height: "9px",
          lineHeight: "9px",
          fontSize: "8px",
          color: "#888888",
        }}
      >
        {props.title}
      </div>
      <div style={{ height: "5px" }} />
      <div
        style={{
          height: "12px",
          lineHeight: "12px",
          fontSize: "10px",
          color: "#323232",
        }}
      >
        {props.children}
      </div>
    </div>
  );
};
InfoSide.propTypes = {
  title: PropTypes.string,
  children: PropTypes.string,
};

const BtnSide = (props) => {
  const style = {
    width: "67px",
    height: "21px",
    borderRadius: "6px",
    background: props.disable ? "#EEEEEE" : "#6E3678",
    overflow: "hidden",
    position: "relative",
    cursor: props.disable ? "not-allowed" : "pointer",
  };
  const styleIcon = {
    position: "absolute",
    top: "3px",
    right: "3px",
    width: "15px",
    height: "15px",
    fill: props.disable ? "#888888" : "#FFFFFF",
  };

  let icon = null;
  if (props.icon === "cancel") {
    icon = <LogoutRoundedIcon style={styleIcon} />;
  } else if (props.icon === "card") {
    icon = <PaymentRoundedIcon style={styleIcon} />;
  } else if (props.icon === "people") {
    icon = <PeopleRoundedIcon style={styleIcon} />;
  }

  return (
    <div style={style} onClick={props.onClick}>
      <div
        style={{
          height: "21px",
          lineHeight: "21px",
          fontSize: "10px",
          color: props.disable ? "#888888" : "#FFFFFF",
          paddingLeft: "6px",
        }}
      >
        {props.children}
      </div>
      {icon}
    </div>
  );
};
BtnSide.propTypes = {
  icon: PropTypes.string,
  children: PropTypes.string,
  onClick: PropTypes.func,
  disable: PropTypes.bool,
};
BtnSide.defaultProps = {
  onClick: () => {},
  disable: false,
};

const User = (props) => {
  const isSettlement =
    props.info?.isSettlement === "paid" || props.info?.isSettlement === "sent";
  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        gap: "4px",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "21px",
          height: "21px",
          borderRadius: "11px",
          background: "#EEEEEE",
          overflow: "hidden",
        }}
      >
        <ProfileImg path={props.info?.profileImageUrl} />
      </div>
      <div
        style={{
          height: "12px",
          lineHeight: "12px",
          fontSize: "10px",
          padding: "4px 6px 3px",
          color: isSettlement ? "#FFFFFF" : "#888888",
          background: isSettlement ? "#6E3678" : "#EEEEEE",
          borderRadius: "6px",
          marginTop: "1px",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        }}
      >
        {props.info?.nickname}
        {props.isDeparted && !isSettlement ? (
          <span style={{ fontSize: "8px" }}>&nbsp;&#40;미정산&#41;</span>
        ) : null}
      </div>
    </div>
  );
};
User.propTypes = {
  info: PropTypes.object,
  isDeparted: PropTypes.bool,
};

const HeaderBody = (props) => {
  const [, userInfoDetail] = useTaxiAPI.get("/json/logininfo/detail");
  const users = props.info?.part || [];
  const [popupCancel, setPopupCancel] = useState(false);
  const [popupPay, setPopupPay] = useState(false);
  const [popupSend, setPopupSend] = useState(false);
  const isSettlementForMe = useMemo(
    () =>
      users.filter((user) => user._id === userInfoDetail.oid)?.[0]
        ?.isSettlement,
    [userInfoDetail?.oid, JSON.stringify(users)]
  );

  let btnContBody = null;
  if (!props.info?.isDeparted) {
    btnContBody = (
      <BtnSide icon="cancel" onClick={() => setPopupCancel(true)}>
        탑승취소
      </BtnSide>
    );
  } else if (!props.info?.settlementTotal) {
    btnContBody = (
      <BtnSide icon="people" onClick={() => setPopupPay(true)}>
        결제하기
      </BtnSide>
    );
  } else if (isSettlementForMe === "send-required") {
    btnContBody = (
      <BtnSide icon="card" onClick={() => setPopupSend(true)}>
        정산하기
      </BtnSide>
    );
  } else if (isSettlementForMe === "paid") {
    btnContBody = (
      <BtnSide icon="people" disable={true}>
        결제완료
      </BtnSide>
    );
  } else if (isSettlementForMe === "sent") {
    btnContBody = (
      <BtnSide icon="card" disable={true}>
        정산완료
      </BtnSide>
    );
  }

  return (
    <div>
      <div>
        <InfoSide title="출발 시각 &#38; 날짜">
          {date2str(props.info?.time)}
        </InfoSide>
      </div>
      <div style={{ height: "16px" }} />
      <div
        style={{
          display: "flex",
          position: "relative",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <div
          style={{
            width: "calc(100% - 87px)",
            display: "flex",
            gap: "9px",
            flexWrap: "wrap",
            overflow: "hidden",
          }}
        >
          {users.map((item) => (
            <User
              key={item._id}
              info={item}
              isDeparted={props.info?.isDeparted}
            />
          ))}
        </div>
        <div
          style={{
            width: "67px",
            display: "flex",
            gap: "6px",
            flexDirection: "column",
          }}
        >
          {btnContBody}
        </div>
      </div>
      <PopupCancel
        roomId={props.info?._id}
        popup={popupCancel}
        onClickClose={() => setPopupCancel(false)}
        recallEvent={props.recallEvent}
      />
      <PopupPay
        roomId={props.info?._id}
        popup={popupPay}
        onClickClose={() => setPopupPay(false)}
        recallEvent={props.recallEvent}
      />
      <PopupSend
        roomId={props.info?._id}
        popup={popupSend}
        onClickClose={() => setPopupSend(false)}
        recallEvent={props.recallEvent}
      />
    </div>
  );
};

HeaderBody.propTypes = {
  info: PropTypes.any,
  recallEvent: PropTypes.func,
};
HeaderBody.defaultProps = {
  recallEvent: () => {},
};

export default HeaderBody;
