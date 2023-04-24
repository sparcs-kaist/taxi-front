import PropTypes from "prop-types";
import { useMemo, useState } from "react";

import ProfileImg from "components/ProfileImg";

import PopupCancel from "./Popup/PopupCancel";
import PopupPay from "./Popup/PopupPay";
import PopupSend from "./Popup/PopupSend";

import loginInfoAtom from "atoms/loginInfo";
import { useRecoilValue } from "recoil";

import { date2str } from "tools/moment";
import theme from "tools/theme";

import SendRoundedIcon from "@material-ui/icons/SendRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PaymentRoundedIcon from "@mui/icons-material/PaymentRounded";

const Info = (props) => (
  <div
    css={{
      display: "flex",
      flexDirection: "column",
      rowGap: "4px",
      width: "fit-content",
    }}
  >
    <div css={{ ...theme.font10_bold, color: theme.gray_text }}>
      {props.title}
    </div>
    <div css={{ ...theme.font12, textAlign: props.alignDirection }}>
      {props.children}
    </div>
  </div>
);
Info.propTypes = {
  title: PropTypes.string,
  alignDirection: PropTypes.oneOf(["left", "right"]),
  children: PropTypes.node,
};

const User = (props) => {
  const isSettlement =
    props.info?.isSettlement === "paid" || props.info?.isSettlement === "sent";
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
        maxWidth: "100%",
      }}
    >
      <div
        style={{
          minWidth: "21px",
          height: "21px",
          overflow: "hidden",
          borderRadius: "50%",
          background: theme.gray_line,
        }}
      >
        <ProfileImg path={props.info?.profileImageUrl} />
      </div>
      <div
        style={{
          ...theme.font10,
          borderRadius: "6px",
          padding: "4px 6px 3px",
          boxShadow: theme.shadow_gray_input_inset,
          color: isSettlement ? theme.white : theme.gray_text,
          background: isSettlement ? theme.purple : theme.gray_background,
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        }}
      >
        {props.info?.nickname}
        {props.isDeparted && !isSettlement ? (
          <span style={theme.font8}>(미정산)</span>
        ) : null}
      </div>
    </div>
  );
};
User.propTypes = {
  info: PropTypes.object,
  isDeparted: PropTypes.bool,
};

const ButtonBody = (props) => {
  const style = {
    display: "flex",
    alignItems: "center",
    columnGap: "4px",
    borderRadius: "6px",
    padding: "3px 5px 3px 6px",
    background: props.disabled ? theme.gray_background : theme.purple,
    ...theme.cursor(props.disabled),
  };
  const styleText = {
    ...theme.font10,
    color: props.disabled ? theme.gray_text : theme.white,
  };
  const styleIcon = {
    fontSize: "15px",
    fill: props.disabled ? theme.gray_text : theme.white,
  };

  const getIcon = (type) => {
    switch (type) {
      case "탑승취소":
        return <LogoutRoundedIcon style={styleIcon} />;
      case "결제하기" || "결제완료":
        return <PaymentRoundedIcon style={styleIcon} />;
      case "정산하기" || "정산완료":
        return <SendRoundedIcon style={styleIcon} />;
    }
  };

  return (
    <div style={style} onClick={props.onClick}>
      <div style={styleText}>{props.type}</div>
      {getIcon(props.type)}
    </div>
  );
};
ButtonBody.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};
ButtonBody.defaultProps = {
  onClick: () => {},
  disabled: false,
};

const Button = (props) => {
  const [popupCancel, setPopupCancel] = useState(false);
  const [popupPay, setPopupPay] = useState(false);
  const [popupSend, setPopupSend] = useState(false);
  return (
    <>
      <div style={{ minWidth: "fit-content" }}>
        {!props.info?.isDeparted ? (
          <ButtonBody type="탑승취소" onClick={() => setPopupCancel(true)} />
        ) : !props.info?.settlementTotal ? (
          <ButtonBody type="결제하기" onClick={() => setPopupPay(true)} />
        ) : props.isSettlementForMe === "paid" ? (
          <ButtonBody type="결제완료" disabled />
        ) : props.isSettlementForMe === "send-required" ? (
          <ButtonBody type="정산하기" onClick={() => setPopupSend(true)} />
        ) : props.isSettlementForMe === "sent" ? (
          <ButtonBody type="정산완료" disabled />
        ) : (
          <></>
        )}
      </div>
      <PopupCancel
        roomId={props.info?._id}
        popup={popupCancel}
        onClickClose={() => setPopupCancel(false)}
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
    </>
  );
};
Button.propTypes = {
  isSettlementForMe: PropTypes.string,
  recallEvent: PropTypes.func,
  info: PropTypes.object,
};

const HeaderBody = (props) => {
  const loginInfo = useRecoilValue(loginInfoAtom);
  const users = props.info?.part ?? [];
  const isSettlementForMe = useMemo(
    () =>
      users.filter((user) => user._id === loginInfo?.oid)?.[0]?.isSettlement,
    [loginInfo?.oid, JSON.stringify(users)]
  );

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Info title="출발 시각 & 날짜" alignDirection="left">
          {date2str(props.info?.time)}
        </Info>
        <Info title="참여 / 최대 인원" alignDirection="right">
          <b>{props.info?.part.length}명</b> / {props.info?.maxPartLength}명
        </Info>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginTop: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            overflow: "hidden",
            rowGap: "6px",
            columnGap: "8px",
            paddingRight: "12px",
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
        <Button
          isSettlementForMe={isSettlementForMe}
          recallEvent={props.recallEvent}
          info={props.info}
        />
      </div>
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
