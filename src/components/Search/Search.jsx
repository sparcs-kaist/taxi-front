import React, { Component } from 'react';

class Search extends Component {
    constructor(props){
        super(props);

        this.styleBox = { background: 'white' }
        this.styleTitle = { fontSize: '22px', fontWeight: 900 }
        this.styleStation = { position: 'absolute' }
        this.styleStationL = { left: '0px', right: 'calc(50% + 10px)' }
        this.styleStationR = { left: 'calc(50% + 10px)', right: '0px' }
        this.styleSearchBtn = {
            height: '40px', borderRadius: '20px',
            background: 'rgb(127,89,202)', color: 'white',
            lineHeight: '40px', textAlign: 'center'
        }
    }
    render() {
        return (
            <>
                <div style={ this.styleBox }>
                    <div className="lay_auto">
                        <div style={{ padding: '15px' }}>
                            <div style={ this.styleTitle }>방 검색</div>
                            <div style={{ position: 'relative', height: '100px' }}>
                                <div style={{ ...this.styleStation, ...this.styleStationL }}>
                                    <div>출발</div>
                                    <div>카이스트택시승강장</div>
                                </div>
                                <div>
                                </div>
                                <div style={{ ...this.styleStation, ...this.styleStationR }}>
                                    <div>도착</div>
                                    <div>대전역</div>
                                </div>
                            </div>
                            <div style={ this.styleSearchBtn }>검색하기</div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Search;