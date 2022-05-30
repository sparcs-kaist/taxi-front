import React from "react";
import WhiteContainer from "../../Frame/WhiteContainer/WhiteContainer";
import Title from "../../Frame/Title/Title";
import Room from "../../Room/Room/RoomElement";
import PropTypes from "prop-types";

import ListAltRoundedIcon from "@material-ui/icons/ListAltRounded";

const Result = (props) => {
  const styleLine = {
    height: "0.5px",
    backgroundImage:
      "linear-gradient(to right, #C8C8C8 50%, rgba(255,255,255,0) 0%)",
    backgroundSize: "10px 1px",
    marginBottom: "20px",
  };
  const styleEmpty = {
    color: "#888888",
    fontWeight: "700",
    textAlign: "center",
    margin: "50px 0px 30px",
  };
  if (!props.mobile) {
    return (
      <>
        <div style={{ height: "26px" }}></div>
        <WhiteContainer marginAuto={false} padding="20px 20px 22px">
          <Title
            icon={(style) => <ListAltRoundedIcon style={style} />}
            marginAuto={false}
          >
            검색 결과
          </Title>
          <div style={{ height: "19px" }} />
          <div style={styleLine} />
          {props.result.length == 0 ? (
            <div style={styleEmpty}>검색 결과가 없습니다</div>
          ) : (
            props.result.length != 0 &&
            props.result.map((room, index) => {
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
      </>
    );
  } else {
    return (
      <>
        {props.result.length == 0 ? (
          <WhiteContainer marginAuto={false} style={styleEmpty}>
            <div style={styleEmpty}>검색 결과가 없습니다</div>
          </WhiteContainer>
        ) : (
          props.result.length != 0 &&
          props.result.map((room, index) => {
            return (
              <Room
                name={room.name}
                origin={room.from}
                destination={room.to}
                date={room.time}
                key={index}
                marginTop="0px"
                marginBottom="15px"
                mobile={props.mobile}
              />
            );
          })
        )}
      </>
    );
  }
};

Result.propTypes = {
  result: PropTypes.array,
  mobile: PropTypes.bool,
};

export default Result;
