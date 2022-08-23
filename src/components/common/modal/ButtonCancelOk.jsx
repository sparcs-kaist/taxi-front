import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

const ButtonCancelOk = (props) => {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "space-between",
        gap: "10px",
      }}
    >
      <Button
        width="calc(50% - 5px)"
        boxShadow="inset 2px 2px 5px -2px rgba(0, 0, 0, 0.075)"
        color="#888888"
        background="#EEEEEE"
        onClick={props.onClickCancel}
      >
        {props.nameCancel}
      </Button>
      <Button
        width="calc(50% - 5px)"
        boxShadow="inset 2px 2px 5px -2px rgba(0, 0, 0, 0.25)"
        color="#FFFFFF"
        background="#6E3678"
        onClick={props.onClickOk}
      >
        {props.nameOk}
      </Button>
    </div>
  );
};

ButtonCancelOk.propTypes = {
  nameCancel: PropTypes.string,
  nameOk: PropTypes.string,
  onClickCancel: PropTypes.func,
  onClickOk: PropTypes.func,
  widthCancel: PropTypes.string,
  widthOk: PropTypes.string,
  gap: PropTypes.string,
};
ButtonCancelOk.defaultProps = {
  nameCancel: "취소",
  nameOk: "확인",
  onClickCancel: () => {},
  onClickOk: () => {},
  widthCancel: "calc(50% - 5px)",
  widthOk: "calc(50% - 5px)",
  gap: "10px",
};

export default ButtonCancelOk;
