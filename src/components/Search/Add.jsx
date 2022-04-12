import React, { Component } from "react";
import DatePicker from "../Frame/DatePicker/DatePicker";
import RoomName from "../Frame/RoomName/RoomName";
import RoomPlace from "../Frame/RoomPlace/RoomPlace";
import RoomTime from "../Frame/RoomTime/RoomTime";
import RLayout from "../Frame/ReactiveLayout/RLayout";
import WhiteContainer from "../Frame/WhiteContainer/WhiteContainer.jsx";
import Title from "../Frame/Title/Title";
import SubmitButton from "../Frame/SubmitButton/SubmitButton";
import SearchResult from "./SearchResult/SearchResult";

import { Paper, Button } from "@material-ui/core";

import svgSearch from "./svg_search.svg";
import svgAddSelected from "./add_selected.svg";

import PropTypes from "prop-types";

import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "../Tool/axios";

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameOpen: false,
      placeOpen: false,
      dateOpen: false,
      timeOpen: false,
      nameColor: "white",
      nameTextColor: "black",
      placeColor: "white",
      placeTextColor: "black",
      timeColor: "white",
      timeTextColor: "black",
      dateColor: "white",
      dateTextColor: "black",
      isResults: {
        is: false,
        data: [],
      },
      startDate: new Date(),
      openTime: false,
      roomName: undefined,
      valueDate: [undefined, undefined, undefined],
      valueGroupsDep: undefined,
      valueGroupsArr: undefined,
      valueGroupsTimeHour: undefined,
      valueGroupsTimeMin: undefined,
      errorMessage: "조건을 모두 입력해주세요",
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangePlace = this.handleChangePlace.bind(this);
    this.handleChangeTime = this.handleChangeTime.bind(this);
    this.onClickSearch = this.onClickSearch.bind(this);
    this.getAPIRes = this.getAPIRes.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  getAPIRes(dep, arr, startDate, name, part) {
    if (this.props.isSearch) {
      return axios.get("/rooms/search", {
        params: {
          from: dep,
          to: arr,
          time: startDate,
        },
      });
    } else {
      return axios.post("/rooms/create", {
        data: {
          name: name,
          from: dep,
          to: arr,
          time: startDate,
        },
      });
    }
  }

  validateForm({ roomName, depString, arrString, date }) {
    // 중복은 의도된 것, 추후 수정 필요
    if (this.props.isSearch) {
      let msg = "";
      if (roomName === undefined || roomName === "")
        msg = "방 이름을 입력해주세요.";
      else if (depString === undefined || depString === "")
        msg = "출발지를 입력해주세요.";
      else if (arrString === undefined || arrString === "")
        msg = "도착지를 입력해주세요.";
      else if (depString === arrString)
        msg = "출발지와 도착지는 같을 수 없습니다.";
      else if (date[0] === undefined || date[1] === undefined)
        msg = "날짜를 입력해주세요.";
      return {
        isValid: msg === "",
        msg,
      };
    } else {
      let msg = "추가하기";
      if (roomName === undefined || roomName === "")
        msg = "방 이름을 입력해주세요.";
      else if (depString === arrString)
        msg = "출발지와 도착지는 같을 수 없습니다.";
      else if (date[0] === undefined || date[1] === undefined)
        msg = "날짜를 입력해주세요.";

      return {
        isValid: msg === "추가하기",
        msg,
      };
    }
  }

  handleChangeName(name) {
    this.setState({
      roomName: name,
    });
  }

  handleChangePlace(dep, arr) {
    this.setState({
      valueGroupsDep: dep,
      valueGroupsArr: arr,
    });
    // console.log(this.state.valueGroupsDep);
  }

  handleChangeDate(year, month, date) {
    this.setState({
      valueDate: [year, month, date],
    });
  }

  handleChangeTime(hour, min) {
    this.setState({
      valueGroupsTimeHour: hour,
      valueGroupsTimeMin: min,
    });
  }

  handleButton() {
    this.setState({ openName: !this.state.openName });
  }

  componentDidUpdate() {
    const roomName = this.state.roomName;
    const depString = this.state.valueGroupsDep;
    const arrString = this.state.valueGroupsArr;
    const depTimeString = this.state.valueGroupsTimeHour;
    const arrTimeString = this.state.valueGroupsTimeMin;
    const date = this.state.valueDate;

    const formValidity = this.validateForm({
      roomName,
      depString,
      arrString,
      date,
    });

    if (this.state.errorMessage != formValidity.msg) {
      this.setState({ errorMessage: formValidity.msg });
    }
  }

  // 뭐에 대한 onclick?
  async onClickSearch() {
    const roomName = this.state.roomName;
    const depString = this.state.valueGroupsDep;
    const arrString = this.state.valueGroupsArr;
    const depTimeString = this.state.valueGroupsTimeHour;
    const arrTimeString = this.state.valueGroupsTimeMin;
    const date = this.state.valueDate;

    const formValidity = this.validateForm({
      roomName,
      depString,
      arrString,
      date,
    });

    if (formValidity.isValid) {
      // date의 type 검증 필요
      try {
        const res = await this.getAPIRes(
          depString,
          arrString,
          new Date(
            `${date[0]}-${date[1] < 10 ? "0" + date[1] : date[1]}-${
              date[2] < 10 ? "0" + date[2] : date[2]
            }`
          ),
          roomName,
          []
        );
        // console.log(res);
        if (res.status === 200) {
          this.setState({
            isResults: {
              is: true,
              data: res.data,
            },
          });
        }
      } catch (e) {
        console.log("error occured while fetching API data");
        console.log(e);
      }
    }
  }

  render() {
    const isResults = this.state.isResults;

    return (
      <>
        {!isResults.is && (
          <div className="searchroom">
            <div style={{ height: "20px" }} />
            {!this.props.isSearch && (
              <>
                <Title img={svgAddSelected}>
                  {!this.props.isSearch && "방 만들기"}
                </Title>
                <RLayout.R1>
                  <div
                    style={{
                      position: "relative",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      display: "flex",
                      justifyContent: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button
                        style={{
                          marginRight: "10px",
                          borderRadius: "15px",
                          backgroundColor: this.state.nameColor,
                          color: this.state.nameTextColor,
                          boxShadow: "0px 1px 7.5px 2px rgba(0,0,0,0.05)",
                        }}
                        onClick={() =>
                          this.setState({
                            nameOpen: !this.state.nameOpen,
                            nameColor: this.state.nameOpen
                              ? "white"
                              : "#6E3678",
                            nameTextColor: this.state.nameOpen
                              ? "black"
                              : "white",
                          })
                        }
                      >
                        방 이름
                      </Button>
                      <Button
                        style={{
                          marginRight: "10px",
                          borderRadius: "15px",
                          backgroundColor: this.state.placeColor,
                          color: this.state.placeTextColor,
                          boxShadow: "0px 1px 7.5px 2px rgba(0,0,0,0.05)",
                        }}
                        onClick={() =>
                          this.setState({
                            placeOpen: !this.state.placeOpen,
                            placeColor: this.state.placeOpen
                              ? "white"
                              : "#6E3678",
                            placeTextColor: this.state.placeOpen
                              ? "black"
                              : "white",
                          })
                        }
                      >
                        출발 & 도착지
                      </Button>
                      <Button
                        style={{
                          marginRight: "10px",
                          borderRadius: "15px",
                          backgroundColor: this.state.dateColor,
                          color: this.state.dateTextColor,
                          boxShadow: "0px 1px 7.5px 2px rgba(0,0,0,0.05)",
                        }}
                        onClick={() =>
                          this.setState({
                            dateOpen: !this.state.dateOpen,
                            dateColor: this.state.dateOpen
                              ? "white"
                              : "#6E3678",
                            dateTextColor: this.state.dateOpen
                              ? "black"
                              : "white",
                          })
                        }
                      >
                        날짜
                      </Button>
                      <Button
                        style={{
                          borderRadius: "15px",
                          backgroundColor: this.state.timeColor,
                          color: this.state.timeTextColor,
                          boxShadow: "0px 1px 7.5px 2px rgba(0,0,0,0.05)",
                        }}
                        onClick={() =>
                          this.setState({
                            timeOpen: !this.state.timeOpen,
                            timeColor: this.state.timeOpen
                              ? "white"
                              : "#6E3678",
                            timeTextColor: this.state.timeOpen
                              ? "black"
                              : "white",
                          })
                        }
                      >
                        시각
                      </Button>
                    </div>
                  </div>
                </RLayout.R1>
              </>
            )}
            <div style={{ height: "20px" }} />
            {/* 방 제목으로 검색 */}
            {this.state.nameOpen && (
              <WhiteContainer title="방 검색">
                <RoomName handler={this.handleChangeName} />
              </WhiteContainer>
            )}
            {/* 출발지, 도착지로검색 */}
            {this.state.placeOpen && (
              <WhiteContainer title="장소">
                <Paper style={{ height: "80px" }} elevation={0}>
                  <RoomPlace handler={this.handleChangePlace} />
                </Paper>
              </WhiteContainer>
            )}

            {/* 날짜로 검색 */}
            {this.state.dateOpen && (
              <WhiteContainer title="날짜 검색">
                <DatePicker handler={this.handleChangeDate} />
              </WhiteContainer>
            )}

            {/* 시간으로 검색 */}
            {this.state.timeOpen && (
              <WhiteContainer title="시간">
                <RoomTime handler={this.handleChangeTime}></RoomTime>
              </WhiteContainer>
            )}

            <SubmitButton onClick={this.onClickSearch}>
              {!this.props.isSearch && this.state.errorMessage}
            </SubmitButton>
          </div>
        )}
        {/* 지금은 그냥 방 추가일때도 이걸로 표시, 추후 내 방 리스트 프론트 만들어지면 그걸로 돌리면됨 */}
        {isResults.is && <SearchResult searchResults={isResults.data} />}
      </>
    );
  }
}

Add.propTypes = {
  // FIXME specify type
  isSearch: PropTypes.bool,
};
export default Add;
