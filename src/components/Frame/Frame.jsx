import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { browserHistory } from 'react-router';
import axios from 'axios';
import Navigation from './Navigation';
import Footer from './Footer';
import './Frame.css';

class Frame extends Component {
    constructor(props) {
        super(props);

        this.state = { loginCheck: undefined };
        axios.get('/json/logininfo').then((userInfo) => {
            if(userInfo.data.id) this.setState({ loginCheck: true });
            else this.setState({ loginCheck: false });
        })
    }
    render() {
        if(this.state.loginCheck == undefined) {
            return (
                <div id="main-container">
                    <div id="main-content">
                    </div>
                    <Navigation/>
                </div>
            );
        }
        else if(this.state.loginCheck == false){
            return (
                <Redirect to={ '/login?redirect='+window.location.pathname }/>
            );
        }
        else{
            return (
                <div id="main-container">
                    <div id="main-content">
                        { this.props.children }
                        <Footer/>
                    </div>
                    <Navigation/>
                </div>
            );
        }
    }
}

Frame.propTypes = {

}
Frame.defaultProps = {
    children: <div></div>
}

export default Frame;