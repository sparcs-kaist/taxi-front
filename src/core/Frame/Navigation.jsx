import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

class Navigation extends Component {
    render() {
        return (
            <div id="navigation" className="ND">
                <div className="lay_auto">
                    <Link to="/search"><div className="navigation-BTN">Search</div></Link>
                    <Link to="/addroom"><div className="navigation-BTN">Addroom</div></Link>
                    <Link to="/myroom"><div className="navigation-BTN">Myroom</div></Link>
                    <Link to="/setting"><div className="navigation-BTN">Setting</div></Link>
                </div>
            </div>
        );
    }
}

export default Navigation;