import React, { useEffect, useState } from "react";
import "./RoomEntry.css";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import PropTypes from "prop-types";

const RoomEntry = (props) => {
  const dateFormat = (date) => {
    const dateKor = new Date(date);
    return `${dateKor.getFullYear()}년 ${dateKor.getMonth() + 1}월 
      ${dateKor.getDate()}일 ${dateKor.getHours()}시 ${dateKor.getMinutes()}분`;
  };

  const wordOverflow = (target, length) => {
    if (target.length > length) return target.substring(0, length) + "...";
    else return target;
  };

  return (
    <div
      className={`taxiRoom ${props.isSelected ? "true" : "false"}`}
      onClick={() => props.clickEvent(props.isCurrent, props.elementIndex)}
    >
      <div className="flexSpaceBetween">
        <div className="roomTitle">{props.title}</div>
        <div
          className="participantAndHead"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <div className="whiteBox">
            남은 인원 :{" "}
            <span style={{ color: "#6E3678" }}>{props.participants} 명</span>
          </div>
          <div className="whiteBox" style={{ marginLeft: "5px" }}>
            {wordOverflow(props.head, 5)}
          </div>
        </div>
      </div>

      <div className="dashedLine"></div>

      <div className="flexSpaceBetween">
        <div className="startAndEnd">
          <div className="spaceBold">{props.from}</div>
        </div>
        <ArrowRightAltIcon
          style={{
            width: "40px",
            height: "17px",
            color: "#9B9B9B",
          }}
        />
        <div className="startAndEnd">
          <div className="spaceBold">{props.to}</div>
        </div>
      </div>

      <div className="date">{dateFormat(props.date)}</div>
    </div>
  );
};

RoomEntry.propTypes = {
  title: PropTypes.string,
  participants: PropTypes.any,
  head: PropTypes.string,
  from: PropTypes.string,
  to: PropTypes.string,
  date: PropTypes.string,
  clickEvent: PropTypes.func,
  elementIndex: PropTypes.any,
  isSelected: PropTypes.bool,
  isCurrent: PropTypes.bool,
};
RoomEntry.defaultProps = {
  head: "",
};

export default RoomEntry;
