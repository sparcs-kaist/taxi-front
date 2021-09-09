import React, { Component } from 'react';
//import Picker from 'react-scrollable-picker';
import DatePicker from '../Frame/DatePicker/DatePicker';
import Select from 'react-select'
import WhiteContainer from '../Frame/WhiteContainer/WhiteContainer.jsx';
import Title from '../Frame/Title/Title';
import {Paper, Divider, Grid, Dialog, DialogContent, Button, DialogActions} from '@material-ui/core';
import Picker from 'react-scrollable-picker';
//import Picker from 'react-mobile-picker';

import svgSearch from './svg_search.svg';
 
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';

class Search extends Component {
    constructor(props){
        super(props)
        this.state = {
            startDate: new Date(),
            openDep : false,
            openArr: false,
            openTime:false,
            valueGroupsDep: {
                place: '택시승강장'
            }, 
            optionGroupsDep: {
                place: [
                    { value: '택시승강장', label: '택시승강장' },
                    { value: '갤러리아 타임월드', label: '갤러리아 타임월드' },
                    { value: '서대전역', label: '서대전역' },
                    { value: '대전역', label: '대전역' },
                    { value: '정부청사', label: '정부청사' }
                ],
            },
            valueGroupsArr: {
                place: '택시승강장'
            }, 
            optionGroupsArr: {
                place: [
                    { value: '택시승강장', label: '택시승강장' },
                    { value: '갤러리아 타임월드', label: '갤러리아 타임월드' },
                    { value: '서대전역', label: '서대전역' },
                    { value: '대전역', label: '대전역' },
                    { value: '정부청사', label: '정부청사' }
                ],
            },
            valueGroupsTimeHour: {
                hour: '1'
            }, 
            optionGroupsTimeHour: {
                hour: [
                    { value: '1', label: '1' },
                    { value: '2', label: '2' },
                    { value: '3', label: '3' },
                    { value: '4', label: '4' },
                    { value: '5', label: '5' }
                ],
            },
            valueGroupsTimeMin: {
                min: '15'
            }, 
            optionGroupsTimeMin: {
                min: [
                    { value: '15', label: '15' },
                    { value: '30', label: '30' },
                    { value: '45', label: '45' },
                    { value: '00', label: '00' }
                ],
            },
        };
        this.handleChangeDep = this.handleChangeDep.bind(this);
        this.handleChangeArr = this.handleChangeArr.bind(this);
        this.handleChangeTimeHour = this.handleChangeTimeHour.bind(this);
        this.handleChangeTimeMin = this.handleChangeTimeMin.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.handleOpenArr = this.handleOpenArr.bind(this);
        this.handleOpenDep = this.handleOpenDep.bind(this);
        this.handleOpenTime = this.handleOpenTime.bind(this);
        this.handleCloseArr= this.handleCloseArr.bind(this);
        this.handleCloseDep= this.handleCloseDep.bind(this);
        this.handleCloseTime= this.handleCloseTime.bind(this);
    }
    
    onFormSubmit(e) {
        e.preventDefault();
        console.log(this.state.startDate)
    }

    handleOpenDep(){
        this.setState({
            openDep: true
        })
    }
    handleOpenArr(){
        this.setState({
            openArr: true
        })
    }
    
    handleOpenTime(){
        this.setState({
            openTime: true
        })
    }

    handleCloseTime(){
        this.setState({
            openTime: true
        })
    }

    handleCloseArr(){
        this.setState({
            openArr: false
        })
    }

    handleCloseDep(){
        this.setState({
            openArr: false
        })
    }

    handleChangeDep = (name, value) => {
        this.setState(({valueGroupsDep}) => ({
            valueGroupsDep: {
                ...valueGroupsDep,
                [name]: value
            }
        }));
    };

    handleChangeArr = (name, value) => {
        this.setState(({valueGroupsArr}) => ({
            valueGroupsArr: {
                ...valueGroupsArr,
                [name]: value
            }
        }));
    };

    handleChangeTimeHour = (name, value) => {
        this.setState(({valueGroupsTimeHour}) => ({
            valueGroupsTimeHour: {
                ...valueGroupsTimeHour,
                [name]: value
            }
        }));
    };

    handleChangeTimeMin = (name, value) => {
        this.setState(({valueGroupsTimeMin}) => ({
            valueGroupsTimeMin: {
                ...valueGroupsTimeMin,
                [name]: value
            }
        }));
    };


