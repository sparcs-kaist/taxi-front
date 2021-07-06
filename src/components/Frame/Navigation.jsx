import { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import './Navigation.css';
import svgSearch from './NavigationIcon/search.svg';
import svgAddroom from './NavigationIcon/add.svg';
import svgMyroom from './NavigationIcon/chat.svg';
import svgSetting from './NavigationIcon/setting.svg';
import svgSearchSelected from './NavigationIcon/search_selected.svg';
import svgAddroomSelected from './NavigationIcon/add_selected.svg';
import svgMyroomSelected from './NavigationIcon/chat_selected.svg';
import svgSettingSelected from './NavigationIcon/setting_selected.svg';

const NavigationBtn = (props) => {
    const [isHover, setHover] = useState(false);
    const layStyle = {
        float: 'left', position: 'relative',
        width: '25%', height: '100%'
    }
    const imgStyle = {
        position: 'absolute', top: '9px', left: 'calc(50% - 11px)',
        width: '19px', height: '19px'
    }
    const txtStyle = {
        position: 'absolute', top: '36px', left: '0px',
        width: '100%', linHeight: '20px', textAlign: 'center',
        fontSize: '8px', color: '#9B9B9B'
    }
    const config = { duration: 150 };
    const springIcon1 = useSpring({
        opacity: props.selected || isHover ? 0 : 1, config: config
    });
    const springIcon2 = useSpring({
        opacity: props.selected || isHover ? 1 : 0, config: config
    });
    const springTxt = useSpring({
        color: props.selected || isHover ? '#663D71' : '#9B9B9B'
    });
    return (
        <Link to={ props.to }>
            <div onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) } style={ layStyle }>
                <animated.div style={{ ...imgStyle, ...springIcon1 }}>{ props.icon }</animated.div>
                <animated.div style={{ ...imgStyle, ...springIcon2 }}>{ props.icon2 }</animated.div>
                <animated.div style={{ ...txtStyle, ...springTxt }}>{ props.name }</animated.div>
            </div>
        </Link>
    );
}
class Navigation extends Component {
    render() {
        return (
            <div id="navigation" className="ND">
                <div className="lay_auto" style={{ height: '100%' }}>
                    <NavigationBtn to="/search" name="검색"
                    icon={ <img src={ svgSearch } alt="search"/> } icon2={ <img src={ svgSearchSelected } alt="search"/> }
                    selected={ this.props.selected === "search" }/>
                    <NavigationBtn to="/addroom" name="방 개설"
                    icon={ <img src={ svgAddroom } alt="addroom"/> } icon2={ <img src={ svgAddroomSelected } alt="addroom"/> }
                    selected={ this.props.selected === "addroom" }/>
                    <NavigationBtn to="/myroom" name="내 방"
                    icon={ <img src={ svgMyroom } alt="myroom"/> } icon2={ <img src={ svgMyroomSelected } alt="myroom"/> }
                    selected={ this.props.selected === "myroom" }/>
                    <NavigationBtn to="/setting" name="설정"
                    icon={ <img src={ svgSetting } alt="setting"/> } icon2={ <img src={ svgSettingSelected } alt="setting"/> }
                    selected={ this.props.selected === "setting" }/>
                </div>
            </div>
        );
    }
}

export default Navigation;