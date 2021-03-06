import React, { Component } from 'react';
//import Picker from 'react-scrollable-picker';
import DatePicker from '../Frame/DatePicker/DatePicker';
import Select from 'react-select'
import WhiteContainer from '../Frame/WhiteContainer/WhiteContainer.jsx';
import WhiteContainerMargin from '../Frame/WhiteContainer/WhiteContainerMargin.jsx';
import {Paper, Divider, Grid, Dialog, DialogContent, Button, DialogActions} from '@material-ui/core';
import Picker from 'react-scrollable-picker';
//import Picker from 'react-mobile-picker';

 
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';

class Search extends Component {
    constructor(props){

        super(props)
        this.state = {
            startDate: new Date(),
            open : false,
            valueGroups: {
                place: '카이스트'
              }, 
            optionGroups: {
                place: [
                { value: '택시승강장', label: '택시승강장' },
                { value: '갤러리아 타임월드', label: '갤러리아 타임월드' },
                { value: '서대전역', label: '서대전역' },
                { value: '대전역', label: '대전역' },
                { value: '정부청사', label: '정부청사' }
            ],
            },
        };
        this.handleChangeDeparture = this.handleChangeDeparture.bind(this);
        this.handleChangeArrival = this.handleChangeArrival.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose= this.handleClose.bind(this);
    }
    
      onFormSubmit(e) {
        e.preventDefault();
        console.log(this.state.startDate)
      }

      handleOpen(){
          this.setState({
              open: true
          })
      }

      handleClose(){
          this.setState({
              open: false
          })
      }

      handleChangeDeparture = (name, value) => {
        this.setState(({valueGroups}) => ({
          valueGroups: {
            ...valueGroups,
            [name]: value
          }
        }));
      };

      handleChangeArrival = (name, value) => {
        this.setState(({valueGroups}) => ({
          valueGroups: {
            ...valueGroups,
            [name]: value
          }
        }));
      };


    render() {
        return (
            <div className ="searchroom">
                <WhiteContainer title ="방 검색">
                    <Paper style={{height:"150px", margin:'40px', padding:"20px", borderRadius: '12px' }}>
                        <Grid container >
                            <Grid item xs={5}>
                                <div className = "departure" style={{display:'flex', flexDirection:'column', justifyContent:'flex-start'}}>
                                    <label style={{margin:'auto'}}> 출발지 </label>
                                    <Button onClick={this.handleOpen} style={{marginTop: '15px',  color: 'lightgray'}}>
                                        <div style={{fontWeight: 'bold', fontSize: '20px'}}>
                                        어디서 출발할까요?
                                        </div>
                                    </Button>
                                        <Dialog open={this.state.open} onClose={this.handleClose} >
                                            <DialogContent style={{height: '300px', margin: 'auto', width: '500px'}}>
                                                <Picker
                                                    optionGroups={this.state.optionGroups}
                                                    valueGroups={this.state.valueGroups}
                                                    onChange={this.handleChangeDeparture}
                                                />
                                            </DialogContent>
                                            {/* <DialogActions>
                                                <Button onClick={this.handleClose}> 취소 </Button>
                                                <Button> 선택하기 </Button>
                                            </DialogActions> */}
                                        </Dialog>
                                </div>
                            </Grid>
                            <Divider orientation="vertical" flexItem style={{height:'100px',margin:"auto"}}/>
                            <Grid item xs={5}>
                                <div className = "arrival" style={{display:'flex', flexDirection:'column', justifyContent:'flex-start'}}>
                                    <label style={{margin:'auto'}}> 도착지 </label>
                                    <Button onClick={this.handleOpen} style={{marginTop: '15px',  color: 'lightgray'}}>
                                        <div style={{fontWeight: 'bold', fontSize: '20px'}}>
                                        어디로 갈까요?
                                        </div>
                                    </Button>
                                    <Dialog open={this.state.open} onClose={this.handleClose} >
                                        <DialogContent style={{height: '300px', margin: 'auto', width: '500px'}}>
                                            <Picker
                                                optionGroups={this.state.optionGroups}
                                                valueGroups={this.state.valueGroups}
                                                onChange={this.handleChangeArrival}
                                                />
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </Grid>
                        </Grid>
                    </Paper>

                    <hr></hr>

                    <div className = "date" style={{}}>
                    <label > 출발 날짜 </label>
                        <form onSubmit={ this.onFormSubmit }>
                            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', marginBottom:60}}>
                                <DatePicker
                                    selected={ this.state.startDate }
                                    onChange={ this.handleChange }
                                    name="startDate"
                                    dateFormat="MM/dd/yyyy"
                                />
                                </div>
                        </form>
                    </div>

                    <hr></hr>

                    <div  className="deptime"> 출발시간</div> 
                    <div className = "departuretime" style={{marginBottom:60, display:"flex",flexDirection:"row", alignItems:"stretch" , justifyContent:"space-evenly"}}>
                        <div style={{width:'20%'}} className="am">
                            <label style={{fontSize:12}}> AM/PM </label>
                            <Select 
                                options={ [
                                { value: 'AM', label: 'AM' },
                                { value: 'PM', label: 'PM' },
                                ]}
                                />
                        </div>
                        <div style={{width:'30%'}} className="hour">
                            <label style={{fontSize:12}}> 시간 </label>
                            <Select 
                                options={ [
                                { value: '1', label: '1' },{ value: '2', label: '2' },{ value: '3', label: '3' },{ value: '4', label: '4' },{ value: '5', label: '5' },{ value: '6', label: '6' },{ value: '7', label: '7' },{ value: '8', label: '8' },{ value: '9', label: '9' },{ value: '10', label: '10' },{ value: '11', label: '11' },
                                ]}
                                />
                        </div>
                        <div style={{width:'20%'}} className="minute">
                            <label style={{fontSize:12}}> 분 </label>
                            <Select 
                                options={ [
                                { value: '0', label: '0' }, { value: '15', label: '15' },{ value: '30', label: '30' },{ value: '45', label: '45' }
                                ]}
                                />
                        </div>
                    </div>
                    
                    <hr></hr>

                    <label > 방명 </label>
                    <div className = "roomname">
                        <form onSubmit={ this.onFormSubmit }>
                            <input type='text' placeholder="방 이름을 입력하세요" style={{borderStyle:"none"}}></input>
                        </form>
                    </div>

                    <button className="submitbutton" style={{backgroundColor:"#7F59CA" , width: '100%', height:40, borderRadius:10, marginTop:40}}  > 검색하기 </button>
                </WhiteContainer>
                <WhiteContainerMargin/>
                <WhiteContainer title="추천 방 목록">
                    <div style={{ display: 'flex', alignContent: 'row', justifyContent: 'center'}}>
                        <div> 시간: </div>
                        <div style={{width: '100px',fontSize:'12px', backgroundColor:'#F7F7F7', borderRadius:'10px', padding: '10px', margin: '20px'}}>
                            <Picker
                                optionGroups={this.state.optionGroups}
                                valueGroups={this.state.valueGroups}
                                onChange={this.handleChangeDeparture}
                            />
                        </div>
                        <div> 시 </div>
                        <div style={{width: '100px', fontSize:'12px', backgroundColor:'#F7F7F7', borderRadius:'10px', padding: '10px',  margin: '20px'}}>
                            <Picker
                                optionGroups={this.state.optionGroups}
                                valueGroups={this.state.valueGroups}
                                onChange={this.handleChangeDeparture}
                            />
                        </div>
                        <div> 분 이후 </div>
                    </div>

                </WhiteContainer>
            </div>
          );
    }
}

export default Search;
