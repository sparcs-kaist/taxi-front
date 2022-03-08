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

  return (
    <div className="taxiRoom">
      <div className="flexSpaceBetween">
        <div className="roomTitle">{props.title}</div>
        <div
          className="participantAndHead"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <div className="grayBox">
            남은 인원 :{" "}
            <span style={{ color: "#6E3678" }}>{props.participants} 명</span>
          </div>
          <div className="grayBox" style={{ marginLeft: "5px" }}>
            {props.head}
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
            width: "10px",
            height: "5px",
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
  participants: PropTypes.string,
  head: PropTypes.string,
  from: PropTypes.string,
  to: PropTypes.string,
  date: PropTypes.string,
};

export default RoomEntry;
