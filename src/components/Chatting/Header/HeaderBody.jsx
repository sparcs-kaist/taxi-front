import React, { useState } from "react";
import PopupCancel from "./Popup/PopupCancel";
import { date2str } from "tools/trans";
import PropTypes from "prop-types";
import ProfileImg from "components/Mypage/ProfileImg";

import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PaymentRoundedIcon from "@mui/icons-material/PaymentRounded";

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
    background: "#6E3678",
    overflow: "hidden",
    position: "relative",
  };
  const styleIcon = {
    position: "absolute",
    top: "3px",
    right: "3px",
    width: "15px",
    height: "15px",
    fill: "white",
  };

  let icon = null;
  if (props.icon === "cancel") {
    icon = <LogoutRoundedIcon style={styleIcon} />;
  } else if (props.icon === "card") {
    icon = <PaymentRoundedIcon style={styleIcon} />;
  }

  return (
    <div style={style} onClick={props.onClick}>
      <div
        style={{
          height: "21px",
          lineHeight: "21px",
          fontSize: "10px",
          color: "#FFFFFF",
          paddingLeft: "6px",
        }}
        className="BTNC"
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
};

const User = (props) => {
  return (
    <div style={{ display: "flex", position: "relative", gap: "4px" }}>
      <div
        style={{
          position: "relative",
          width: "21px",
          height: "21px",
          borderRadius: "11px",
          background: props.info.isSettlement ? "#6E3678" : "#C4C4C4",
          overflow: "hidden",
        }}
      >
        <ProfileImg path={props.info.profileImageUrl} />
      </div>
      <div
        style={{
          height: "12px",
          lineHeight: "12px",
          fontSize: "10px",
          padding: "4px 6px 3px",
          color: props.info.isSettlement ? "#FFFFFF" : "#888888",
          background: "#EEEEEE",
          borderRadius: "6px",
          marginTop: "1px",
        }}
      >
        {props.info.nickname}
        {props.isDeparted && !props.info.isSettlement ? (
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
  const users = props.info?.part || [];
  const [popupCancel, setPopupCancel] = useState(false);

  let btnContBody = null;
  if (!props.info?.isDeparted) {
    btnContBody = (
      <BtnSide icon="cancel" onClick={() => setPopupCancel(true)}>
        탑승취소
      </BtnSide>
    );
  } else if (!props.info?.settlementTotal) {
    /**
     * @todo API에서 정산자 받아오기
     */
    btnContBody = (
      <BtnSide icon="card" onClick={() => setPopupCancel(true)}>
        결제하기
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
            flexWrap: "Wrap",
          }}
        >
          {users.map((item) => (
            <User
              key={item.id}
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
        popup={popupCancel}
        onClickClose={() => setPopupCancel(false)}
      />
    </div>
  );
};

HeaderBody.propTypes = {
  info: PropTypes.any,
};

export default HeaderBody;
