import React, { useState, useRef } from "react";
import WhiteContainer from "../../Frame/WhiteContainer/WhiteContainer";
import Title from "../../Frame/Title/Title";
import Room from "../../Room/Room/RoomElement1";
import PropTypes from "prop-types";

import svgResult from "./svg_result.svg";

const Result = (props) => {
  const styleLine = {
    height: "1px",
    backgroundImage:
      "linear-gradient(to right, #C8C8C8 50%, rgba(255,255,255,0) 0%)",
    backgroundPosition: "bottom",
    backgroundSize: "15px 1px",
    backgroundRpeat: "repeat-x",
  };
  return (
    <WhiteContainer marginAuto={false} padding="20px">
      <Title img={svgResult} marginAuto={false} paddingTop="0px">
        검색 결과
      </Title>
      <div style={{ height: "7px" }} />
      <div style={styleLine} />
      {props.result.map((room, index) => {
        return (
          <Room
            name={room.name}
            origin={room.from}
            destination={room.to}
            date={room.time}
            key={index}
            marginTop="15px"
          />
        );
      })}
    </WhiteContainer>
  );
};

Result.propTypes = {
  result: PropTypes.array,
};

export default Result;
