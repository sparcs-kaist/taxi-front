import React from "react";
import WhiteContainer from "../../Frame/WhiteContainer/WhiteContainer";
import Title from "../../Frame/Title/Title";
import Room from "../../Room/Room/RoomElement";
import PropTypes from "prop-types";

const RoomList = (props) => {
  const styleLine = {
    height: "0.5px",
    backgroundImage:
      "linear-gradient(to right, #C8C8C8 50%, rgba(255,255,255,0) 0%)",
    backgroundSize: "10px 1px",
    marginTop: "19px",
    marginBottom: "19.5px",
  };
  const styleEmpty = {
    color: "#888888",
    fontSize: "14px",
    lineHeight: "109px",
    textAlign: "center",
    height: "109px",
  };
  return (
    <WhiteContainer marginAuto={false} padding="20px 20px 22px">
      <Title icon={props.icon} marginAuto={false}>
        {props.title}
      </Title>
      <div style={styleLine} />
      {props.list.length == 0 ? (
        <div style={styleEmpty}>
          {props.title == "검색 결과"
            ? "검색 결과가 없습니다."
            : props.title == "참여 중인 방"
            ? "참여 중인 방이 없습니다."
            : "과거 참여했던 방이 없습니다."}
        </div>
      ) : (
        props.list.length != 0 &&
        props.list.map((room, index) => {
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
        })
      )}
    </WhiteContainer>
  );
};

RoomList.propTypes = {
  icon: PropTypes.func,
  title: PropTypes.string,
  list: PropTypes.array,
};

export default RoomList;
