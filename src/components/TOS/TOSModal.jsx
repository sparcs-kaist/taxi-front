/** @jsx jsx */
/** @jsxRuntime classic */
/* eslint-disable react/no-unescaped-entities */
import { css, jsx } from "@emotion/react";
import { Dialog, DialogContent } from "@material-ui/core";
import PropTypes from "prop-types";
import logo from "../../images/sparcs_logo.svg";
import ModalSubmitButton from "../Setting/ModalSubmitButton";
import TosContent from "./TosContent";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./TOSModalStyles";
import React from "react";

const TOSModal = ({ open, onClose, isAgreed }) => {
  const onClickClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent css={styles.dialogContentStyle}>
        <CloseIcon css={styles.xButtonStyle} onClick={onClickClose} />
        <div css={styles.titleStyle}>
          <img src={logo} css={styles.logoStyle} />
          <div css={styles.titleTaxiStyle}>
            <div css={styles.dummyDivStyle} />
            <div>
              <b>Taxi</b>
            </div>
          </div>
          <div css={styles.flexColumn}>
            <div css={styles.dummyDivStyle} />
            <div>
              <b>이용 약관</b>
            </div>
            <div
              css={css`
                height: 1.5px;
              `}
            />
          </div>
        </div>
        <div css={styles.textFieldStyle}>
          <TosContent />
        </div>
        <div css={styles.buttonsContainerStyle}>
          <div css={styles.dummyDivStyle} />
          {!isAgreed ? (
            <React.Fragment>
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
            </React.Fragment>
          ) : (
            <p css={styles.alreadyAgreedStyle}>이미 동의하셨습니다.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

TOSModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  isAgreed: PropTypes.bool,
};

export default TOSModal;
