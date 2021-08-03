import { Component } from 'react';
import { useSpring, animated } from 'react-spring';
import svgToday from './svg_today.svg';
import svgLeft from './svg_left.svg';
import svgRight from './svg_right.svg';

const Date = (props) => {
    const style = {
        display: 'inline-block', position: 'relative',
        width: '14.2%', height: '36px', overflow: 'hidden'
    }
    let container = '';

    if(props.date){
        const styleBorder = {
            width: '34px', height: '34px', borderRadius: '17px', margin: 'auto',
            fontSize: '16px', fontWeight: 500, textAlign: 'center', lineHeight: '31px'
        }
        const styleToday = {
            position: 'absolute', top: '24px', left: '0px',
            width: '100%', textAlign: 'center',
            fontSize: '9px', color: 'rgb(102,61,113)'
        }

        let color = '#323232';
        console.log(props.key)
        if(props.index === 0 || props.index === 6) color = '#DD616E';
        if(props.available === 'today') color = 'rgb(102,61,113)';
        if(props.selected) color = '#FFFFFF';

        let backgroundOpcity = 0;
        if(props.selected) backgroundOpcity = 1;
        const styleBackground = {
            background: `rgba(102,61,113,${ backgroundOpcity })`,
            border: `3px solid rgba(225,225,225,${ backgroundOpcity/2 })`
        }
        
        container = (
            <>
                <animated.div style={{ ...styleBorder, ...styleBackground, color: color }}>{ props.date }</animated.div>
                <div style={{ ...styleToday, opacity: (props.selected || props.available!=='today' ? 0 : 1) }}>오늘</div>
            </>
        )
    }
    return (
        <span style={ style }>
            { container }
        </span>
    )
}
class DatePicker extends Component {
    constructor(props){
        super(props);

        this.week = [
            { color: '#DD616E', text: '일' },
            { color: '#323232', text: '월' },
            { color: '#323232', text: '화' },
            { color: '#323232', text: '수' },
            { color: '#323232', text: '목' },
            { color: '#323232', text: '금' },
            { color: '#DD616E', text: '토' },
        ]

        this.styleLayTop = {
            height: '31px', position: 'relative'
        }
        this.styleLayTopImg = {
            position: 'absolute', top: '6px', left: '0px',
            width: '19px', height: '19px'
        }
        this.styleLayTopTxt = {
            position: 'absolute', top: '0px', left: '26px',
            fontSize: '16px', color: 'black', height: '31px', lineHeight: '31px'
        }
        this.styleLayTopLeft = {
            position: 'absolute', top: '0px', right: '40px',
            width: '31px', height: '31px'
        }
        this.styleLayTopRight = {
            position: 'absolute', top: '0px', right: '0px',
            width: '31px', height: '31px'
        }
        this.styleLayWeek = {
            height: '19px', position: 'relative', marginTop: '10px', marginBottom: '10px'
        }
        this.styleWeekItem = {
            display: 'inline-block', width: '14.2%',
            fontSize: '13px', textAlign: 'center'
        }
        this.styleLayOneWeek = {
            height: '36px', position: 'relative'
        }
    }
    getDateInfo(){
        const info = [
            [
                { date: null },
                { date: null },
                { date: null },
                { date: null },
                { date: 1, available: null },
                { date: 2, available: null },
                { date: 3, available: null },
            ],
            [
                { date: 4, available: null },
                { date: 5, available: null },
                { date: 6, available: null },
                { date: 7, available: null },
                { date: 8, available: null },
                { date: 9, available: null },
                { date: 10, available: null },
            ],
            [
                { date: 11, available: null },
                { date: 12, available: null },
                { date: 13, available: null },
                { date: 14, available: 'today' },
                { date: 15, available: true },
                { date: 16, available: true },
                { date: 17, available: true },
            ],
            [
                { date: 18, available: true },
                { date: 19, available: true },
                { date: 20, available: true },
                { date: 21, available: true },
                { date: 22, available: true },
                { date: 23, available: true },
                { date: 24, available: true },
            ],
            [
                { date: 25, available: true },
                { date: 26, available: true },
                { date: 27, available: true },
                { date: 28, available: true },
                { date: 29, available: true },
                { date: 30, available: true },
                { date: 31, available: true },
            ],
        ]
        return info;
    }
    render(){
        const dataInfo = this.getDateInfo();

        return (
            <div>
                <div style={ this.styleLayTop }>
                    <img src={ svgToday } style={ this.styleLayTopImg } alt=""/>
                    <div style={ this.styleLayTopTxt }>날짜 : 2021년 7월</div>
                    <img src={ svgLeft } style={ this.styleLayTopLeft } alt=""/>
                    <img src={ svgRight } style={ this.styleLayTopRight } alt=""/>
                </div>
                <div style={ this.styleLayWeek }>
                    { this.week.map((item, index) => {
                        return (
                            <span key={ index } style={{ ...this.styleWeekItem, color: item.color, opacity: 0.6 }}>{ item.text }</span>
                        )
                    }) }
                </div>
                { dataInfo.map((item, index) => {
                    return (
                        <div key={ index } style={ this.styleLayOneWeek }>
                            { item.map((item, index) => {
                                let selected = false;
                                if(item.date ===20) selected = true;
                                return <Date key={ index } index={ index } date={ item.date } available={ item.available } selected={ selected }/>
                            }) }
                        </div>
                    )
                }) }
            </div>
        )
    }
}

export default DatePicker;