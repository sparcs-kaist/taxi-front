import React, { Component } from "react";
import CreateIcon from "@material-ui/icons/Create";
import PropTypes from "prop-types";

class RoomName extends Component {
  constructor(props) {
    super(props);
    this.state = { roomName: "" };
  }
  render() {
    const onFormSubmit = (e) => {
      e.preventDefault();
      this.setState({
        roomName: e.target.value,
      });
      this.props.handler(this.state.roomName);
    };

    let roomNameMain = {
      display: "flex",
      alignContent: "row",
      alginItems: "center",
    };
    let createIcon = {
      width: "20px",
      height: "20px",
      marginLeft: "15px",
      marginTop: "2px",
      fill: "black",
    };
    let inputTitle = {
      marginLeft: "5px",
      fontSize: "16px",
      color: "black",
    };
    let inputBox = {
      borderRadius: "8px",
      borderStyle: "none",
      backgroundColor: "#FAFAFA",
      width: "calc(100% - 110px)",
      height: "28px",
      paddingLeft: "20px",
      paddingRight: "20px",
      marginLeft: "10px",
    };
    return (
      <div style={roomNameMain}>
        <CreateIcon style={createIcon} />
        <div style={inputTitle}>방 이름 :</div>
        <input
          onChange={onFormSubmit}
          type="text"
          id="roomName"
          style={inputBox}
        />
      </div>
    );
  }
}

RoomName.propTypes = {
  handler: PropTypes.any,
};

export default RoomName;
