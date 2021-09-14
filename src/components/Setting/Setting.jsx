import React, { useEffect, useState } from 'react';
import WhiteContainer from '../Frame/WhiteContainer/WhiteContainer.jsx';
import Title from '../Frame/Title/Title';
import svgMyPage from './svg_myPage.svg';
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
    const modifyClick = () => {
        alert("수정하기 창 대신 팝업")
    };
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
                        <div style={{fontSize: '16px', fontWeight: 'bold'}}>내 정보</div>
                        <div style={{color: '#6E3678', cursor: 'pointer'}} onClick={modifyClick}>수정하기</div>
                    </div>
                    <div className="flexLine2">
                        <div className="flexLine1">
                           <div className="profileTag">학번</div>
                            <div>20191111</div> 
                        </div>
                        <div className="flexLine1">
                            <div className="profileTag">메일</div>
                            <div>emailname@kaist.ac.kr</div>
                        </div>
                        
                    </div>
                    <div className="flexLine2">
                        <div className="flexLine1">
                            <div className="profileTag">별명</div>
                            <div>어은동핵주먹</div>
                        </div>
                    </div>
                </div>
            </WhiteContainer>
            <WhiteContainer>
                각종 메뉴 들어올공간
            </WhiteContainer>
        </div>
    );
};
// class Setting extends Component {
//     constructor(props){
//         super(props);
//         this.styleBox = { background: 'white' }
//         this.styleProfBorder = {
//             position: 'absolute', left: '0px', top: '0px',
//             width: '60px', height: '60px', borderRadius: '30px',
//             overflow: 'hidden', border: '1px solid gray', background: 'white'
//         }
//         this.styleProf = {
//             width: '100%', height: '100%'
//         }
//     }
//     render() {
//         return (
//             <>
//                 <div style={ this.styleBox }>
//                     <div className="lay_auto">
//                         <div style={{ padding: '15px' }}>
//                             <div style={{ position: 'relative', height: '60px' }}>
//                                 <div style={ this.styleProfBorder }>
//                                     <img style={ this.styleProf }/>
//                                 </div>
//                                 <div>김건</div>
//                                 <div>20190052</div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </>
//         );
//     }
// }

export default Setting;