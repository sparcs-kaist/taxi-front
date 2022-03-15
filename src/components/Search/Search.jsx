import React, { Component, useEffect } from "react";
import DatePicker from "../Frame/DatePicker/DatePicker";
import RoomName from "../Frame/RoomName/RoomName";
import RoomPlace from "../Frame/RoomPlace/RoomPlace";
import RoomTime from "../Frame/RoomTime/RoomTime";
import WhiteContainer from "../Frame/WhiteContainer/WhiteContainer.jsx";
import Title from "../Frame/Title/Title";
import SubmitButton from "../Frame/SubmitButton/SubmitButton";
import SearchResult from "./SearchResult/SearchResult";
import BackgroundPurpleContainer from "../Frame/BackgroundPurpleContainer/BackgroundPurpleContainer";
import RoomEntry from "../Frame/RoomEntry/RoomEntry";

import { Paper, Button } from "@material-ui/core";

import svgSearch from "./svg_search.svg";
import svgAddSelected from "./add_selected.svg";

import PropTypes from "prop-types";

import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toast, ToastBody } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import axios from "../Tool/axios";
import { flexbox } from "@mui/system";

class Search extends React.Component {
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
      errorMessage: "검색 조건이 비어있습니다",
      isResults: {
        is: false,
        data: [],
      },
      startDate: new Date(),
      openTime: false,
      bodyWidth: null,

