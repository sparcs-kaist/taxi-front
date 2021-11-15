import React, { Component } from "react";
import CreateIcon from "@material-ui/icons/Create";
import PropTypes from "prop-types";

import {
  Divider,
  Grid,
  Dialog,
  DialogContent,
  Button,
} from "@material-ui/core";
import Picker from "react-scrollable-picker";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

class RoomPlace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDep: false,
      openArr: false,
      valueGroupsDep: {
        place: "택시승강장",
      },
      optionGroupsDep: {
        place: [
          { value: "택시승강장", label: "택시승강장" },
          { value: "갤러리아 타임월드", label: "갤러리아 타임월드" },
          { value: "서대전역", label: "서대전역" },
          { value: "대전역", label: "대전역" },
          { value: "정부청사", label: "정부청사" },
        ],
      },
      valueGroupsArr: {
        place: "택시승강장",
      },
      optionGroupsArr: {
        place: [
          { value: "택시승강장", label: "택시승강장" },
          { value: "갤러리아 타임월드", label: "갤러리아 타임월드" },
          { value: "서대전역", label: "서대전역" },
          { value: "대전역", label: "대전역" },
          { value: "정부청사", label: "정부청사" },
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
              this.state.valueGroupsDep.place,
              this.state.valueGroupsArr.place
            );
          }
        );
      };
    };
    let depDirection = {
      display: "flex",
      flexDirection: "column",
    };
    let depContainer = {
      margin: "auto",
      fontSize: "12pt",
      color: "#C8C8C8",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    };
    let fiberManualRecordIcon = {
      fontSize: 9,
      color: "#C8C8C8",
      width: "100%",
    };

    return (
      <Grid container>
        <Grid item xs>
          <div className="departure" style={depDirection}>
            <div style={depContainer}>
              <FiberManualRecordIcon style={fiberManualRecordIcon} />
              <div>출발지</div>
            </div>
            <Button
              onClick={() =>
                this.setState({
                  openDep: true,
                })
              }
              style={{ margin: "auto" }}
            >
              <div style={{ fontWeight: "bold", fontSize: "16pt" }}>
                {this.state.valueGroupsDep.place}
              </div>
            </Button>
            <Dialog
              open={this.state.openDep}
              onClose={() =>
                this.setState({
                  openDep: false,
                })
              }
            >
              <DialogContent
                style={{
                  height: "300px",
                  margin: "auto",
                  width: "500px",
                  maxWidth: "100%",
                }}
              >
                <Picker
                  optionGroups={this.state.optionGroupsDep}
                  valueGroups={this.state.valueGroupsDep}
                  onChange={handleChange("valueGroupsDep")}
                />
              </DialogContent>
            </Dialog>
          </div>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item xs>
          <div
            className="arrival"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label
              style={{
                margin: "auto",
                fontSize: "12pt",
                color: "#C8C8C8",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <FiberManualRecordIcon
                style={{
                  fontSize: 9,
                  color: "#C8C8C8",
                  width: "100%",
                }}
              />
              도착지
            </label>
            <Button
              onClick={() => {
                this.setState({
                  openArr: true,
                });
              }}
              style={{ margin: "auto" }}
            >
              <div style={{ fontWeight: "bold", fontSize: "16pt" }}>
                {this.state.valueGroupsArr.place}
              </div>
            </Button>
            <Dialog
              open={this.state.openArr}
              onClose={() =>
                this.setState({
                  openArr: false,
                })
              }
            >
              <DialogContent
                style={{
                  height: "300px",
                  margin: "auto",
                  width: "500px",
                  maxWidth: "100%",
                }}
              >
                <Picker
                  optionGroups={this.state.optionGroupsArr}
                  valueGroups={this.state.valueGroupsArr}
                  onChange={handleChange("valueGroupsArr")}
                />
              </DialogContent>
            </Dialog>
          </div>
        </Grid>
      </Grid>
    );
  }
}

RoomPlace.propTypes = {
  handler: PropTypes.any,
};

export default RoomPlace;
