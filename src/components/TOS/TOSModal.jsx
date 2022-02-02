/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Dialog, DialogContent } from "@material-ui/core";
import PropTypes from "prop-types";
import logo from "../../images/sparcs_logo.svg";
import ModalSubmitButton from "../Setting/ModalSubmitButton";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./TOSModalStyles";

const TOSModal = ({ open, onClose, isAgreed }) => {
  const onClickClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent style={styles.dialogContentStyle}>
        <CloseIcon style={styles.xButtonStyle} onClick={onClickClose} />
        <div style={styles.titleStyle}>
          <img src={logo} style={styles.logoStyle} />
          <div style={styles.titleTaxiStyle}>
            <div style={styles.dummyDivStyle} />
            <div style={{ fontWeight: "bold" }}>Taxi</div>
          </div>
          <div style={styles.flexColumn}>
            <div style={styles.dummyDivStyle} />
            <div style={{ fontWeight: "bold" }}>이용 약관</div>
            <div style={{ height: "1.5px" }} />
          </div>
        </div>
        <div style={styles.textFieldStyle}>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old. Richard McClintock, a Latin professor at
          Hampden-Sydney College in Virginia, looked up one of the more obscure
          Latin words, consectetur, from a Lorem Ipsum passage, and going
          through the cites of the word in classical literature, discovered the
          undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
          1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and
          Evil) by Cicero, written in 45 BC. This book is a treatise on the
          theory of ethics, very popular during the Renaissance. The first line
          of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in
          section 1.10.32. Contrary to popular belief, Lorem Ipsum is not simply
          random text. It has roots in a piece of classical Latin literature
          from 45 BC, making it over 2000 years old. Richard McClintock, a Latin
          professor at Hampden-Sydney College in Virginia, looked up one of the
          more obscure Latin words, consectetur, from a Lorem Ipsum passage, and
          going through the cites of the word in classical literature,
          discovered the undoubtable source. Lorem Ipsum comes from sections
          1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes
          of Good and Evil) by Cicero, written in 45 BC. This book is a treatise
          on the theory of ethics, very popular during the Renaissance. The
          first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from
          a line in section 1.10.32.
        </div>
        <div style={styles.buttonsContainerStyle}>
          <div style={styles.dummyDivStyle} />
          {!isAgreed ? (
            <>
              <ModalSubmitButton
                style={styles.cancelButtonStyle}
                backgroundHover="#e5e5e5"
              >
                취소
              </ModalSubmitButton>
              <ModalSubmitButton
                style={styles.confirmButtonStyle}
                backgroundHover="#4e2b60"
              >
                동의
              </ModalSubmitButton>
            </>
          ) : (
            <p style={styles.alreadyAgreedStyle}>이미 동의하셨습니다.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

TOSModal.propTypes = {
  open: PropTypes.boolean,
  onClose: PropTypes.func,
  isAgreed: PropTypes.boolean,
};

export default TOSModal;
