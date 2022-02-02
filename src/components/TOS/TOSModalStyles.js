const buttonStyle = {
  minHeight: "0",
  fontWeight: "bold",
  fontSize: "15px",
  lineHeight: "36px",
  textAlign: "center",
  letterSpacing: "0.05em",
  color: "#FFFFFF",
  width: "77px",
  height: "36px",
  marginLeft: "10px",
};

const flexColumn = {
  display: "flex",
  flexDirection: "column",
};

const styles = {
  logoStyle: {
    width: "30px",
    height: "30px",
  },

  xButtonStyle: {
    width: "24px",
    height: "24px",
    position: "absolute",
    top: "10px",
    right: "10px",
  },

  titleStyle: {
    display: "flex",
    flexDirection: "row",
    marginBottom: "20px",
    fontFamily: "Roboto",
    fontSize: "16px",
    lineHeight: "21px",
    marginLeft: "12px",
    letterSpacing: "0.05em",
    color: "#323232",
  },

  titleTaxiStyle: {
    display: "flex",
    flexDirection: "column",
    fontFamily: "Raleway",
    fontSize: "20px",
    fontWeight: 800,
    color: "#6E3678",
    marginRight: "8px",
    lineHeight: "23px",
    letterSpacing: "-0.01em",
  },

  dummyDivStyle: {
    flex: 1,
  },

  buttonsContainerStyle: {
    display: "flex",
    flexDirection: "row",
    marginBottom: "8px",
  },

  flexColumn: {
    ...flexColumn,
  },

  dialogContentStyle: {
    ...flexColumn,
    minWidth: "270px",
    maxWidth: "365px",
    maxHeight: "515px",
    padding: "18px",
    borderRadius: "15px",
    boxShadow: "0px 1px 7.5px 2px rgba(0, 0, 0, 0.05)",
  },

  textFieldStyle: {
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
  },

  alreadyAgreedStyle: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "15px",
    lineHeight: "18px",
    textAlign: "center",
    letterSpacing: "0.05em",
    color: "#323232",
  },
  confirmButtonStyle: {
    ...buttonStyle,
  },

  cancelButtonStyle: {
    ...buttonStyle,
    color: "#888888",
    backgroundColor: "#EEEEEE",
  },
};

export default styles;
