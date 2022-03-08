import React, { Component } from "react";
import CreateIcon from "@material-ui/icons/Create";
import PropTypes from "prop-types";

import { Dialog, DialogContent, Button } from "@material-ui/core";
import Picker from "react-scrollable-picker";
import AccessTimeIcon from "@material-ui/icons/AccessTime";

class RoomTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueGroupsTimeHour: {
        hour: "1",
      },
      optionGroupsTimeHour: {
        hour: [
          { value: "1", label: "1" },
          { value: "2", label: "2" },
          { value: "3", label: "3" },
          { value: "4", label: "4" },
          { value: "5", label: "5" },
          { value: "6", label: "6" },
          { value: "7", label: "7" },
          { value: "8", label: "8" },
          { value: "9", label: "9" },
          { value: "10", label: "10" },
          { value: "11", label: "11" },
          { value: "12", label: "12" },
          { value: "13", label: "13" },
          { value: "14", label: "14" },
          { value: "15", label: "15" },
          { value: "16", label: "16" },
          { value: "17", label: "17" },
          { value: "18", label: "18" },
          { value: "19", label: "19" },
          { value: "20", label: "20" },
          { value: "21", label: "21" },
          { value: "22", label: "22" },
          { value: "23", label: "23" },
          { value: "24", label: "24" },
        ],
      },
      valueGroupsTimeMin: {
        min: "15",
      },
      optionGroupsTimeMin: {
        min: [
          { value: "15", label: "15" },
          { value: "30", label: "30" },
          { value: "45", label: "45" },
          { value: "00", label: "00" },
        ],
      },
    };
  }
  // usage: handleChange("valueGroupsDep")

  render() {
    const handleChange = (state) => {
      return (name, value) => {
        this.setState(
          (prev) => ({
            [state]: {
              ...prev.state,
              [name]: value,
            },
          }),
          () => {
            this.props.handler(
              this.state.valueGroupsTimeHour,
              this.state.valueGroupsTimeMin
            );
          }
        );
      };
    };

    let roomPlaceFormat = {
      display: "flex",
      alignContent: "row",
      alginItems: "center",
    };
    let accessTimeIconImage = {
      width: "20px",
      height: "20px",
      marginLeft: "15px",
      marginTop: "2px",
      fill: "black",
    };
    let depString = {
      marginLeft: "5px",
      fontSize: "16px",
      color: "black",
    };
    let dialogueStyle = {
      height: "300px",
      margin: "auto",
      width: "500px",
      display: "flex",
      alignContent: "row",
    };
    let accessTimeIcon = {
      marginRight: "5px",
      width: "14px",
      fill: "black",
    };
    let pickerStyle = {
      width: "100px",
      fontSize: "12px",
      backgroundColor: "#F7F7F7",
      borderRadius: "10px",
      padding: "10px",
      margin: "20px",
    };
    let pickerButton = { margin: "auto", color: "lightgray" };
    let buttonText = { fontWeight: "bold", fontSize: "16pt" };

    return (
      <>
        <div style={roomPlaceFormat}>
          <AccessTimeIcon style={accessTimeIconImage} />
          <div style={depString}>출발 시각</div>
        </div>
        <div
          style={{
            display: "flex",
            alignContent: "row",
            justifyContent: "center",
          }}
        >
          <Button
            onClick={() =>
              this.setState({
                openTime: true,
              })
            }
            style={pickerButton}
          >
            <div style={buttonText}>
              {this.state.valueGroupsTimeHour.hour}시{" "}
              {this.state.valueGroupsTimeMin.min}분
            </div>
          </Button>
          <Dialog
            open={this.state.openTime}
            onClose={() =>
              this.setState({
                openTime: false,
              })
            }
          >
            <DialogContent style={dialogueStyle}>
              <AccessTimeIcon style={accessTimeIcon} />
              <div> 시간: </div>
              <div style={pickerStyle}>
                <Picker
                  optionGroups={this.state.optionGroupsTimeHour}
                  valueGroups={this.state.valueGroupsTimeHour}
                  onChange={handleChange("valueGroupsTimeHour")}
                />
              </div>
              <div> 시 </div>
              <div style={pickerStyle}>
                <Picker
                  optionGroups={this.state.optionGroupsTimeMin}
                  valueGroups={this.state.valueGroupsTimeMin}
                  onChange={handleChange("valueGroupsTimeMin")}
                />
              </div>
              <div> 분 이후 </div>
            </DialogContent>
          </Dialog>
        </div>
      </>
    );
  }
}

RoomTime.propTypes = {
  handler: PropTypes.any,
};

export default RoomTime;
