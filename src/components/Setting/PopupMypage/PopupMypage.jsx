import React, { useEffect, useState } from "react";
import { animated, useSpring } from "react-spring";
import PropTypes from "prop-types";

const PopupMypage = (props) => {
    const styleBgd = useSpring({
        position: 'fixed', top: '0px', left: '0px',
        width: '100%', height: '100%', zIndex: 50,
        background: `rgba(0,0,0,0.6)`,
        opacity: props.isOpen ? 1 : 0,
        pointerEvents: props.isOpen ? 'auto' : 'none',
    })
    const style = {
        height: '100%', overflow: 'hidden',
        background: 'white', borderRadius: '15px'
    }
    

    return (
        <animated.div style={ styleBgd }>
            <div style={{ position: 'absolute', top: '0px', left: '0px', width: '100%', height: '100%' }}
            onClick={ props.onClose }/>
            <div style={{ position: 'absolute', top: '120px', bottom: '40px', left: '0px', right: '0px' }}>
                <div style={{ position: 'absolute', top: '0px', left: '0px', width: '100%', height: '100%' }}
                onClick={ props.onClose }/>
                <div style={ style } className="lay_auto">
                    
                </div>
            </div>
        </animated.div>
    )
}
PopupMypage.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func
}

export default PopupMypage;