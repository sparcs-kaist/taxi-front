import React, { Component } from 'react';
import { useSpring, animated } from 'react-spring';
import backAddress from '../../serverconf'
import imgBackground from './img_background.jpg';
import svgLogo from './svg_logo.svg';

const DarkBackground = () => {
    const style = {
        position: 'absolute', top: '0px', left: '0px',
        width: '100%', height: '100%',
        objectFit: 'cover'
    }
    const opacityProps = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        config: { duration: 1500 }
    })
    return <animated.img src={ imgBackground } style={{ ...style, ...opacityProps }}/>;
}
class Login extends Component {
    constructor(props){
        super(props);
        this.styleBackgroundBlack = {
            position: 'absolute', top: '0px', left: '0px',
            width: '100%', height: '100%',
            background: 'rgba(0,0,0,0.6)'
        }
        this.styleLogoImg = {
            position: 'absolute', top: '20%', left: 'calc(50% - 40px)',
            width: '80px',
        }
        this.styleLogoTxt = {
            position: 'absolute', top: 'calc(20% + 180px)', left: '0px',
            width: '100%', textAlign: 'center',
            fontSize: '40px', fontWeight: '900', color: 'rgb(127,89,202)'
        }
        this.styleBtnLogin = {
            position: 'absolute', top: '60%', left: '10%', right: '10%',
            height: '44px', borderRadius: '22px',
            lineHeight: '44px', textAlign: 'center',
            fontSize: '17px', color: 'white',
            border: '2px solid white'
        }
    }
    render() {
        return (
            <div className="ND" style={{ width: "100%", height: "100%" }}>
                <DarkBackground/>
                <div style={ this.styleBackgroundBlack }/>
                <div className="lay_auto" style={{ height: "100%" }}>
                    <img src={ svgLogo } alt="" style={ this.styleLogoImg }/>
                    <div style={ this.styleLogoTxt }>Taxi</div>
                    <a href={`${ backAddress }/auth/sparcssso`}>
                        <div style={ this.styleBtnLogin }>로그인</div>
                    </a>
                </div>
            </div>
        );
    }
}

export default Login;