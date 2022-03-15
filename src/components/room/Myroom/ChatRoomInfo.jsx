import React from "react";
import PropTypes from "prop-types";

const ChatRoomInfo = (props) => {
  const dateFormat = (date) => {
    const dateKor = new Date(date);
    if (dateKor.getHours() > 12) {
      const hours = `오후 ${dateKor.getHours() - 12}시`;
      return `${dateKor.getFullYear()}. ${dateKor.getMonth() + 1}. 
      ${dateKor.getDate()}. ${hours} ${dateKor.getMinutes()}분`;
    } else {
      const hours = `오전 ${dateKor.getHours()}시`;
      return `${dateKor.getFullYear()}. ${dateKor.getMonth() + 1}. 
      ${dateKor.getDate()}. ${hours} ${dateKor.getMinutes()}분`;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        marginLeft: "2px",
      }}
    >
      <div style={{ minWidth: "123px", marginRight: "34px" }}>
        <div style={{ marginBottom: "12px" }}>
          <div className="roomInfo1">출발 시각 & 날짜</div>
          <div className="roomInfo2" style={{ color: "#323232" }}>
            {props.roomInfo ? dateFormat(props.roomInfo.time) : ""}
          </div>
        </div>
        <div style={{ marginBottom: "12px" }}>
          <div className="roomInfo1">개설자</div>
          <div className="roomInfo2" style={{ color: "#323232" }}>
            {props.roomInfo ? props.roomInfo.part[0].nickname : ""}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ marginRight: "12px" }}>
            <div className="roomInfo1">정산 여부</div>
            <div className="roomInfo2" style={{ color: "#6E3678" }}>
              Yes
            </div>
          </div>
          <div>
            <div className="roomInfo1">결제자</div>
            <div className="roomInfo2" style={{ color: "#6E3678" }}>
              결제 미완료
            </div>
          </div>
        </div>
      </div>
      <div>
        {props.roomInfo ? (
          props.roomInfo.part.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: "6px",
              }}
            >
              <div className="participantsImage"></div>
              <div className="participantsNickname">{item.nickname}</div>
            </div>
          ))
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

ChatRoomInfo.propTypes = {
  roomInfo: PropTypes.any,
};

export default ChatRoomInfo;
