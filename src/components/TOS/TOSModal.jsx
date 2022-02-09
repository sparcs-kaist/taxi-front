/** @jsx jsx */
/** @jsxRuntime classic */
/* eslint-disable react/no-unescaped-entities */
import { css, jsx } from "@emotion/react";
import { Dialog, DialogContent } from "@material-ui/core";
import PropTypes from "prop-types";
import logo from "../../images/sparcs_logo.svg";
import ModalSubmitButton from "../Setting/ModalSubmitButton";
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

  const getUserInfo = async () => {
    const userInfo = await axios.get("/json/logininfo");
    try {
      const agree = await axios.get(
        `/users/${userInfo.data.id}/agreeOnTermsOfService`
      );
      if (agree.status.code === 200) {
        setIsAgreed(false);
      }
    } catch (e) {
      // FIXME 곧 수정할 것
      if (e.response.status === 400) {
        setIsAgreed(true);
      } else {
        setIsAgreed(false);
      }
    }
  };

  useEffect(() => {
    getUserInfo();
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
