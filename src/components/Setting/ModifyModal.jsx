import React, { useEffect, useState } from "react";
import WhiteContainer from "../Frame/WhiteContainer/WhiteContainer.jsx";
import PropTypes from "prop-types";
import "./Setting.css";

ModifyModal.propTypes = {
  handleModify: PropTypes.function,
  profileImage: PropTypes.any,
};

function ModifyModal(props) {
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
            <img style={props.profileImage} />
            <div style={{ textAlign: "center", color: "#6E3678" }}>
              프로필 사진 변경
            </div>
          </div>
          <div>
            <span>별명</span>
            <input></input>
          </div>
          <button>수정완료</button>
        </WhiteContainer>
      </div>
    </div>
  );
}

export default ModifyModal;
