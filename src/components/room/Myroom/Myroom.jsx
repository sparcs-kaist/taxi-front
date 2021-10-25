import { Component } from 'react';
import WhiteContainer from '../../Frame/WhiteContainer/WhiteContainer';
import WhiteContainerMargin from '../../Frame/WhiteContainer/WhiteContainerMargin';
import RoomElement from './RoomElement';
import Footer from '../../Frame/Footer';
import Title from '../../Frame/Title/Title';
import RoomEntry from '../../Frame/RoomEntry/RoomEntry';

import svgSearch from '../../Search/svg_search.svg';

class Myroom extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="myroom">
                <div style={{ height: '20px' }}/>
                <Title img={ svgSearch }>내 방 리스트</Title>
                <div style={{ height: '20px' }}/>


                <WhiteContainer title="탑승 예정 택시" style={{ padding: }}>
                    <RoomEntry title="서울 같이 가요~" participants="2" head="김넙죽" start="택시승강장"
                    end="시외버스터미널" date="2021년 7월 20일 09시 00분"/>
                </WhiteContainer>
                <WhiteContainer title="탑승 예정 택시">
                    <RoomElement title="12월 8일 오후 12시 택시팟 찾아요~" subtitle="대전역 > 카이스트, 오후 12시 30분 출발"
                    partLen={ 1 } partImgs={ [] }/>
                </WhiteContainer>
                <WhiteContainer title="탑승 예정 택시">
                    <RoomElement title="12월 8일 오후 12시 택시팟 찾아요~" subtitle="대전역 > 카이스트, 오후 12시 30분 출발"
                    partLen={ 2 } partImgs={ [] }/>
                </WhiteContainer>
                <WhiteContainer title="탑승 예정 택시">
                    <RoomElement title="12월 8일 오후 12시 택시팟 찾아요~" subtitle="대전역 > 카이스트, 오후 12시 30분 출발"
                    partLen={ 3 } partImgs={ [] }/>
                </WhiteContainer>
                <WhiteContainer title="탑승 예정 택시">
                    <RoomElement title="12월 8일 오후 12시 택시팟 찾아요~" subtitle="대전역 > 카이스트, 오후 12시 30분 출발"
                    partLen={ 4 } partImgs={ [] }/>
                    <RoomElement title="술박스" subtitle="카이스트 > 터미널, 오후 4시 0분 출발"
                    partLen={ 5 } partImgs={ [] }/>
                </WhiteContainer>
                <WhiteContainerMargin/>
                <WhiteContainer title="과거 탑승 택시">
                    <RoomElement title="12월 8일 오후 12시 택시팟 찾아요~" subtitle="대전역 > 카이스트, 오후 12시 30분 출발"
                    partLen={ 1 } partImgs={ [] }/>
                    <RoomElement title="술박스" subtitle="카이스트 > 터미널, 오후 4시 0분 출발"
                    partLen={ 3 } partImgs={ [] }/>
                </WhiteContainer>
                <Footer/>
            </div>
        );
    }
}

export default Myroom;