import React, { useState, useEffect, useRef } from "react";
import ModalContainer from "./ModalContainer";
import PropTypes from "prop-types";
import axios from "../Tool/axios";
import ModalSubmitButton from "./ModalSubmitButton";
import "./ModifyModal.css";

const modalProfileStyle = {
  width: "200px",
  height: "200px",
  borderRadius: "100px",
  flexGrow: 1,
  overflow: "hidden",
  background: "#EEEEEE",
  margin: "auto",
};

ModifyModal.propTypes = {
  user: PropTypes.any,
  setUser: PropTypes.func,
  setUserModified: PropTypes.func,
  handleModify: PropTypes.func,
  profileImageStyle: PropTypes.any,
  profileImageUrl: PropTypes.string,
};

function ModifyModal(props) {
  const [newNickname, setNewNickname] = useState(props.user.nickname);
  const inputImage = useRef(null);

  const handleChangeNickname = async () => {
    if (newNickname === props.user.nickname) {
      props.handleModify();
      return;
    }

    // 닉네임이 바뀐 경우
    const result = await axios.post(`/users/${props.user.id}/editNickname`, {
      nickname: newNickname,
    });
    if (result) {
      const newUser = props.user;
      newUser.nickname = newNickname;
      props.setUser(newUser);
      alert("닉네임 변경에 성공했습니다.");
      props.handleModify();
    } else {
      alert(
        "닉네임 변경에 실패했습니다. 사용 가능한 닉네임인지 다시 확인해주세요."
      );
    }
  };

  const handleSelectProfileImage = () => {
    inputImage.current.click(); //inputImage.current를 통해 <input type="file" ...> 태그를 제어할 수 있음
  };

  const handleUploadProfileImage = async () => {
    if (!inputImage.current.files[0]) {
      return;
    }
    const formData = new FormData();
    formData.append("profileImage", inputImage.current.files[0]);
    await axios
      .post(`/users/${props.user.id}/uploadProfileImage`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(async (res) => {
        if (res) {
          alert("프로필 사진 변경에 성공했습니다.");
        }
      })
      .catch((err) => {
        alert("프로필 사진 변경에 실패했습니다.");
      });
    props.setUserModified(true);
  };

  return (
    <div className="modifyModal" onClick={props.handleModify}>
      <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
        <ModalContainer>
          <div className="modifyModalL1">
            <div className="modalNickname">{props.user.name}</div>
            <div className="modalProfile">
              <img
                src={`${props.user.profileImageUrl}?${Date.now()}`}
                style={modalProfileStyle}
                alt="프로필 사진"
              />
              <input
                type="file"
                accept="image/*"
                ref={inputImage}
                onChange={handleUploadProfileImage}
                hidden
              ></input>
            </div>
            <div
              className="modalProfileModify"
              onClick={handleSelectProfileImage}
            >
              프로필 사진 변경
            </div>
          </div>
          <hr className="modalHorizon" />
          <div className="modifyModalL2">
            <div className="modalProfileTag">학번</div>
            <div className="modalProfileContent">20190111</div>
          </div>
          <div className="modifyModalL2">
            <div className="modalProfileTag">메일</div>
            <div className="modalProfileContent">nupjuk@kaist.ac.kr</div>
          </div>
          <div className="modifyModalL2">
            <span className="modalProfileTag_nickname">별명</span>
            <input
              className="modalProfileContent_nickname"
              value={newNickname}
              onChange={(e) => {
                setNewNickname(e.target.value);
              }}
            ></input>
          </div>
          <div className="ModalButton">
            <ModalSubmitButton
              className="ModalCancel"
              onClick={props.handleModify}
              background="#EEEEEE"
              backgroundHover="#E5E5E5"
              fontColor="#9B9B9B"
            >
              취소
            </ModalSubmitButton>
            <ModalSubmitButton
              onClick={handleChangeNickname}
              className="ModalSubmit"
              backgroundHover="#4e2b60"
            >
              수정 완료
            </ModalSubmitButton>
          </div>
        </ModalContainer>
      </div>
    </div>
  );
}

export default ModifyModal;
