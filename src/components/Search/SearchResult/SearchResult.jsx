import { Component } from 'react'
import Title from '../../Frame/Title/Title';

import svgSearch from './svg_search.svg';

export default class SearchResult extends Component {
    constructor(props){
        super(props);
        console.log(props.param);
    }
    render() {
        return (
            <div>
                <div style={{ height: '20px' }}/>
                <Title img={ svgSearch }>검색 결과</Title>
                <div style={{ height: '20px' }}/>
                
            </div>
        )
    }
}
