import React, { useEffect, useState } from 'react';
import WhiteContainer from '../Frame/WhiteContainer/WhiteContainer.jsx';
import Title from '../Frame/Title/Title';
import backAddress from '../../serverconf'

import svgMyPage from './svg_myPage.svg';
import svgDocument from './svg_document.svg';
import svgSparcs from './svg_sparcs.svg';
import svgLogout from './svg_logout.svg';
import svgHistory from './svg_history.svg';
import svgPeople from './svg_people.svg';
import "./Setting.css"

const profileImage = {
    width: '60px',
    height: '60px',
    borderRadius: '30px',
    flexGrow: 1,
    overflow: 'hidden', background: '#EEEEEE',
    margin: 'auto'
}

function Setting() {
    // const [example, setExample] = useState(false);
    const HandleModify = () => {
        alert("수정하기 창 대신 팝업")
    };
    const logoutHandler = () => {
        alert("로그아웃 됨")
    };

    const MyPageMenu = (props) => {
        return(
            <div className="myPageMenu" onClick={props.onClick}>
                <img src={ props.img } style={{marginRight: '12px', width: '20px', height: '20px'}}/>
                <div style={{fontWeight: '400'}}>{props.children}</div>
            </div>
        )
    }
    // useEffect(() => {
    //     ~~~
    // }, [])
    return (
        <div>
            <div style={{ height: '20px' }}/>
                <Title img={ svgMyPage }>내 페이지</Title>
            <div style={{ height: '20px' }}/>
            {/* userInfo Box */}
            <WhiteContainer>
                <div className="userInfoBox">
                    <div className="flexLine1">
                        <div className="profileImage">
                            <img style={profileImage}/>
                        </div>
                        <div className="nickname">
                            김 태 우
                        </div>
                    </div>
                    <div className="flexLine2">
                        <div style={{fontSize: '16px', fontWeight: '700px'}}>내 정보</div>
                        <div style={{color: '#6E3678', cursor: 'pointer', fontWeight: '400px'}} onClick={HandleModify}>수정하기</div>
                    </div>
                    <div className="flexLine2">
                        <div className="flexLine1">
                           <div className="profileTag">학번</div>
                            <div style={{fontWeight: '400'}}>20191111</div> 
                        </div>
                        <div className="flexLine1">
                            <div className="profileTag">메일</div>
                            <div style={{fontWeight: '400'}}>emailname@kaist.ac.kr</div>
                        </div>
                        
                    </div>
                    <div className="flexLine2">
                        <div className="flexLine1">
                            <div className="profileTag">별명</div>
                            <div style={{fontWeight: '400'}}>어은동핵주먹</div>
                        </div>
                    </div>
                </div>
            </WhiteContainer>
            <WhiteContainer>
                <div>
                    <MyPageMenu img={ svgHistory }>과거 기록</MyPageMenu>
                    <MyPageMenu img={ svgDocument }>사용 약관 및 개인정보 보호 규칙</MyPageMenu>
                    <MyPageMenu img={ svgSparcs }>만든 사람들</MyPageMenu>
                    <MyPageMenu img={ svgLogout } onClick={logoutHandler}>로그아웃</MyPageMenu>
                </div>
            </WhiteContainer>
        </div>
    );
};

export default Setting;