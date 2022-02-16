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
import axios from "../Tool/axios";
import { useEffect, useState } from "react";

const TOSModal = ({ open, onClose }) => {
  const [isAgreed, setIsAgreed] = useState(false);
  const onClickClose = () => {
    onClose();
  };

  const getUserAgreeInfo = async () => {
    try {
      const agree = await axios.get(`/users/getAgreeOnTermsOfService`);
      if (agree.data.agreeOnTermsOfService) {
        setIsAgreed(true);
      } else {
        setIsAgreed(false);
      }
    } catch (e) {
      // FIXME 곧 수정할 것
      if (e.response.status === 400) {
        setIsAgreed(true);
      }
    }
  };

  const agreeOnTos = async () => {
    try {
      const agree = await axios.post(`/users/agreeOnTermsOfService`);
      if (agree.status === 200) {
        setIsAgreed(true);
        onClose();
      }
    } catch (e) {
      if (e.response.status === 400) {
        setIsAgreed(true);
        onClose();
      }
    }
  };

  const onClickAgree = () => {
    agreeOnTos();
  };

  const onClickCancel = () => {
    onClose();
  };

  useEffect(() => {
    getUserAgreeInfo();
  }, []);

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
                onClick={onClickCancel}
              >
                취소
              </ModalSubmitButton>
              <ModalSubmitButton
                style={styles.confirmButtonStyle}
                backgroundHover="#4e2b60"
                onClick={onClickAgree}
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