    render() {
        return (
            <div className ="searchroom"> 
                <div style={{ height: '20px' }}/>
                <Title img={ svgSearch }>방 검색하기</Title>
                <div style={{ height: '20px' }}/>

                {/* 방 제목으로 검색 */}
                <WhiteContainer title ="방 검색">
                    <div style={{display: 'flex', alignContent: 'row'}}>
                        <label> 방 이름 : </label>
                        <div className = "roomname" style={{marginLeft: '20px', borderRadius:'10px'}}>
                            <form onSubmit={ this.onFormSubmit }>
                                <input type='text' placeholder="방 이름을 입력하세요" style={{borderStyle:"none"}}></input>
                            </form>
                        </div>
                    </div>
                </WhiteContainer>

                {/* 출발지, 도착지로검색 */}
                <WhiteContainer title ="방 검색">
                    <Paper style={{height:"80px", margin:'40px'}} elevation={0}>
                        <Grid container >
                            <Grid item xs={6}>
                                <div className = "departure" style={{display:'flex', flexDirection:'column'}}>
                                    <label style={{margin:'auto'}}> 출발지 </label>
                                    <Button onClick={this.handleOpenArr} style={{margin:'auto',  color: 'lightgray'}}>
                                        <div style={{fontWeight: 'bold', fontSize: '20px'}}>
                                        어디서 출발할까요?
                                        </div>
                                    </Button>
                                    <Dialog open={this.state.openArr} onClose={this.handleCloseArr} >
                                        <DialogContent style={{height: '300px', margin: 'auto', width: '500px'}}>
                                            <Picker
                                                optionGroups={this.state.optionGroupsDep}
                                                valueGroups={this.state.valueGroupsDep}
                                                onChange={this.handleChangeDep}
                                            />
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div className = "arrival" style={{display:'flex', flexDirection:'column'}}>
                                    <label style={{margin:'auto'}}> 도착지 </label>
                                    <Button onClick={this.handleOpenDep} style={{margin:'auto',  color: 'lightgray'}}>
                                        <div style={{fontWeight: 'bold', fontSize: '20px'}}>
                                        어디로 갈까요?
                                        </div>
                                    </Button>
                                    <Dialog open={this.state.openDep} onClose={this.handleCloseDep} >
                                        <DialogContent style={{height: '300px', margin: 'auto', width: '500px'}}>
                                            <Picker
                                                optionGroups={this.state.optionGroupsArr}
                                                valueGroups={this.state.valueGroupsArr}
                                                onChange={this.handleChangeArr}
                                                />
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </Grid>
                        </Grid>
                    </Paper>
                </WhiteContainer>

                {/* 날짜로 검색 */}
                <WhiteContainer title ="날짜 검색">
                    <DatePicker
                        selected={ this.state.startDate }
                        onChange={ this.handleChange }
                        name="startDate"
                        dateFormat="MM/dd/yyyy"
                    />
                </WhiteContainer>

                {/* 시간으로 검색 후보 2 */}
                <WhiteContainer title="시간">
                    <label > 출발 시각 </label>
                    <div style={{ display: 'flex', alignContent: 'row', justifyContent: 'center'}}>
                        <Button onClick={this.handleOpenArr} style={{margin:'auto',  color: 'lightgray'}}>
                            몇시 몇분에 출발할까요?
                        </Button>
                        <Dialog open={this.state.openTime} onClose={this.handleCloseTIme} >
                            <DialogContent style={{height: '300px', margin: 'auto', width: '500px'}}>
                            <div> 시간: </div>
                                <div style={{width: '100px',fontSize:'12px', backgroundColor:'#F7F7F7', borderRadius:'10px', padding: '10px', margin: '20px'}}>
                                    <Picker
                                        optionGroups={this.state.optionGroupsTimeHour}
                                        valueGroups={this.state.valueGroupsTimeHour}
                                        onChange={this.handleChangeTimeHour}
                                    />
                                </div>
                                <div> 시 </div>
                                <div style={{width: '100px', fontSize:'12px', backgroundColor:'#F7F7F7', borderRadius:'10px', padding: '10px',  margin: '20px'}}>
                                    <Picker
                                        optionGroups={this.state.optionGroupsTimeMin}
                                        valueGroups={this.state.valueGroupsTimeMin}
                                        onChange={this.handleChangeTimeMin}
                                    />
                                </div>
                                <div> 분 이후 </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </WhiteContainer>

                <button className="submitbutton" style={{backgroundColor:"#7F59CA",width: '43%', height:40, borderRadius:10, marginLeft: '28.5%'}}  > 
                    검색하기
                </button>
            </div>
          );
    }
}

export default Search;
