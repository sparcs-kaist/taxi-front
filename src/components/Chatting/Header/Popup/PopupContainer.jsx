import React from "react";
import Modal from "components/common/modal/Modal";
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
    </Modal>
  );
};

PopupContainer.propTypes = {
  popup: PropTypes.bool,
  onClickClose: PropTypes.func,
  children: PropTypes.any,
};

export default PopupContainer;
