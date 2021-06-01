import { Component, useState } from 'react';
import Picker from 'react-mobile-picker-scroll';

const PopupPicker = (props) => {
    const [valueGroup, setvalueGroup] = useState({ item: props.options[0] });
    const optionGroup = { item: props.options };
    const styleBackground = {
        position: 'fixed', top: '0px', left: '0px', width: '100%', height: '100%', zIndex: '90',
        background: 'rgba(0,0,0,0.5)', WebkitBackdropFilter: `blur(5px)`, backdropFilter: `blur(5px)`
    }
    const styleBox = {
        background: 'white', borderRadius: '20px'
    }
    const styleTitle = {
        width: '100%', textAlign: 'center', paddingTop: '20px',
        fontSize: '18px', fontWeight: '900'
    }
    const styleBtn1 = {
        position: 'absolute', top: '0px', left: '15px', width: 'calc(50% - 22px)', height: '40px', borderRadius: '20px',
        textAlign: 'center', lineHeight: '40px', color: 'white',
        background: 'rgb(140,140,140)'
    }
    const styleBtn2 = {
        position: 'absolute', top: '0px', right: '15px', width: 'calc(50% - 22px)', height: '40px', borderRadius: '20px',
        textAlign: 'center', lineHeight: '40px', color: 'white',
        background: 'rgb(127,89,202)'
    }

    const onChange = (name, value) => {
        setvalueGroup({ ...valueGroup, [name]: value });
    }

    return (
        <div style={ styleBackground }>
            <div className="lay_auto" style={{ padding: '15px' }}>
                <div style={{ height: '100px' }}/>
                <div style={ styleBox }>
                    <div style={ styleTitle }>{ props.title }</div>
                    <Picker valueGroups={ valueGroup } optionGroups={ optionGroup } onChange={ (n, v) => onChange(n, v) }/>
                    <div style={{ position: 'relative', height: '55px' }}>
                        <div style={{ ...styleBtn1 }} className="BTNC">취소</div>
                        <div style={{ ...styleBtn2 }} className="BTNC">선택</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

PopupPicker.defaultProps = {
    title: 'Title', options: ['option1', 'option2', 'option3']
}

export default PopupPicker;