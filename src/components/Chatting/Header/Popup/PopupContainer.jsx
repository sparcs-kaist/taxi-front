import React from "react";
import Modal from "components/common/modal/Modal";
import ButtonCancelOk from "components/common/modal/ButtonCancelOk";
import PropTypes from "prop-types";

const PopupContainer = (props) => {
  return (
    <Modal
      display={props.popup}
      onClickClose={props.onClickClose}
      maxWidth="325px"
      padding="10px"
      btnCloseDisplay={true}
    >
      <div style={{ height: "26px" }} />
      {props.children}
      <div style={{ height: "24px" }} />
      <ButtonCancelOk
        nameCancel="돌아가기"
        nameOk={props.nameOk}
        onClickCancel={props.onClickClose}
      />
    </Modal>
  );
};

PopupContainer.propTypes = {
  popup: PropTypes.bool,
  onClickClose: PropTypes.func,
  children: PropTypes.node,
  nameOk: PropTypes.string,
};

export default PopupContainer;
