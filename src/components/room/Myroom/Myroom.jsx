import React, { Component } from 'react';
import WhiteContainer from '../../Frame/WhiteContainer/WhiteContainer';
import RoomElement from './RoomElement';

class Myroom extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <>
                <WhiteContainer title="탑승 예정 택시">
                    <div>Hello world</div>
                </WhiteContainer>
            </>
        );
    }
}

export default Myroom;