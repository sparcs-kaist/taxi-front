import React from "react";
import WhiteContainer from "components/common/WhiteContainer";
import Title from "components/common/Title";
import Room from "components/common/room/RoomElement";
import PropTypes from "prop-types";

const SideResult = (props) => {
  const styleEmpty = {
    color: "#888888",
    fontWeight: "700",
    textAlign: "center",
    margin: "50px 0px 30px",
  };

  // TODO: 언어 선택에 따라 enName 반환
  const getLocationName = (location) => location.koName;

  if (!props.mobile) {
    return (
      <div style={{ marginTop: 26 }}>
        <WhiteContainer marginAuto={false} padding="20px 20px 22px">
          <Title icon="search_result" marginAuto={false}>
            검색 결과
          </Title>
          {props.result.length == 0 ? (
            <div style={styleEmpty}>검색 결과가 없습니다.</div>
          ) : (
            props.result.map((room, index) => (
              <Room
                name={room.name}
                origin={getLocationName(room.from)}
                destination={getLocationName(room.to)}
                date={room.time}
                key={index}
                marginTop="15px"
                mobile={props.mobile}
              />
            ))
          )}
        </WhiteContainer>
      </div>
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

SideResult.propTypes = {
  result: PropTypes.array,
  mobile: PropTypes.bool,
};

export default SideResult;
