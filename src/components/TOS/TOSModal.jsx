/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Dialog, DialogContent } from "@material-ui/core";
import PropTypes from "prop-types";
import logo from "../../images/sparcs_logo.svg";
import ModalSubmitButton from "../Setting/ModalSubmitButton";
import xSymbol from "../../images/x-symbol.svg";

const logoStyle = {
  width: "30px",
  height: "30px",
};

const xButtonStyle = {
  width: "24px",
  height: "24px",
  position: "absolute",
  top: "10px",
  right: "10px",
};

const titleStyle = {
  marginBottom: "23px",
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "18px",
  lineHeight: "21px",
  marginLeft: "12px",
  marginTop: "6px",
  letterSpacing: "0.05em",
  color: "#323232",
};

const titleTaxiStyle = {
  fontFamily: "Raleway",
  fontSize: "20px",
  fontWeight: 800,
  color: "#6E3678",
  marginRight: "8px",
  lineHeight: "23px",
  letterSpacing: "-0.01em",
};

const dummyDivStyle = {
  flex: 1,
};

const buttonsContainerStyle = {
  display: "flex",
  flexDirection: "row",
  marginTop: "10px",
  marginBottom: "8px",
};

const dialogContentStyle = {
  display: "flex",
  flexDirection: "column",
  minWidth: "270px",
  maxWidth: "365px",
  maxHeight: "515px",
  padding: "18px",
  borderRadius: "15px",
  boxShadow: "0px 1px 7.5px 2px rgba(0, 0, 0, 0.05)",
};

const textFieldStyle = {
  flex: 1,
  overflowY: "scroll",
  backgroundColor: "#EEE",
  borderRadius: "10px",
  boxShadow: "inset 2px 2px 5px -2px rgba(0, 0, 0, 0.075)",
  padding: "28px",
  marginBottom: "12px",
  fontSize: "13px",
  lineHeight: "15px",
  letterSpacing: "0.05em",
};

const alreadyAgreedStyle = {
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "15px",
  lineHeight: "18px",
  textAlign: "center",
  letterSpacing: "0.05em",
  color: "#323232",
};

const buttonStyle = {
  fontWeight: "bold",
  fontSize: "15px",
  lineHeight: "50px",
  textAlign: "center",
  letterSpacing: "0.05em",
  color: "#FFFFFF",
  width: "77px",
  marginLeft: "10px",
};

const TOSModal = ({ open, onClose, isAgreed }) => {
  const onClickClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent style={dialogContentStyle}>
        <img src={xSymbol} style={xButtonStyle} onClick={onClickClose} />
        <div style={titleStyle}>
          <img src={logo} style={logoStyle} />
          <span style={titleTaxiStyle}>Taxi</span>
          이용 약관
        </div>
        <div style={textFieldStyle}>
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
          section 1.10.32.
        </div>
        <div style={buttonsContainerStyle}>
          <div style={dummyDivStyle} />
          {!isAgreed ? (
            <>
              <ModalSubmitButton style={buttonStyle} backgroundHover="#4e2b60">
                취소
              </ModalSubmitButton>
              <ModalSubmitButton style={buttonStyle} backgroundHover="#4e2b60">
                동의
              </ModalSubmitButton>
            </>
          ) : (
            <p style={alreadyAgreedStyle}>이미 동의하셨습니다.</p>
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
