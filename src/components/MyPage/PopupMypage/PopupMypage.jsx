import React, { useEffect, useState, useRef } from "react";
import { animated, useSpring } from "react-spring";
import RLayout from "../../Frame/ReactiveLayout/RLayout";
import PropTypes from "prop-types";
import axios from "../../Tool/axios";
import { backServer } from "../../../serverconf";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const ProfImg = (props) => {
  const style = {
    margin: "auto",
    position: "relative",
    width: "110px",
    height: "110px",
    borderRadius: "55px",
    overflow: "hidden",
    background: "#EEEEEE",
  };
  const styleImg = {
    position: "absolute",
    top: "0px",
    left: "0px",
    width: "100%",
    height: "100%",
  };

  return (
    <div style={style}>
      {props.id ? (
        <img
          src={`${backServer}/static/profile-images/${props.id}?${props.token}`}
          style={styleImg}
        />
      ) : null}
    </div>
  );
};
ProfImg.propTypes = {
  id: PropTypes.string,
  token: PropTypes.any,
};

const BtnProfImg = (props) => {
  const inputImage = useRef(null);

  const handleUploadProfileImage = async () => {
    try {
      if (!inputImage.current.files[0]) {
        return;
      }
      const formData = new FormData();
      formData.append("profileImage", inputImage.current.files[0]);

      const result = await axios.post(`/users/uploadProfileImage`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (result.status !== 200) {
        alert("프로필 사진 변경에 실패했습니다.");
        return;
      }
      props.onUpdate();
      //props.onClose();
    } catch (e) {
      alert("프로필 사진 변경에 실패했습니다.");
    }
  };
  const style = useSpring({
    fontSize: "10px",
    color: "#6E3678",
  });

  return (
    <div style={{ textAlign: "center", marginTop: "10px" }}>
      <input
        type="file"
        accept="image/*"
        hidden
        onChange={handleUploadProfileImage}
        ref={inputImage}
      ></input>
      <animated.span
        style={style}
        className="BTNC"
        onClick={() => inputImage.current.click()}
      >
        프로필 사진 변경
      </animated.span>
    </div>
  );
};
BtnProfImg.propTypes = {
  onUpdate: PropTypes.func,
  onClose: PropTypes.func,
};

const PopupMypage = (props) => {
  const regexNickname = new RegExp("^[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9-_ ]{3,25}$");
  const [nickName, setNickName] = useState("");
  const [nickNameReal, setNickNameReal] = useState("");
  useEffect(() => {
    if (props.userInfoD.nickname) {
      setNickName(props.userInfoD.nickname);
      setNickNameReal(props.userInfoD.nickname);
    }
  }, [props.userInfoD]);

  const onClose = () => {
    setNickName(nickNameReal);
    props.onClose();
  };
  const onClickEditNickName = async () => {
    const result = await axios.post(`/users/editNickname`, {
      nickname: nickName,
    });
    if (result.status !== 200) {
      alert("닉네임 변경에 실패하였습니다.");
      return;
    }
    props.onUpdate();
    props.onClose();
  };

  const styleBgd = useSpring({
    position: "fixed",
    top: "0px",
    left: "0px",
    width: "100%",
    height: "100%",
    zIndex: 50,
    background: `rgba(0,0,0,0.6)`,
    opacity: props.isOpen ? 1 : 0,
    pointerEvents: props.isOpen ? "auto" : "none",
  });
  const style = {
    overflow: "auto",
    position: "relative",
    maxHeight: "100%",
    background: "white",
    borderRadius: "15px",
  };
  const styleClose = {
    position: "absolute",
    top: "10px",
    right: "10px",
    width: "24px",
    height: "24px",
  };
  const styleName = {
    paddingTop: "32px",
    textAlign: "center",
    fontSize: "20px",
    fontWeight: "bold",
  };
  const styleLine = {
    height: "1px",
    marginLeft: "15px",
    marginRight: "15px",
    marginTop: "15px",
    backgroundImage:
      "linear-gradient(to right, #C8C8C8 50%, rgba(255,255,255,0) 0%)",
    backgroundPosition: "bottom",
    backgroundSize: "15px 1px",
    backgroundRpeat: "repeat-x",
  };

  const styleLay1 = {
    position: "relative",
    display: "flex",
    paddingLeft: "30px",
    paddingRight: "30px",
    marginBottom: "5px",
  };
  const styleLay1Left = {
    fontSize: "14px",
    color: "#888888",
    width: "40px",
  };
  const styleLay1Right = {
    fontSize: "14px",
    color: "#323232",
  };
  const styleNickname = {
    height: "28px",
    lineHeight: "28px",
    border: "none",
    outline: "none",
    borderRadius: "8px",
    paddingLeft: "10px",
    paddingRight: "10px",
    background: "#EEEEEE",
  };

  const styleBtn1 = useSpring({
    float: "right",
    marginLeft: "10px",
    height: "36px",
    width: "calc(100% - 87px)",
    lineHeight: "36px",
    textAlign: "center",
    borderRadius: "8px",
    background: "#6E3678",
    fontSize: "15px",
    color: "white",
  });
  const styleBtn2 = useSpring({
    float: "right",
    height: "36px",
    width: "77px",
    lineHeight: "36px",
    textAlign: "center",
    borderRadius: "8px",
    background: "#EEEEEE",
    fontSize: "15px",
    color: "#888888",
  });

  return (
    <animated.div style={styleBgd}>
      <div
        style={{
          position: "absolute",
          top: "0px",
          left: "0px",
          width: "100%",
          height: "100%",
        }}
        onClick={onClose}
      />
      <div
        style={{
          position: "absolute",
          top: "120px",
          bottom: "40px",
          left: "0px",
          right: "0px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "0px",
            left: "0px",
            width: "100%",
            height: "100%",
          }}
          onClick={onClose}
        />
        <RLayout.R1 height="100%" position="static">
          <div style={style}>
            <CloseRoundedIcon style={styleClose} onClick={onClose} />
            <div style={styleName}>
              {props.userInfo.name ? props.userInfo.name : ""}
            </div>
            <div style={{ height: "15px" }} />
            <ProfImg
              id={props.userInfo.id ? props.userInfo.id : ""}
              token={props.profToken}
            />
            <BtnProfImg onClose={props.onClose} onUpdate={props.onUpdate} />
            <div style={styleLine} />
            <div style={{ height: "15px" }} />

            <div style={styleLay1}>
              <div style={styleLay1Left}>학번</div>
              <div style={styleLay1Right}>
                {props.userInfoD.subinfo ? props.userInfoD.subinfo.kaist : ""}
              </div>
            </div>
            <div style={styleLay1}>
              <div style={styleLay1Left}>메일</div>
              <div style={styleLay1Right}>
                {props.userInfoD.email ? props.userInfoD.email : ""}
              </div>
            </div>
            <div style={styleLay1}>
              <div style={styleLay1Left}>별명</div>
              <div style={styleLay1Right}>
                <input
                  style={styleNickname}
                  value={nickName}
                  onChange={(e) => setNickName(e.target.value)}
                />
              </div>
            </div>

            <div style={{ height: "10px" }} />
            <div
              style={{
                position: "relative",
                paddingLeft: "15px",
                paddingRight: "15px",
                marginBottom: "15px",
                height: "36px",
              }}
            >
              {nickName == nickNameReal || !regexNickname.test(nickName) ? (
                <>
                  <animated.div
                    style={{ ...styleBtn2, width: "100%" }}
                    onClick={onClose}
                    className="BTNC ND"
                  >
                    취소
                  </animated.div>
                </>
              ) : (
                <>
                  <animated.div
                    style={styleBtn1}
                    onClick={onClickEditNickName}
                    className="BTNC ND"
                  >
                    수정 하기
                  </animated.div>
                  <animated.div
                    style={styleBtn2}
                    onClick={onClose}
                    className="BTNC ND"
                  >
                    취소
                  </animated.div>
                </>
              )}
            </div>
          </div>
        </RLayout.R1>
      </div>
    </animated.div>
  );
};
PopupMypage.propTypes = {
  userInfo: PropTypes.any,
  userInfoD: PropTypes.any,
  profToken: PropTypes.any,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onUpdate: PropTypes.func,
};

export default PopupMypage;
