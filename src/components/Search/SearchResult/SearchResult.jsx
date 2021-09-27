import { Component } from 'react'
import Title from '../../Frame/Title/Title';

import svgSearch from './svg_search.svg';

export default class SearchResult extends Component {
    constructor(props){
        super(props);
        console.log(props.param);
    }
    render() {
        let urlString = window.location.href
        const parseList = urlString.split("#")
        const roomName = parseList[0].split("/").pop()
        const depPlace = decodeURIComponent(parseList[1])
        const arrPlace = decodeURIComponent(parseList[2])
        // const date = parseList[3] // date 가 아직 미완성
        const depHour = parseList[3]
        const depMin = parseList[4]
    
        return (
            <div>
                <div style={{ height: '20px' }}/>
                <Title img={ svgSearch }>검색 결과</Title>
                <div>{roomName}</div>
                <div>{depPlace}</div>
                <div>{arrPlace}</div>
                <div>{depHour}</div>
                <div>{depMin}</div>
            </div>
        )
    }
}