      roomName: null,
      valueDate: [null, null, null],
      valueGroupsDep: null,
      valueGroupsArr: null,
      valueGroupsTimeHour: null,
      valueGroupsTimeMin: null,
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangePlace = this.handleChangePlace.bind(this);
    this.handleChangeTime = this.handleChangeTime.bind(this);
    this.onClickSearch = this.onClickSearch.bind(this);
    this.getAPIRes = this.getAPIRes.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.resizeEvent = this.resizeEvent.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeEvent);
    this.setState({ bodyWidth: document.body.clientWidth });
  }

  resizeEvent() {
    const _bodyWidth = document.body.clientWidth;
    if (this.state.bodyWidth != _bodyWidth) this.setState({ bodyWidth: _bodyWidth});
  };

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
          part: part,
        },
      });
    }
  }

  validateForm({ roomName, depString, arrString, date }) {
    // 중복은 의도된 것, 추후 수정 필요
    if (this.props.isSearch) {
      let msg = "검색하기";
      if (
        (roomName === undefined || roomName === "") &&
        (depString === undefined || depString === "") &&
        (arrString === undefined || arrString === "") &&
        (date[0] === undefined ||
          date[1] === undefined ||
          date[2] === undefined)
      )
        // this.setState({
        msg = "검색 조건을 한 가지 이상 입력해주세요.";
      // });
      else if (depString === arrString)
        // this.setState({
        msg = "출발지와 도착지는 같을 수 없습니다.";
      // });
      return {
        isValid: msg === "검색하기",
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
    // console.log(formValidity.msg);
    if (this.state.errorMessage != formValidity.msg) {
      this.setState({ errorMessage: formValidity.msg });
    }
  }

  // 뭐에 대한 onclick?
  async onClickSearch() {
    const roomName = this.state.roomName;
    const depString = this.state.valueGroupsDep;
    const arrString = this.state.valueGroupsArr;
    // const depTimeString = this.state.valueGroupsTimeHour;
    // const arrTimeString = this.state.valueGroupsTimeMin;
    const date = this.state.valueDate;

    const formValidity = this.validateForm({
      roomName,
      depString,
      arrString,
      date,
    });

    if (formValidity.isValid) {
      // date의 type 검증 필요
      // console.log(new Date(`${ date[0] }-${ date[1] }-${ date[2] }`));
      try {
        const res = await this.getAPIRes(
          depString,
          arrString,
          new Date(`${date[0]}-${date[1]}-${date[2]}`),
          roomName,
          []
        );
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
    const styleMain = {
      width: this.state.bodyWidth >= 805 ? "755px" : "calc(100% - 50px)",
      margin: "auto",
    };
    const styleLeft = {
      width: this.state.bodyWidth >= 605 ? "calc(50% - 7.5px)" : "100%",
    };
    const styleRight = {
      width: this.state.bodyWidth >= 605 ? "calc(50% - 7.5px)" : "100%",
      // display: this.state.bodyWidth >= 720 ? "block" : "none",
    };
    return (
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", ...styleMain}}>
        {(!isResults.is || this.state.bodyWidth >= 605 )&& (
          <div className="searchroom" style={{ ...styleLeft }}>
            <div style={{ height: "30px" }} />
            {this.props.isSearch && (
              <>
                <Title img={svgSearch} unmargin>
                  {this.props.isSearch && "방 검색하기"}
                </Title>
                <div
                  className="ND"
                  style={{
                    position: "relative",
                    paddingTop: "15px",
                    // paddingBottom: "10px",
                    minWidth: "55px",
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                >
                  {/* <div style ={{color: }}> 어느 조건으로 검색하시겠습니까?</div> */}
                  <div
                    style={{ display: "flex", justifyContent: "flex-start", flexWrap: "wrap" }}
                  >
                    <Button
                      style={{
                        marginRight: "10px",
                        borderRadius: "15px",
                        fontSize: "13px",
                        height: "30px",
                        marginBottom: "10px",
                        padding: "8px 15px 7px 15px",
                        backgroundColor: this.state.nameColor,
                        color: this.state.nameTextColor,
                        boxShadow: "0px 1px 7.5px 2px rgba(0,0,0,0.05)",
                      }}
                      onClick={() =>
                        this.setState({
                          nameOpen: !this.state.nameOpen,
                          nameColor: this.state.nameOpen ? "white" : "#6E3678",
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
                        fontSize: "13px",
                        height: "30px",
                        borderRadius: "15px",
                        minWidth: "55px",
                        padding: "8px 15px 7px 15px",
                        whiteSpace: "nowrap",
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
                      장소
                    </Button>
                    <Button
                      style={{
                        marginRight: "10px",
                        borderRadius: "15px",
                        fontSize: "13px",
                        height: "30px",
                        minWidth: "55px",
                        padding: "8px 15px 7px 15px",
                        backgroundColor: this.state.dateColor,
                        color: this.state.dateTextColor,
                        boxShadow: "0px 1px 7.5px 2px rgba(0,0,0,0.05)",
                      }}
                      onClick={() =>
                        this.setState({
                          dateOpen: !this.state.dateOpen,
                          dateColor: this.state.dateOpen ? "white" : "#6E3678",
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
                        fontSize: "13px",
                        height: "30px",
                        minWidth: "55px",
                        padding: "8px 15px 7px 15px",
                        backgroundColor: this.state.timeColor,
                        color: this.state.timeTextColor,
                        boxShadow: "0px 1px 7.5px 2px rgba(0,0,0,0.05)",
                      }}
                      onClick={() =>
                        this.setState({
                          timeOpen: !this.state.timeOpen,
                          timeColor: this.state.timeOpen ? "white" : "#6E3678",
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
              </>
            )}
            <div style={{ height: "5px" }} />
            {/* 방 제목으로 검색 */}
            {this.state.nameOpen && (
              <WhiteContainer title="방 검색" layAuto={false}>
                <RoomName handler={this.handleChangeName} />
              </WhiteContainer>
            )}
            {/* 출발지, 도착지로검색 */}
            {this.state.placeOpen && (
              <WhiteContainer title="장소" layAuto={false}>
                <Paper style={{ height: "80px" }} elevation={0}>
                  <RoomPlace handler={this.handleChangePlace} />
                </Paper>
              </WhiteContainer>
            )}

            {/* 날짜로 검색 */}
            {this.state.dateOpen && (
              <WhiteContainer title="날짜 검색" layAuto={false}>
                <DatePicker handler={this.handleChangeDate} />
              </WhiteContainer>
            )}

            {/* 시간으로 검색 */}
            {this.state.timeOpen && (
              <WhiteContainer title="시간" layAuto={false}>
                <RoomTime handler={this.handleChangeTime}></RoomTime>
              </WhiteContainer>
            )}
            <SubmitButton onClick={this.onClickSearch} layAuto={false}>
              {this.props.isSearch && "검색하기"}
              {!this.props.isSearch && "방 만들기"}
            </SubmitButton>
          </div>
        )}
        {/* 지금은 그냥 방 추가일때도 이걸로 표시, 추후 내 방 리스트 프론트 만들어지면 그걸로 돌리면됨 */}
        {/* {isResults.is && <SearchResult searchResults={isResults.data} />} */}
        {isResults.is && (
          <div style={{ display: "flex", flexDirection: "column", marginLeft: this.state.bodyWidth >= 605 ? "15px" : 0, ...styleRight }}>
            <div style={{ height: this.state.bodyWidth < 605 ? "30px" : "147px" }} />
            {this.state.bodyWidth < 605 && <Title img={svgSearch} unmargin>
              {this.props.isSearch && "방 검색결과"}
            </Title>}
            <WhiteContainer padding="20px" layAuto={false}>
              <div className="subCategoryTitle">검색 결과</div>
              <div className="dashedLine"></div>
              {isResults.data.map((item, index) => (
                <BackgroundPurpleContainer key={index} title="_" padding="11px">
                  <RoomEntry
                    title={item.name}
                    participants={item.part.length}
                    head={item.part[0].nickname}
                    from={item.from}
                    to={item.to}
                    date={item.time}
                  />
                </BackgroundPurpleContainer>
              ))}
            </WhiteContainer>
          </div>
        )}
      </div>
    );
  }
}

Search.propTypes = {
  isSearch: PropTypes.any,
};
export default Search;
