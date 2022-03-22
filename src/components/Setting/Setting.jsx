import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import WhiteContainer from "../Frame/WhiteContainer/WhiteContainer.jsx";
import Title from "../Frame/Title/Title";
import ModifyModal from "./ModifyModal.jsx";
import axios from "../Tool/axios";
import { backServer } from "../../serverconf";
import PropTypes from "prop-types";

import svgMyPage from "./svg_myPage.svg";
import svgDocument from "./svg_document.svg";
import svgSparcs from "./svg_sparcs.svg";
import svgLogout from "./svg_logout.svg";
import svgHistory from "./svg_history.svg";
import svgPeople from "./svg_people.svg";
import TOSModal from "../TOS/TOSModal.jsx";
import "./Setting.css";

const profileImageStyle = {
  width: "50px",
  height: "50px",
  borderRadius: "25px",
  flexGrow: 1,
  overflow: "hidden",
  background: "#EEEEEE",
  margin: "auto",
};

function Setting() {
  const [user, setUser] = useState({
    name: "",
    id: "",
    nickname: "",
    profileImageUrl: "",
  });
  const [userModified, setUserModified] = useState(false);
  const [modifyModal, setModifyModal] = useState(false);
  const history = useHistory();

  const [isTosModalOpen, setIsTosModalOpen] = useState(false);

  const handleModify = () => {
    setModifyModal(!modifyModal);
  };

  const getUserInfo = async () => {
    let newUser = user;
    // id, name, 프로필 사진의 url을 아직 불러오지 않은 경우에만 불러옴니다.
    if (!user.id) {
      const userInfo = await axios.get("/json/logininfo");
      if (userInfo.data) {
        newUser = userInfo.data;
        newUser.profileImageUrl = `${backServer}/static/profile-images/${newUser.id}`;
      }
    }
    // 닉네임을 불러옵니다.
    const detailedUserInfo = await axios.get("/json/logininfo/detail");
    if (detailedUserInfo.data) {
      newUser.nickname = detailedUserInfo.data.nickname;
    }
    setUser(newUser);
  };

  const handleLogout = async () => {
    const response = await axios.get("/auth/logout");
    if (response.status === 200) {
      alert("로그아웃 되었습니다.");
      history.push("/login");
    } else {
      alert("로그아웃에 실패했습니다.");
    }
  };

  const MyPageMenu = (props) => {
    return (
      <div className="myPageMenu" onClick={props.onClick}>
        <img
          src={props.img}
          style={{ marginRight: "8px", width: "16px", height: "16px" }}
          alt="마이페이지 메뉴 아이콘"
        />
        <div style={{ fontWeight: "400", fontSize: "14px", lineHeight: "16px" }}>{props.children}</div>
      </div>
    );
  };

  MyPageMenu.propTypes = {
    onClick: PropTypes.func,
    img: PropTypes.any,
    children: PropTypes.any,
  };

  useEffect(async () => {
    await getUserInfo();
  }, []);

  useEffect(async () => {
    if (userModified) {
      await getUserInfo();
      setUserModified(false);
    }
  }, [userModified]);

  return (
    <div>
      {modifyModal && (
        <ModifyModal
          user={user}
          setUser={setUser}
          setUserModified={setUserModified}
          handleModify={handleModify}
          profileImageStyle={profileImageStyle}
          profileImageUrl={user.profileImageUrl}
        />
      )}
      <div style={{ height: "20px" }} />
      <Title img={svgMyPage}>내 페이지</Title>
      <div style={{ height: "20px" }} />
      {/* userInfo Box */}
      <WhiteContainer>
        <div className="userInfoBox">
          <div className="flexLine1">
            <div className="profileImage">
              <img
                src={`${user.profileImageUrl}?${Date.now()}`} //이미지가 바뀌었을 때 다시 렌더링하도록 해시를 추가
                style={profileImageStyle}
                alt="프로필 사진"
              />
            </div>
            <div className="nickname">{user.name}</div>
          </div>
          <div className="flexLine2" style={{ paddingTop: "18px" }}>
            <div style={{ fontSize: "14px", lineHeight: "16px", fontWeight: "700" }}>내 정보</div>
            <div
              style={{
                fontSize: "14px",
                lineHeight: "16px",
                color: "#6E3678",
                cursor: "pointer",
                fontWeight: "400",
              }}
              onClick={handleModify}
            >
              수정하기
            </div>
          </div>
          <div className="flexLine2">
            <div className="flexLine1">
              <div className="profileTag">학번</div>
              <div style={{ fontWeight: "400" }}>20191111</div>
            </div>
          </div>
          <div className="flexLine2">
            <div className="flexLine1">
              <div className="profileTag">메일</div>
              <div style={{ fontWeight: "400" }}>emailname@kaist.ac.kr</div>
            </div>
          </div>
          <div className="flexLine2">
            <div className="flexLine1">
              <div className="profileTag">별명</div>
              <div style={{ fontWeight: "400" }}>{user.nickname}</div>
            </div>
          </div>
        </div>
      </WhiteContainer>
      <WhiteContainer>
        <div className="myPageMenuList">
          <MyPageMenu img={svgDocument} onClick={() => setIsTosModalOpen(true)}>
            사용 약관 및 개인정보 보호 규칙
          </MyPageMenu>
          <MyPageMenu img={svgSparcs}>만든 사람들</MyPageMenu>
          <MyPageMenu img={svgLogout} onClick={handleLogout}>
            로그아웃
          </MyPageMenu>
        </div>
      </WhiteContainer>
      <TOSModal
        open={isTosModalOpen}
        onClose={() => {
          setIsTosModalOpen(false);
        }}
      />
    </div>
  );
}

export default Setting;
