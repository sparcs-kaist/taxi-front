import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import backServer from '../../serverconf';

class Addroom extends Component {
    constructor(props) {
        super(props);
        this.handleName=this.handleName.bind(this);
        this.handleFrom = this.handleFrom.bind(this);
        this.handleTo = this.handleTo.bind(this);
        this.handlePart = this.handlePart.bind(this);
        this.handleMadeat = this.handleMadeat.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            name:"",
            from:"",
            to:"",
            time:"",
            part:"",
            madeat:""
        };
    }


    handleName = e =>{
        e.preventDefault();
        this.setState({
            name:e.target.value
        })
    }

    handleFrom = e =>{
        e.preventDefault();
        this.setState({
            from:e.target.value
        })
    }

    handleTo=e=>{
        e.preventDefault();
        this.setState({
           to:e.target.value
        })
    }    

    handleTime=e=>{
        e.preventDefault();
        this.setState({
            time:e.target.value
        })
    }

    handlePart =e =>{
        e.preventDefault();
        this.setState({
            part:e.target.value
        })

    }
    handleMadeat= e =>{
        e.preventDefault();
        this.setState({
            madeat:e.target.value
        })
    }


    onSubmit(e){
        e.preventDefault();
        console.log("submit about new class been successful")

        const newTaxi= {
            name:this.state.name,
            from:this.state.from,
            to:this.state.to,
            time:this.state.time,
            part:this.state.part,
            madeat:this.state.madeat
        };
        
        axios.post(backServer+"/rooms/newtaxi", newTaxi)
            .then(res=>console.log(res.data))
            .then(console.log("help"))

        this.setState({
            name:"",
            from:"",
            to:"",
            time:"",
            part:"",
            madeat:""
        })
    }


  render(){
    return (
        <div className="page">

            <div className="maintitle"> Make Taxi</div>
            
            <div className="newtaxi">
                <form onSubmit = {this.onSubmit}>
                    <text className="title">Create Room</text>
                    <div><input placeholder="name" value={this.state.name} onChange={this.handleName} className="name"></input>  </div>
                    <div><input placeholder="from" value={this.state.from} onChange={this.handleFrom} className="from"></input> </div>
                    <div><input placeholder="to" value={this.state.to} onChange={this.handleTo} className="to"></input> </div>
                    <div><input placeholder="time" value={this.state.time} onChange={this.handleTime} className="time"></input> </div>
                    <div><input placeholder="part" value={this.state.part} onChange={this.handlePart} className="part"></input> </div>
                    <div><input placeholder="madeat" value= {this.state.madeat} onChange = {this.handleMadeat} className="madeat"></input> </div>
                    <button className="button"> Make New Taxi Class </button>
                </form>
                
            </div>
        </div>
    );
  }
}

Addroom.propTypes = {

}
Addroom.defaultProps = {
 
}

 export default Addroom;
