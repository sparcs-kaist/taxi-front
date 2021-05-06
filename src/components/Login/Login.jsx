import React, { Component } from 'react';
import { useSpring, animated } from 'react-spring';
import './Login.css';
import imgBackground from './img_background.jpg';
import backServer from '../../serverconf';


const DarkBackground = () => {
    const opacityProps = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        config: { duration: 1500 }
    })
    return <animated.img id="background" src={ imgBackground } style={ opacityProps }/>;
}
class Login extends Component {
    render() {
        return (
            <div className="ND" style={{ width: "100%", height: "100%" }}>
                <DarkBackground/>
                <div id="background2"/>
                <div className="lay_auto" style={{ height: "100%" }}>
                    <a href={backServer + "/auth/sparcssso"}><div id="btnLogin">로그인</div></a>
                </div>
            </div>
        );
    }
}

export default Login;