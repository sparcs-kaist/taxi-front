import React, { useState, useEffect } from "react";
import { getS3Url } from "tools/trans";
import PropTypes from "prop-types";

import defaultImg from "static/assets/profileImgOnError.png";

const ProfileImg = (props) => {
  const getSrc = () =>
    getS3Url(`/profile-img/${props.path}?token=${props.token}`);
  const [src, setSrc] = useState(getSrc());

  useEffect(() => {
    setSrc(getSrc());
  }, [props.path, props.token]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        backgroundColor: "#EEEEEE",
      }}
    >
      <img
        src={src}
        style={{
          position: "absolute",
          top: "0px",
          left: "0px",
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        alt={`/profile-img/${props.path}`}
        onError={() => setSrc(defaultImg)}
      />
    </div>
  );
};

ProfileImg.propTypes = {
  path: PropTypes.string,
  token: PropTypes.string,
};
ProfileImg.defaultProps = {
  token: "",
};

export default ProfileImg;
