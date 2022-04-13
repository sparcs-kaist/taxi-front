import React, { useState } from "react";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import PropTypes from "prop-types";
import WhiteContainer from "../../Frame/WhiteContainer/WhiteContainer";
import Popup from "./Popup";

const PopupInput = (props) => {
  const onClick = () => {
    props.onClose();
  };
  return (
    <Popup isOpen={props.isOpen} onClose={props.onClose} onClick={onClick}>
      <div>123</div>
    </Popup>
  );
};
PopupInput.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  handler: PropTypes.func,
};

const Time = (props) => {
  const [isPopup, setPopup] = useState(false);

  const styleIcon = {
    width: "18px",
    height: "28px",
    marginLeft: "15px",
  };
  const styleName = {
    height: "28px",
    lineHeight: "28px",
    marginLeft: "6px",
    width: "35px",
    fontSize: "14px",
  };
  const styleInput = {
    height: "28px",
    lineHeight: "28px",
    width: "41px",
    marginLeft: "6px",
    background: "#FAF8FB",
    boxShadow: "inset 1px 1px 2.5px -1px rgba(110, 54, 120, 0.1)",
    borderRadius: "8px",
    fontSize: "14px",
    textAlign: "center",
  };
  const styleText = {
    height: "28px",
    lineHeight: "28px",
    marginLeft: "6px",
    fontSize: "14px",
  };
  return (
    <WhiteContainer marginAuto={false} padding="9px">
      <div style={{ display: "flex" }}>
        <AccessTimeIcon style={styleIcon} />
        <div style={styleName}>시간 :</div>
        <div style={styleInput} className="BTNC" onClick={() => setPopup(true)}>
          {props.value[0]}
        </div>
        <div style={styleText}>시</div>
        <div style={styleInput} className="BTNC" onClick={() => setPopup(true)}>
          {props.value[1]}
        </div>
        <div style={styleText}>분 이후</div>
      </div>
      <PopupInput isOpen={isPopup} onClose={() => setPopup(false)} />
    </WhiteContainer>
  );
};
Time.propTypes = {
  value: PropTypes.array,
  handler: PropTypes.func,
};

export default Time;
