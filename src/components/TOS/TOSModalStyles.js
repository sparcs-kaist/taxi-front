import { css } from "@emotion/react";

const buttonStyleBase = css`
  min-height: 0;
  font-weight: bold;
  font-size: 15px;
  line-height: 36px;
  text-align: center;
  letter-spacing: 0.05em;
  color: #ffffff;
  width: 77px;
  height: 36px;
  margin-left: 10px;
`;

const flexColumnBase = css`
  display: flex;
  flex-direction: column;
`;

const styles = {
  logoStyle: css`
    width: 30px;
    height: 30px;
  `,

  xButtonStyle: css`
    width: 24px;
    height: 24px;
    position: absolute;
    top: 10px;
    right: 10px;
  `,

  titleStyle: css`
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
    font-family: Roboto;
    font-size: 16px;
    line-height: 21px;
    margin-left: 12px;
    letter-spacing: 0.05em;
    color: #323232;
  `,

  titleTaxiStyle: css`
    display: flex;
    flex-direction: column;
    font-family: Raleway;
    font-size: 20px;
    font-weight: 800;
    color: #6e3678;
    margin-right: 8px;
    line-height: 23px;
    letter-spacing: -0.01em;
  `,

  dummyDivStyle: css`
    flex: 1;
  `,

  buttonsContainerStyle: css`
    display: flex;
    flex-direction: row;
    margin-bottom: 8px;
  `,

  flexColumn: css`
    ${flexColumnBase}
  `,

  dialogContentStyle: css`
    ${flexColumnBase}
    min-width: 270px;
    max-width: 365px;
    max-height: 515px;
    padding: 18px;
    border-radius: 15px;
    box-shadow: 0px 1px 7.5px 2px rgba(0, 0, 0, 0.05);
  `,

  textFieldStyle: css`
    flex: 1;
    overflow-y: scroll;
    background-color: #eee;
    border-radius: 10px;
    box-shadow: inset 2px 2px 5px -2px rgba(0, 0, 0, 0.075);
    padding: 28px;
    margin-bottom: 12px;
    font-size: 13px;
    line-height: 15px;
    letter-spacing: 0.05em;
  `,

  alreadyAgreedStyle: css`
    font-family: Roboto;
    font-size: 15px;
    line-height: 18px;
    text-align: center;
    letter-spacing: 0.05em;
    color: #323232;
  `,

  confirmButtonStyle: css`
    ${buttonStyleBase}
  `,

  cancelButtonStyle: css`
    ${buttonStyleBase}
    color: #888888;
    background-color: #eeeeee;
  `,
};

export default styles;
