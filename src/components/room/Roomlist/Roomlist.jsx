import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import {Link} from 'react-router-dom';
import backServer from '../../../serverconf';

// db 들어가 있는 방 목록 모두 출력

class Roomlist extends Component {
    constructor(props){
        super(props);
        this.state={
            taxi:[]
        }
    }

    componentDidMount(){
        axios.get(backServer +"/rooms/getAllRoom")
        .then ( (data) => {console.log(data); this.setState({ taxi: data.data });})
    }

  render(){
    return (
        <div className="roomlist" > 
            <div className="content">
                {this.state.taxi.map(t=> 
                    <div className="room" style={{'marginBottom':'20px', 'width':'1020px','height':"200px"}}>
                        <p className="name">Name : {t.name}</p><br/>
                        <p className="from">From : {t.from}</p><br/>
                        <p className="to">To : {t.to}</p><br/>
                        <p className="time">Time : {t.time}</p>
                        <p className="madeat">Madeat : {t.madeat}</p>
                        <br/>
                    </div>)}
            </div>
        </div>
    );
  }
}

export default Roomlist;

