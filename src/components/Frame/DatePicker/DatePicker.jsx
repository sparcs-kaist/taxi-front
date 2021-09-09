import { Component } from 'react';
import { useSpring, animated } from 'react-spring';
import getDateInfo from './getDateInfo';
import svgToday from './svg_today.svg';
import svgLeft from './svg_left.svg';
import svgRight from './svg_right.svg';

const Date = (props) => {
    const style = {
        display: 'inline-block', position: 'relative',
        width: '14.2%', height: '100%', overflow: 'hidden'
    }
    if(!props.date) return <span style={ style }/>;

    let styleBox = {
        width: 'calc(100% - 6px)', height: '100%', marginLeft: '3px',
        borderRadius: '10px', background: '#FAFAFA', position: 'relative'
    }
    let className = '';
    let styleDate = {
        width: '100%', textAlign: 'center', height: '24px', lineHeight: '24px',
        position: 'absolute', top: 'calc(50% - 12px)', left: '0px',
        fontSize: '16px', fontWeight: 300, color: '#C8C8C8'
    }

    if(props.available){
        styleBox.boxShadow = 'inset 1px 1px 2.5px -1px rgba(110, 54, 120, 0.1)';
        styleBox.background = '#FAF8FB';
        className = 'BTNC';
        styleDate.color = '#323232';
    }
    if(props.selected){
        styleBox.background = '#6E3678';
        styleDate.color = 'white';
        styleDate.fontWeight = 500;
    }
 
    return (
        <span style={ style }>
            <div style={ styleBox } className={ className }>
                <div style={ styleDate }>{ props.date }</div>
            </div>
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
            height: '44px', position: 'relative',
        }
        this.styleLayTopBorder = {
            height: '1px',
            backgroundImage: 'linear-gradient(to right, #C8C8C8 50%, rgba(255,255,255,0) 0%)',
            backgroundPosition: 'bottom',
            backgroundSize: '15px 1px',
            backgroundRpeat: 'repeat-x'
        }
        this.styleLayTopImg = {
            position: 'absolute', top: '2px', left: '15px',
            width: '20px', height: '20px'
        }
        this.styleLayTopTxt = {
            position: 'absolute', top: '0px', left: '44px',
            fontSize: '16px', color: 'black', height: '24px', lineHeight: '24px'
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
            height: '40px', position: 'relative', marginBottom: '6px'
        }
    }
    getDateInfo(){
        const info = getDateInfo.get();
        return info;
    }

    resizeEvent(){
        const bodyWidth = document.body.clientWidth;
    }

    render(){
        const dateInfo = this.getDateInfo();

        return (
            <div>
                <div style={ this.styleLayTop }>
                    <img src={ svgToday } style={ this.styleLayTopImg } alt=""/>
                    <div style={ this.styleLayTopTxt }>날짜 : 2021년 7월</div>
                    <img src={ svgLeft } style={ this.styleLayTopLeft } alt=""/>
                    <img src={ svgRight } style={ this.styleLayTopRight } alt=""/>
                </div>
                <div style={ this.styleLayTopBorder }/>
                <div style={ this.styleLayWeek }>
                    { this.week.map((item, index) => {
                        return (
                            <span key={ index } style={{ ...this.styleWeekItem, color: item.color, opacity: 0.6 }}>{ item.text }</span>
                        )
                    }) }
                </div>

                { dateInfo.map((item, index) => {
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
    componentDidMount(){
        this.resizeEvent()
        window.addEventListener('resize', this.resizeEvent);
    }
    componentDidUpdate(){
        this.resizeEvent()
        window.addEventListener('resize', this.resizeEvent);
    }
    componentWillUnmount(){
        window.removeEventListener('resize', this.resizeEvent);
    }
}

export default DatePicker;