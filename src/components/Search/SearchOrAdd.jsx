import React, { Component } from "react";
//import Picker from 'react-scrollable-picker';
import DatePicker from "../Frame/DatePicker/DatePicker";
import WhiteContainer from "../Frame/WhiteContainer/WhiteContainer.jsx";
import Title from "../Frame/Title/Title";
import SubmitButton from "../Frame/SubmitButton/SubmitButton";
import SearchResult from "./SearchResult/SearchResult"
import {
  Paper,
  Divider,
  Grid,
  Dialog,
  DialogContent,
  Button,
  DialogActions,
} from "@material-ui/core";
import Picker from "react-scrollable-picker";
//import Picker from 'react-mobile-picker';

import svgSearch from "./svg_search.svg";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import CreateIcon from "@material-ui/icons/Create";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import PropTypes from "prop-types";

import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "../Tool/axios";

class SearchOrAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearchResults: {
        is: false,
        data: []
      },
      startDate: new Date(),
      openDep: false,
      openArr: false,
      openTime: false,
      roomName: undefined,
      valueDate: [undefined, undefined],
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
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
        }
      });
    } else {
      return axios.post('/rooms/create', {
        data: {
          name: name,
          from: dep,
          to: arr,
          time: startDate,
          part: part
        }
      })
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
        msg
      }
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
        msg
      }
    }

  }

  onFormSubmit(e) {
    e.preventDefault();
    this.setState({
      roomName: e.target.value,
    });
  }

  handleChangeDate(month, date) {
    this.setState({
      valueDate: [month, date],
    });
  }

  // usage: handleChange("valueGroupsDep") 
  handleChange(state) {
    return (
      (name, value) => {
        this.setState((prev) => ({
          [state]: {
            ...prev.state,
            [name]: value,
          },
        }));
      }
    )
  }

  // 뭐에 대한 onclick?
  async onClickSearch() {
    const roomName = this.state.roomName;
    const depString = this.state.valueGroupsDep.place;
    const arrString = this.state.valueGroupsArr.place;
    const depTimeString = this.state.valueGroupsTimeHour.hour;
    const arrTimeString = this.state.valueGroupsTimeMin.min;
    const date = this.state.valueDate;

    const formValidity = this.validateForm({ roomName, depString, arrString, date });

    if (formValidity.isValid) {
      // date의 type 검증 필요
      try {
        const res = await this.getAPIRes(depString, arrString, date, roomName, [])
        console.log(res);
        if (res.status === 200) {
          this.setState({
            isSearchResults: {
              is: true,
              data: res.data
            }
          })
        }
      } catch (e) {
        console.log("error occured while fetching API data");
        console.log(e)
      }
    } else {
      alert(formValidity.msg);
    }
  }

  render() {
    const isSearchResults = this.state.isSearchResults;
    return (
      <>
        {!isSearchResults.is &&
          <div className="searchroom">
            <div style={{ height: "20px" }} />
            <Title img={svgSearch}>
              {this.props.isSearch && "방 검색하기"}
              {!this.props.isSearch && "방 만들기"}
            </Title>
            <div style={{ height: "20px" }} />
            {/* 방 제목으로 검색 */}
            <WhiteContainer title="방 검색">
              <div
                style={{
                  display: "flex",
                  alignContent: "row",
                  alginItems: "center",
                }}
              >
                <CreateIcon
                  style={{
                    width: "20px",
                    height: "20px",
                    marginLeft: "15px",
                    marginTop: "2px",
                    fill: "black",
                  }}
                />
                <div
                  style={{
                    marginLeft: "5px",
                    fontSize: "16px",
                    color: "black",
                  }}
                >
                  방 이름 :{" "}
                </div>
                <input
                  onChange={this.onFormSubmit}
                  type="text"
                  id="roomName"
                  style={{
                    borderRadius: "8px",
                    borderStyle: "none",
                    backgroundColor: "#FAFAFA",
                    width: "calc(100% - 110px)",
                    height: "28px",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    marginLeft: "10px",
                  }}
                ></input>
              </div>
            </WhiteContainer>

            {/* 출발지, 도착지로검색 */}
            <WhiteContainer title="장소">
              <Paper style={{ height: "80px" }} elevation={0}>
                <Grid container>
                  <Grid item xs>
                    <div
                      className="departure"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div
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
                            onChange={this.handleChange("valueGroupsDep")}
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
                          })
                        }}
                        style={{ margin: "auto" }}
                      >
                        <div style={{ fontWeight: "bold", fontSize: "16pt" }}>
                          {this.state.valueGroupsArr.place}
                        </div>
                      </Button>
                      <Dialog
                        open={this.state.openArr}
                        onClose={() => this.setState({
                          openArr: false,
                        })}
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
                            onChange={this.handleChange("valueGroupsArr")}
                          />
                        </DialogContent>
                      </Dialog>
                    </div>
                  </Grid>
                </Grid>
              </Paper>
            </WhiteContainer>

            {/* 날짜로 검색 */}
            <WhiteContainer title="날짜 검색">
              <DatePicker handler={this.handleChangeDate} />
            </WhiteContainer>

            {/* 시간으로 검색 후보 2 */}
            <WhiteContainer title="시간">
              <div
                style={{
                  display: "flex",
                  alignContent: "row",
                  alginItems: "center",
                }}
              >
                <AccessTimeIcon
                  style={{
                    width: "20px",
                    height: "20px",
                    marginLeft: "15px",
                    marginTop: "2px",
                    fill: "black"
                  }}
                />
                <div
                  style={{
                    marginLeft: "5px",
                    fontSize: "16px",
                    color: "black",
                  }}
                >
                  출발 시각
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignContent: "row",
                  justifyContent: "center",
                }}
              >
                <Button
                  onClick={() => this.setState({
                    openTime: true,
                  })}
                  style={{ margin: "auto", color: "lightgray" }}
                >
                  <div style={{ fontWeight: "bold", fontSize: "16pt" }}>
                    {this.state.valueGroupsTimeHour.hour}시{" "}
                    {this.state.valueGroupsTimeMin.min}분
                  </div>
                </Button>
                <Dialog open={this.state.openTime}
                  onClose={() =>
                    this.setState({
                      openTime: false,
                    })}
                >
                  <DialogContent
                    style={{
                      height: "300px",
                      margin: "auto",
                      width: "500px",
                      display: "flex",
                      alignContent: "row",
                    }}
                  >
                    <AccessTimeIcon
                      style={{
                        marginRight: "5px",
                        width: "14px",
                        fill: "black",
                      }}
                    />
                    <div> 시간: </div>
                    <div
                      style={{
                        width: "100px",
                        fontSize: "12px",
                        backgroundColor: "#F7F7F7",
                        borderRadius: "10px",
                        padding: "10px",
                        margin: "20px",
                      }}
                    >
                      <Picker
                        optionGroups={this.state.optionGroupsTimeHour}
                        valueGroups={this.state.valueGroupsTimeHour}
                        onChange={this.handleChange("valueGroupsTimeHour")}
                      />
                    </div>
                    <div> 시 </div>
                    <div
                      style={{
                        width: "100px",
                        fontSize: "12px",
                        backgroundColor: "#F7F7F7",
                        borderRadius: "10px",
                        padding: "10px",
                        margin: "20px",
                      }}
                    >
                      <Picker
                        optionGroups={this.state.optionGroupsTimeMin}
                        valueGroups={this.state.valueGroupsTimeMin}
                        onChange={this.handleChange("valueGroupsTimeMin")}
                      />
                    </div>
                    <div> 분 이후 </div>
                  </DialogContent>
                </Dialog>
              </div>
            </WhiteContainer>
            <SubmitButton onClick={this.onClickSearch}>
              {this.props.isSearch && "검색하기"}
              {!this.props.isSearch && "방 만들기"}
            </SubmitButton>
          </div>
        }
        {/* 지금은 그냥 방 추가일때도 이걸로 표시, 추후 내 방 리스트 프론트 만들어지면 그걸로 돌리면됨 */}
        {isSearchResults.is &&
          <SearchResult searchResults={isSearchResults.data} />}
      </>
    );
  }
}

SearchOrAdd.propTypes = {
  // FIXME specify type
  isSearch: PropTypes.boolean,
};
export default SearchOrAdd;
