import React from "react";
import Modal from "components/common/modal/Modal";
import ButtonCancelOk from "components/common/modal/ButtonCancelOk";
import PropTypes from "prop-types";

const PopupContainer = (props) => {
  return (
    <Modal
      display={props.popup}
      onClickClose={props.onClickClose}
      padding="10px"
    >
      <div style={{ height: "26px" }} />
      {props.children}
      <div style={{ height: "24px" }} />
      <ButtonCancelOk
        nameCancel="돌아가기"
        nameOk={props.nameOk}
        onClickCancel={props.onClickClose}
        onClickOk={props.onClickOk}
      />
    </Modal>
  );
};

PopupContainer.propTypes = {
  popup: PropTypes.bool,
  onClickClose: PropTypes.func,
  onClickOk: PropTypes.func,
  children: PropTypes.node,
  nameOk: PropTypes.string,
};

export default PopupContainer;
