import React, { useState, useEffect, useRef } from "react";
import WhiteContainer from "../Frame/WhiteContainer/WhiteContainer.jsx";
import PropTypes from "prop-types";
import axios from "../Tool/axios";

import "./Setting.css";

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
  const [profileImageUrl, setProfileImageUrl] = useState(props.profileImageUrl);
  const inputImage = useRef(null);

  const handleChangeNickname = (newNickname) => {
    axios
      .post(`/users/${props.user.id}/editNickname`, { nickname: newNickname })
      .then(async (res) => {
        if (res) {
          const newUser = props.user;
          newUser.nickname = newNickname;
          await props.setUser(newUser);
          alert("닉네임 변경에 성공했습니다.");
        } else {
          alert("닉네임 변경에 실패했습니다.");
        }
        props.handleModify();
      })
      .catch(() => {
        alert(
          "닉네임 변경에 실패했습니다. 사용 가능한 닉네임인지 다시 확인해주세요."
        );
      });
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
        <WhiteContainer>
          <div className="modifyModalL1">
            <span onClick={props.handleModify} style={{ cursor: "pointer" }}>
              X
            </span>
          </div>
          <div className="modifyModalL2">
            <img
              src={`${props.user.profileImageUrl}?${Date.now()}`}
              style={props.profileImageStyle}
              alt="프로필 사진"
            />
            <input
              type="file"
              accept="image/*"
              ref={inputImage}
              onChange={handleUploadProfileImage}
              hidden
            ></input>
            <div
              style={{ textAlign: "center", color: "#6E3678" }}
              onClick={handleSelectProfileImage}
            >
              프로필 사진 변경
            </div>
          </div>
          <div>
            <span>별명</span>
            <input
              value={newNickname}
              onChange={(e) => {
                setNewNickname(e.target.value);
              }}
            ></input>
          </div>
          <button
            onClick={() => {
              handleChangeNickname(newNickname);
            }}
          >
            수정완료
          </button>
        </WhiteContainer>
      </div>
    </div>
  );
}

export default ModifyModal;
