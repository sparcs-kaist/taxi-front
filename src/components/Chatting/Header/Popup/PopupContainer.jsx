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
      <div style={{ margin: "26px 0 24px" }}>{props.children}</div>
      <ButtonCancelOk
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
