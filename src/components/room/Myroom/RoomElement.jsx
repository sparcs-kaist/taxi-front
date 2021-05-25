import { useState } from 'react';
import { useSpring, animated } from 'react-spring';

const lay1size = 54;
const Lay1Container = (props) => {
    const cstyle = { position: 'absolute', overflow: 'hidden', background: 'rgb(230,230,230)', border: '1px solid rgb(200,200,200)' };

    if(props.len===1) {
        const ccstyle = {
            width: `${ lay1size }px`, height: `${ lay1size }px`, borderRadius: `${ lay1size/2 }px`
        }
        return (
            <>
                <div style={{ ...cstyle, ...ccstyle, top: '0px', left: '0px' }}></div>
            </>
        )
    }
    else if(props.len===2) {
        const ccstyle = {
            width: `${ lay1size*0.65 }px`, height: `${ lay1size*0.65 }px`, borderRadius: `${ lay1size/2 }px`
        }
        return (
            <>
                <div style={{ ...cstyle, ...ccstyle, bottom: '0px', right: '0px' }}></div>
                <div style={{ ...cstyle, ...ccstyle, top: '0px', left: '0px' }}></div>
            </>
        )
    }
    else if(props.len===3) {
        const ccstyle = {
            width: `${ lay1size*0.55 }px`, height: `${ lay1size*0.55 }px`, borderRadius: `${ lay1size/2 }px`
        }
        return (
            <>
                <div style={{ ...cstyle, ...ccstyle, bottom: '0px', right: '0px' }}></div>
                <div style={{ ...cstyle, ...ccstyle, bottom: '0px', left: '0px' }}></div>
                <div style={{ ...cstyle, ...ccstyle, top: '1px', left: `calc(50% - ${lay1size*0.55*0.5}px)` }}></div>
            </>
        )
    }
    else if(props.len===4) {
        const ccstyle = {
            width: `${ lay1size*0.55 }px`, height: `${ lay1size*0.55 }px`, borderRadius: `${ lay1size/2 }px`
        }
        return (
            <>
                <div style={{ ...cstyle, ...ccstyle, bottom: '0px', left: '0px' }}></div>
                <div style={{ ...cstyle, ...ccstyle, bottom: '0px', right: '0px' }}></div>
                <div style={{ ...cstyle, ...ccstyle, top: '0px', right: '0px' }}></div>
                <div style={{ ...cstyle, ...ccstyle, top: '0px', left: '0px' }}></div>
            </>
        )
    }
    else if(props.len===5) {
        const ccstyle = {
            width: `${ lay1size*0.5 }px`, height: `${ lay1size*0.5 }px`, borderRadius: `${ lay1size/2 }px`
        }
        return (
            <>
                <div style={{ ...cstyle, ...ccstyle, top: '10px', left: '0px' }}></div>
                <div style={{ ...cstyle, ...ccstyle, bottom: '0px', left: '3px' }}></div>
                <div style={{ ...cstyle, ...ccstyle, bottom: '0px', right: '3px' }}></div>
                <div style={{ ...cstyle, ...ccstyle, top: '10px', right: '0px' }}></div>
                <div style={{ ...cstyle, ...ccstyle, top: '0px', left: `calc(50% - ${lay1size*0.5*0.5}px)` }}></div>
            </>
        )
    }
    else return <></>;
}
const RoomElement = (props) => {
    const styleBody = {
        position: 'relative', width: '100%', height: '70px', overflow: 'hidden', borderRadius: '12px'
    }
    const styleLay1 = {
        position: 'absolute', top: '8px', left: '10px',
        width: `${ lay1size }px`, height: `${ lay1size }px`, overflow: 'hidden'
    }
    const styleLay2 = {
        position: 'absolute', top: '12px', left: `${ lay1size+25 }px`, right: '10px',
        fontSize: '16px', fontWeight: '300', color: 'black'
    }
    const styleLay3 = {
        position: 'absolute', bottom: '12px', left: `${ lay1size+15 }px`, right: '10px',
        textAlign: 'right',
        fontSize: '12px', fontWeight: '300', color: 'rgb(150,150,150)'
    }

    const [isHover, setHover] = useState(false);
    const background = useSpring({
        background: isHover ? 'rgba(245,245,245,1)' : 'rgba(245,245,245,0)',
        config: { duration: 100 }
    }).background;

    return (
        <animated.div style={{ ...styleBody, background: background }}
        onMouseEnter={ () => setHover(true) } onMouseLeave={ () => setHover(false) }>
            <div style={ styleLay1 }><Lay1Container len={ props.partLen } srcs={ props.partImgs }/></div>
            <div style={ styleLay2 }>{ props.title }</div>
            <div style={ styleLay3 }>{ props.subtitle }</div>
        </animated.div>
    )
}

export default RoomElement;