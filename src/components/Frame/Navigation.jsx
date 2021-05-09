import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';
import svgSearch from './NavigationIcon/search.svg';
import svgAddroom from './NavigationIcon/add.svg';
import svgMyroom from './NavigationIcon/chat.svg';
import svgSetting from './NavigationIcon/setting.svg';

const NavigationBtn = (props) => {
    const layStyle = {
        float: 'left', position: 'relative',
        width: '25%', height: '100%'
    }
    const imgStyle = {
        position: 'absolute', top: '7px', left: 'calc(50% - 11px)',
        width: '22px', height: '22px'
    }
    const txtStyle = {
        position: 'absolute', top: '34px', left: '0px',
        width: '100%', linHeight: '20px', textAlign: 'center',
        fontSize: '14px'
    }
    return (
        <Link to={ props.to }>
            <div style={ layStyle }>
                <div style={ imgStyle }>{ props.icon }</div>
                <div style={ txtStyle }>{ props.name }</div>
            </div>
        </Link>
    );
}
class Navigation extends Component {
    render() {
        return (
            <div id="navigation" className="ND">
                <div className="lay_auto" style={{ height: '100%' }}>
                    <NavigationBtn to="/search" name="Search" icon={ <img src={ svgSearch } alt="search"/> }/>
                    <NavigationBtn to="/addroom" name="Addroom" icon={ <img src={ svgAddroom } alt="addroom"/> }/>
                    <NavigationBtn to="/myroom" name="Myroom" icon={ <img src={ svgMyroom } alt="myroom"/> }/>
                    <NavigationBtn to="/setting" name="Setting" icon={ <img src={ svgSetting } alt="setting"/> }/>
                </div>
            </div>
        );
    }
}

export default Navigation;