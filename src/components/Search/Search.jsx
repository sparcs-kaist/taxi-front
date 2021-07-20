import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
//import Picker from 'react-scrollable-picker';
import Select from 'react-select'
import WhiteContainer from '../Frame/WhiteContainer/WhiteContainer.jsx';
import WhiteContainerMargin from '../Frame/WhiteContainer/WhiteContainerMargin.jsx';
 
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
                <WhiteContainer>
                </WhiteContainer>
            </div>
          );
    }
}

export default Search;
