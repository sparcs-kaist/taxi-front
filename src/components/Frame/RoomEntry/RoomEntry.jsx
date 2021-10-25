import React, { useEffect, useState } from "react";
import "./RoomEntry.css";

const RoomEntry = (props) => {
  return (
    <div className="taxiRoom">
      <div className="flexLine2">
        <div className="roomTitle">{props.title}</div>
        <div
          className="participantAndHead"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <div className="grayBox">남은 인원 : {props.participants} 명</div>
          <div className="grayBox" style={{ marginLeft: "5px" }}>
            {props.head}
          </div>
        </div>
      </div>

      <div className="dashedLine"></div>

      <div className="flexLine2">
        <div className="startAndEnd">
          <div className="spaceBold">{props.start}</div>
        </div>
        <div>-></div>
        <div className="startAndEnd">
          <div className="spaceBold">{props.end}</div>
        </div>
      </div>

      <div className="date">{props.date}</div>
    </div>
  );
};

export default RoomEntry;
