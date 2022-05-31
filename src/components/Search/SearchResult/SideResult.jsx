import React from "react";
import WhiteContainer from "../../Frame/WhiteContainer/WhiteContainer";
import Room from "../../Room/Room/RoomElement";
import RoomList from "../../Room/Room/RoomList";
import PropTypes from "prop-types";

import ListAltRoundedIcon from "@material-ui/icons/ListAltRounded";

const Result = (props) => {
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
        <RoomList
          icon={(style) => <ListAltRoundedIcon style={style} />}
          title="검색 결과"
          list={props.result}
        />
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
