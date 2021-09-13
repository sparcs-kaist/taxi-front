import { useState } from 'react';
import { useSpring, animated } from 'react-spring';

const Button = (props) => {
    const [isHover, setHover] = useState(false);
    const style = {
        minHeight: '50px', textAlign: 'center',
        fontSize: '16px', color: props.fontColor, fontWeight: 300
    }
    const background = useSpring({
        background: isHover ? props.backgroundHover : props.background,
        config: { duration: 100 }
    })
    
    return (
        <div className="lay_auto ND">
            <animated.div onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }
            style={{ ...style, ...background }}>{ props.children }</animated.div>
        </div>
    );
}

Button.defaultProps = {
    background: '#6E3678',
    backgroundHover: 'white',
    fontColor: 'white',
    onClick: () => {}
}
export default Button;