import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from '../Tool/axios';
import Navigation from './Navigation';
import Footer from './Footer';
import './Frame.css';

const TopBar = (props) => {
    return (
        <div style={{ background: '#663D71', width: '100%', height: '5px', position: 'fixed', top: '0px', left: '0px' }}/>
    )
}
class Frame extends Component {
    constructor(props) { // constructor 에서 빼기
        super(props);

        this.state = { loginCheck: undefined };
        axios.get('/json/logininfo').then((userInfo) => {
            if(userInfo.data.id) this.setState({ loginCheck: true });
            else this.setState({ loginCheck: false });
        }).catch((error) => {
            console.log('axios error : '+error); // 추후 수정 바람
        });
    }
    render() {
        if(this.state.loginCheck == undefined) {
            return (
                <div id="main-container">
                    <Navigation selected={ this.props.navi }/><TopBar/>
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
                    { this.props.children }
                    <Footer/>
                    <Navigation selected={ this.props.navi }/><TopBar/>
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