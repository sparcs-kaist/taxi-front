import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import {Link} from 'react-router-dom';
import backServer from '../../serverconf';

class Roomlist extends Component {
    constructor(props){
        super(props);
        this.state={
            taxi:[]
        }
    }

    componentDidMount(){
        axios.get(backServer +"/rooms/newtaxi")
        .then ( (data) => this.setState({ taxi: data }))
    }


  render(){
    return (
        <div className="roomlist" > 
                    <text className="content">
                        {this.state.taxi.map(taxi=> 
                            <div className="room" style={{'marginBottom':'20px', 'width':'1020px','height':"200px"}}>
                                <text className="name">Name : {taxi.name}</text><br/>
                                <text  className="from">From : {taxi.from}</text><br/>
                                <text className="to">To : {taxi.to}</text><br/>
                                <text className="time">Time : {taxi.time}</text>
                                <text  className = "madeat">Madeat : {taxi.madeat}</text>
                                <br/>
                            </div>)}
                    </text>
        </div>
    );
  }
}

Roomlist.propTypes = {

}
Roomlist.defaultProps = {
 
}

export default Roomlist;

