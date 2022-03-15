import React from "react";
import "../Style/UserAvatar.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const UserAvatar = ({ name, thumbnailUrl, chatMessage }) => {
  UserAvatar.propTypes = {
    name: PropTypes.string,
    thumbnailUrl: PropTypes.string,
    chatMessage: PropTypes.any,
  };
  return (
    <>
      <img
        src={"/testCat.jpeg"}
        alt={name}
        title={name}
        className={"avatar"}
      ></img>
    </>
  );
};

export default UserAvatar;
