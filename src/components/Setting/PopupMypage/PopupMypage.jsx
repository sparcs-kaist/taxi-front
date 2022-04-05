import React, { useEffect, useState } from "react";
import { animated, useSpring } from "react-spring";
import PropTypes from "prop-types";
import axios from "../../Tool/axios";
import { backServer } from "../../../serverconf";

import svgClose from './svg_close.svg';

const ProfImg = (props) => {
    const style = {
        margin: 'auto', position: 'relative',
        width: '110px', height: '110px',
        borderRadius: '55px', overflow: 'hidden',
        background: '#EEEEEE'
    };
    const styleImg = {
        position: 'absolute',
        top: '0px', left: '0px',
        width: '100%', height: '100%'
    }

    return (
        <div style={ style }>
            {
                props.id ?
                <img
                    src={ `${ backServer }/static/profile-images/${ props.id }?${ props.token }` }
                    style={ styleImg }
                /> :
                null
            }
        </div>
    )
}
ProfImg.propTypes = {
    id: PropTypes.string,
    token: PropTypes.any,
}

const BtnProfImg = (props) => {
    const style = useSpring({
        fontSize: '10px', color: '#6E3678'
    });

    return (
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <animated.span style={ style } className="BTNC">
                프로필 사진 변경
            </animated.span>
        </div>
    )
}

const PopupMypage = (props) => {
    const styleBgd = useSpring({
        position: 'fixed', top: '0px', left: '0px',
        width: '100%', height: '100%', zIndex: 50,
        background: `rgba(0,0,0,0.6)`,
        opacity: props.isOpen ? 1 : 0,
        pointerEvents: props.isOpen ? 'auto' : 'none',
    })
    const style = {
        overflow: 'auto', maxHeight: '100%',
        background: 'white', borderRadius: '15px'
    }
    const styleClose = {
        position: 'absolute', top: '10px', right: '10px',
        width: '24px', height: '24px'
    }
    const styleName = {
        paddingTop: '32px', textAlign: 'center',
        fontSize: '20px', fontWeight: 'bold'
    }
    const styleLine = {
        height: "1px", marginLeft: "15px", marginRight: "15px", marginTop: "15px",
        backgroundImage: "linear-gradient(to right, #C8C8C8 50%, rgba(255,255,255,0) 0%)",
        backgroundPosition: "bottom",
        backgroundSize: "15px 1px",
        backgroundRpeat: "repeat-x",
    }

    const styleBtn1 = useSpring({
        float: 'right',
        height: '36px', width: '77px',
        lineHeight: '36px', textAlign: 'center',
        borderRadius: '8px',
        background: '#6E3678',
        fontSize: '15px', color: 'white'
    })
    const styleBtn2 = useSpring({
        float: 'right', marginRight: '10px',
        height: '36px', width: '77px',
        lineHeight: '36px', textAlign: 'center',
        borderRadius: '8px',
        background: '#EEEEEE',
        fontSize: '15px', color: '#888888'
    })

    return (
        <animated.div style={ styleBgd }>
            <div style={{ position: 'absolute', top: '0px', left: '0px', width: '100%', height: '100%' }}
            onClick={ props.onClose }/>
            <div style={{ position: 'absolute', top: '120px', bottom: '40px', left: '0px', right: '0px' }}>
                <div style={{ position: 'absolute', top: '0px', left: '0px', width: '100%', height: '100%' }}
                onClick={ props.onClose }/>
                <div style={ style } className="lay_auto">
                    <img src={ svgClose } alt="close"
                    style={ styleClose } className="BTNC"
                    onClick={ props.onClose }/>
                    <div style={ styleName }>{ props.userInfo.name ? props.userInfo.name : '' }</div>
                    <div style={{ height: '15px' }}/>
                    <ProfImg
                        id={ props.userInfo.id ? props.userInfo.id : '' }
                        token={ props.profToken }
                    />
                    <BtnProfImg/>
                    <div style={ styleLine }/>

                    <div style={{ position: 'relative',
                    paddingLeft: '15px', paddingRight: '15px', marginBottom: '15px', height: '36px' }}>
                        <animated.div style={ styleBtn1 }
                        className="BTNC ND">동의</animated.div>
                        <animated.div style={ styleBtn2 }
                        className="BTNC ND">취소</animated.div>
                    </div>
                </div>
            </div>
        </animated.div>
    )
}
PopupMypage.propTypes = {
    userInfo: PropTypes.any,
    userInfoD: PropTypes.any,
    profToken: PropTypes.any,
    isOpen: PropTypes.bool,
    onClose: PropTypes.func
}

export default PopupMypage;