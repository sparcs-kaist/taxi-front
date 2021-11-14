import React, { Component } from "react";
//import Picker from 'react-scrollable-picker';
import DatePicker from "../Frame/DatePicker/DatePicker";
import RoomName from "../Frame/RoomName/RoomName";
import RoomPlace from "../Frame/RoomPlace/RoomPlace";
import RoomTime from "../Frame/RoomTime/RoomTime";
import WhiteContainer from "../Frame/WhiteContainer/WhiteContainer.jsx";
import Title from "../Frame/Title/Title";
import SubmitButton from "../Frame/SubmitButton/SubmitButton";
import SearchResult from "./SearchResult/SearchResult";

import { Paper } from "@material-ui/core";

import svgSearch from "./svg_search.svg";

import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import PropTypes from "prop-types";

import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "../Tool/axios";

class SearchOrAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isResults: {
        is: false,
        data: [],
      },
      startDate: new Date(),
      openDep: false,
      openArr: false,
      openTime: false,
      roomName: undefined,
      valueDate: [undefined, undefined],
      valueGroupsDep: undefined,
      valueGroupsArr: undefined,
      valueGroupsTimeHour: undefined,
      valueGroupsTimeMin: undefined,
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
          part: part,
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
  }

  handleChangeDate(month, date) {
    this.setState({
      valueDate: [month, date],
    });
  }

  handleChangeTime(hour, min) {
    this.setState({
      valueGroupsTimeHour: hour,
      valueGroupsTimeMin: min,
    });
    console.log(this.state.valueGroupsTimeHour, this.state.valueGroupsTimeMin);
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
          date,
          roomName,
          []
        );
        console.log(res);
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
    } else {
      alert(formValidity.msg);
    }
  }

  render() {
    const isResults = this.state.isResults;
    return (
      <>
        {!isResults.is && (
          <div className="searchroom">
            <div style={{ height: "20px" }} />
            <Title img={svgSearch}>
              {this.props.isSearch && "방 검색하기"}
              {!this.props.isSearch && "방 만들기"}
            </Title>
            <div style={{ height: "20px" }} />
            {/* 방 제목으로 검색 */}
            <WhiteContainer title="방 검색">
              <RoomName handler={this.handleChangeName} />
            </WhiteContainer>
            {/* 출발지, 도착지로검색 */}
            <WhiteContainer title="장소">
              <Paper style={{ height: "80px" }} elevation={0}>
                <RoomPlace handler={this.handleChangePlace} />
              </Paper>
            </WhiteContainer>

            {/* 날짜로 검색 */}
            <WhiteContainer title="날짜 검색">
              <DatePicker handler={this.handleChangeDate} />
            </WhiteContainer>

            {/* 시간으로 검색 */}
            <WhiteContainer title="시간">
              <RoomTime handler={this.handleChangeTime}></RoomTime>
            </WhiteContainer>

            <SubmitButton onClick={this.onClickSearch}>
              {this.props.isSearch && "검색하기"}
              {!this.props.isSearch && "방 만들기"}
            </SubmitButton>
          </div>
        )}
        {/* 지금은 그냥 방 추가일때도 이걸로 표시, 추후 내 방 리스트 프론트 만들어지면 그걸로 돌리면됨 */}
        {isResults.is && <SearchResult searchResults={isResults.data} />}
      </>
    );
  }
}

SearchOrAdd.propTypes = {
  // FIXME specify type
  isSearch: PropTypes.boolean,
};
export default SearchOrAdd;
