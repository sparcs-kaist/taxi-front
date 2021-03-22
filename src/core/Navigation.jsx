import React, { Component } from 'react';
import './Navigation.css';

class Navigation extends Component {
    render() {
        return (
            <div id="navigation" className="ND">
                <div className="lay_auto">
                    <div className="navigation-BTN">Search</div>
                    <div className="navigation-BTN">2</div>
                    <div className="navigation-BTN">Mypage</div>
                    <div className="navigation-BTN">Setting</div>
                </div>
            </div>
        );
    }
}

export default Navigation;