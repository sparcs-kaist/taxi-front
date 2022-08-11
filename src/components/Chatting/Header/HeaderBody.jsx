import React from "react";
import { date2str } from "tools/trans";
import PropTypes from "prop-types";

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
    background: props.enable ? "#6E3678" : "#EEEEEE",
    overflow: "hidden",
    position: "relative",
  };
  return (
    <div style={style}>
      <div
        style={{
          height: "21px",
          lineHeight: "21px",
          fontSize: "10px",
          color: props.enable ? "#FFFFFF" : "#888888",
          paddingLeft: "6px",
        }}
        className="BTNC"
      >
        {props.children}
      </div>
    </div>
  );
};
BtnSide.propTypes = {
  enable: PropTypes.bool,
  children: PropTypes.string,
};

const User = (props) => {
  return (
    <div style={{ display: "flex", position: "relative", gap: "4px" }}>
      <div
        style={{
          width: "21px",
          height: "21px",
          borderRadius: "11px",
          background: "#C4C4C4",
          marginBottom: "1px",
        }}
      ></div>
      <div
        style={{
          height: "12px",
          lineHeight: "12px",
          fontSize: "10px",
          padding: "4px 6px 3px",
          color: "#888888",
          background: "#EEEEEE",
          borderRadius: "6px",
        }}
      >
        {props.nickname}
      </div>
    </div>
  );
};
User.propTypes = {
  nickname: PropTypes.string,
};

const HeaderBody = (props) => {
  const users = props.info?.part || [];
  console.log(props.info);
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
            <User key={item.id} nickname={item.nickname} />
          ))}
        </div>
        <div style={{ width: "67px" }}>
          <BtnSide enable={true}>정산하기</BtnSide>
        </div>
      </div>
    </div>
  );
};

HeaderBody.propTypes = {
  info: PropTypes.any,
};

export default HeaderBody;
