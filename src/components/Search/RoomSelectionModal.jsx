import React from "react";
import Title from "components/common/Title";
import Modal from "components/common/modal/Modal";
import PropTypes from "prop-types";

const RoomSelectionModal = (props) => {
  if (!props?.roomInfo) return <></>;

  const { roomInfo } = props;

  return (
    <Modal
      display={props.isOpen}
      btnCloseDisplay={true}
      onClickClose={props.onClose}
      padding={props.isMobile ? "12px" : "20px 15px"}
    >
      <Title>{roomInfo.name}</Title>
    </Modal>
  );
};
RoomSelectionModal.propTypes = {
  isOpen: PropTypes.bool,
  isMobile: PropTypes.bool,
  onClose: PropTypes.func,
  roomInfo: PropTypes.object.isRequired,
};

export default RoomSelectionModal;
