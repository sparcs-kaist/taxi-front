import React from "react";
import { Link } from "react-router-dom";
import Title from "components/common/Title";
import Room from "components/common/room/Room";
import RLayout from "components/common/RLayout";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const R1Myroom = (props) => {
  const styleEmpty = {
    color: "#888888",
    fontSize: "14px",
    lineHeight: "109px",
    textAlign: "center",
    height: "109px",
  };

  const { t } = useTranslation();

  return (
    <RLayout.R1>
      <Title icon="current" header={true} marginAuto={false}>
        {t("참여 중인 방")}
      </Title>
      {props.ongoing.length === 0 ? (
        <div style={styleEmpty}>{t("참여 중인 방이 없습니다.")}</div>
      ) : (
        props.ongoing.map((item) => (
          <Link
            key={item._id}
            to={`/myroom/${item._id}`}
            style={{ textDecoration: "none" }}
          >
            <Room
              data={item}
              selected={props.roomId === item._id}
              theme="white"
              marginBottom="15px"
            />
          </Link>
        ))
      )}
      <Title icon="past" header={true} marginAuto={false}>
        {t("과거 참여 방")}
      </Title>
      {props.done.length === 0 ? (
        <div style={styleEmpty}>{t("과거 참여했던 방이 없습니다.")}</div>
      ) : (
        props.done.map((item) => (
          <Link
            key={item._id}
            to={`/myroom/${item._id}`}
            style={{ textDecoration: "none" }}
          >
            <Room
              data={item}
              selected={props.roomId === item._id}
              theme="white"
              marginTop="15px"
            />
          </Link>
        ))
      )}
    </RLayout.R1>
  );
};

R1Myroom.propTypes = {
  roomId: PropTypes.string,
  ongoing: PropTypes.array,
  done: PropTypes.array,
};
R1Myroom.defaultProps = {
  ongoing: [],
  done: [],
};

export default R1Myroom;
