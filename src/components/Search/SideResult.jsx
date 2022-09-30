import React, { useState } from "react";
import WhiteContainer from "components/common/WhiteContainer";
import Title from "components/common/Title";
import Room from "components/common/room/Room";
import RoomSelectionModal from "./RoomSelectionModal";
import PropTypes from "prop-types";

const SideResult = (props) => {
  const [selectedRoomInfo, setSelectedRoomInfo] = useState(null);

  const styleEmpty = {
    color: "#888888",
    fontWeight: "700",
    textAlign: "center",
    margin: "50px 0px 30px",
  };

  if (!props.mobile) {
    return (
      <div style={{ marginTop: 26 }}>
        <RoomSelectionModal
          isOpen={!!selectedRoomInfo}
          isMobile={false}
          onClose={() => {
            setSelectedRoomInfo(null);
          }}
          roomInfo={selectedRoomInfo}
        />
        <WhiteContainer padding="20px 20px 22px">
          <Title icon="search_result" marginAuto={false}>
            검색 결과
          </Title>
          {props.result.length == 0 ? (
            <div style={styleEmpty}>검색 결과가 없습니다.</div>
          ) : (
            props.result.map((room) => (
              <Room
                key={room._id}
                marginTop="15px"
                mobile={props.mobile}
                data={room}
                onClick={() => {
                  setSelectedRoomInfo(room);
                }}
                theme="purple"
              />
            ))
          )}
        </WhiteContainer>
      </div>
    );
  } else {
    return (
      <>
        <RoomSelectionModal
          isOpen={!!selectedRoomInfo}
          isMobile={true}
          onClose={() => {
            setSelectedRoomInfo(null);
          }}
          roomInfo={selectedRoomInfo}
        />
        {props.result.length == 0 ? (
          <WhiteContainer style={styleEmpty}>
            <div style={styleEmpty}>검색 결과가 없습니다</div>
          </WhiteContainer>
        ) : (
          props.result.length != 0 &&
          props.result.map((room) => {
            return (
              <Room
                data={room}
                key={room._id}
                marginTop="0px"
                marginBottom="15px"
                mobile={props.mobile}
                onClick={() => {
                  setSelectedRoomInfo(room);
                }}
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
