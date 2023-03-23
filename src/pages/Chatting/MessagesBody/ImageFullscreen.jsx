import PropTypes from "prop-types";

import theme from "tools/theme";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const ImageFullscreen = (props) => {
  const bgdStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: theme.black_40,
    zIndex: theme.zIndex_fullimage,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const outStyle = {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  };

  const imgStyle = {
    maxWidth: "80%",
    maxHeight: "80%",
  };
  const closeStyle = {
    width: "40px",
    height: "40px",
    color: "white",
  };
  const iconStyle = {
    width: "80%",
    display: "flex",
    justifyContent: "flex-end",
  };

  return (
    <div style={bgdStyle} onClick={props.onClose}>
      <div style={outStyle}>
        <div style={iconStyle}>
          <CloseRoundedIcon style={closeStyle} onClick={props.onClose} />
        </div>
        <img src={props.path} style={imgStyle}></img>
      </div>
    </div>
  );
};

ImageFullscreen.propTypes = {
  path: PropTypes.string,
  onClose: PropTypes.func,
};

export default ImageFullscreen;
