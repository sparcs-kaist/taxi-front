import React, { Component } from 'react';
import  Picker from 'react-picker';
import DatePicker from 'react-datepicker';
//import Picker from 'react-scrollable-picker';
import Select from 'react-select'
import WhiteContainer from '../Frame/WhiteContainer/WhiteContainer.jsx';
import WhiteContainerMargin from '../Frame/WhiteContainer/WhiteContainerMargin.jsx';
import './Search.css';

 
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';

class Search extends Component {
    constructor(props){

        super(props)
        this.state = {
            startDate: new Date(),
        };
        this.handleChange = this.handleChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    handleChange(date) {
        this.setState({
          startDate: date
        })
      }
    
      onFormSubmit(e) {
        e.preventDefault();
        console.log(this.state.startDate)
      }

    render() {
        return (
            <div className ="searchroom">
                <WhiteContainer title ="방 검색">
                    <div style={{display:"flex",flexDirection:"row", alignItems:"stretch", marginBottom:60}}>
                        <div className = "departure" style={{width:'30%'}}>
                            <label> 출발지 </label>
                            <Select 
                                options={ [
                                { value: '기계동', label: '기계동' },{ value: '대전역', label: '대전역' },{ value: '시외버스터미널', label: '시외버스터미널' }
                                ]}
                                />
                        </div>
                        
                        <div className = "arrival" style={{width:'30%', marginLeft:'20%'}}>
                            <label> 도착지 </label>
                            <Select 
                                options={ [
                                { value: '기계동', label: '기계동' },{ value: '대전역', label: '대전역' },{ value: '시외버스터미널', label: '시외버스터미널' }
                                ]}
                                />
                        </div>
                    </div>

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

                </WhiteContainer>
            </div>
          );
    }
}

export default Search;
