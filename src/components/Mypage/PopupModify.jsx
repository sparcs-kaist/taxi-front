import React, { useEffect, useState, useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import alertAtom from "recoil/alert";
import loginInfoDetailAtom from "recoil/loginInfoDetail";
import ProfileImg from "./ProfileImg";
import axios from "tools/axios";
import axiosOri from "axios";
import convertImg from "tools/convertImg";
import PropTypes from "prop-types";
import Modal from "components/common/modal/Modal";
import DottedLine from "components/common/DottedLine";
import theme from "styles/theme";
import Button from "components/common/Button";

const ProfImg = (props) => {
  const style = {
    margin: "auto",
    width: "110px",
    height: "110px",
    borderRadius: "55%",
    overflow: "hidden",
  };
  return (
    <div style={style}>
      {props.profileImgUrl && (
        <ProfileImg path={props.profileImgUrl} token={props.token} />
      )}
    </div>
  );
};
ProfImg.propTypes = {
  profileImgUrl: PropTypes.string,
  token: PropTypes.any,
};

const BtnProfImg = (props) => {
  const inputImage = useRef(null);
  const setAlert = useSetRecoilState(alertAtom);
  const [loginInfoDetail, setLoginInfoDetail] =
    useRecoilState(loginInfoDetailAtom);

  const handleUploadProfileImage = async () => {
    try {
      const image = await convertImg(inputImage.current?.files?.[0]);
      if (!image) return;
      const { data } = await axios.post("/users/editProfileImg/getPUrl", {
        type: image.type,
      });
      if (data.url && data.fields) {
        const formData = new FormData();
        for (const key in data.fields) {
          formData.append(key, data.fields[key]);
        }
        formData.append("file", image);
        const res = await axiosOri.post(data.url, formData);
        if (res.status === 204) {
          const res2 = await axios.get("/users/editProfileImg/done");
          if (res2.data.result) {
            setAlert("프로필 사진이 변경되었습니다.");
            setLoginInfoDetail({
              ...loginInfoDetail,
              profileImageUrl: res2.data.profileImageUrl,
            });
            props.onUpdate();
            return;
          }
        }
      }
      setAlert("프로필 사진 변경에 실패했습니다.");
    } catch (e) {
      setAlert("프로필 사진 변경에 실패했습니다.");
    }
  };
  const style = {
    textAlign: "center",
    ...theme.font10_bold,
    color: theme.purple,
    width: "fit-content",
    margin: "16px auto",
    cursor: "pointer",
  };

  return (
    <div style={style} onClick={() => inputImage.current.click()}>
      <input
        type="file"
        accept="image/jpg, image/png, image/jpeg, image/heic"
        hidden
        onChange={handleUploadProfileImage}
        ref={inputImage}
      />
      프로필 사진 변경
    </div>
  );
};
BtnProfImg.propTypes = {
  onUpdate: PropTypes.func,
  onClose: PropTypes.func,
};

const PopupModify = (props) => {
  const regexNickname = new RegExp("^[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9-_ ]{3,25}$");
  const [nickName, setNickName] = useState("");
  const [nickNameReal, setNickNameReal] = useState("");
  const setAlert = useSetRecoilState(alertAtom);
  const [loginInfoDetail, setLoginInfoDetail] =
    useRecoilState(loginInfoDetailAtom);

  useEffect(() => {
    if (loginInfoDetail?.nickname) {
      setNickName(loginInfoDetail?.nickname);
      setNickNameReal(loginInfoDetail?.nickname);
    }
  }, [loginInfoDetail]);

  const onClose = () => {
    setNickName(nickNameReal);
    props.onClose();
  };
  const onClickEditNickName = async () => {
    const result = await axios.post(`/users/editNickname`, {
      nickname: nickName,
    });
    if (result.status !== 200) {
      setAlert("닉네임 변경에 실패하였습니다.");
      return;
    }
    setLoginInfoDetail({ ...loginInfoDetail, nickname: nickName });
    props.onUpdate();
    props.onClose();
  };
  const styleName = {
    ...theme.font20,
    textAlign: "center",
    marginBottom: "16px",
  };
  const styleTitle = {
    display: "flex",
    alignItems: "center",
    ...theme.font14,
    color: theme.gray_text,
    whiteSpace: "nowrap",
  };
  const styleContent = {
    ...theme.font14,
    marginLeft: "12px",
  };
  const styleNickname = {
    width: "100%",
    ...theme.font14,
    border: "none",
    outline: "none",
    borderRadius: "6px",
    padding: "6px 12px",
    marginLeft: "10px",
    background: theme.purple_light,
    boxShadow: theme.shadow_purple_input_inset,
  };
  const styleButton = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "24px",
  };

  return (
    <Modal
      display={props.isOpen}
      onClickClose={onClose}
      padding="32px 10px 10px"
    >
      <div style={styleName}>{loginInfoDetail?.name}</div>
      <ProfImg
        profileImgUrl={loginInfoDetail?.profileImgUrl}
        token={props.profToken}
      />
      <BtnProfImg onClose={props.onClose} onUpdate={props.onUpdate} />
      <DottedLine direction="row" margin="0 2px" />
      <div style={{ rowGap: "10px", padding: "0px 20px" }}>
        <div style={{ ...styleTitle, marginTop: "24px" }}>
          학번
          <div style={styleContent}>{loginInfoDetail?.subinfo?.kaist}</div>
        </div>
        <div style={{ ...styleTitle, marginTop: "16px" }}>
          메일
          <div style={styleContent}>{loginInfoDetail?.email}</div>
        </div>
        <div style={{ ...styleTitle, marginTop: "10px" }}>
          별명
          <input
            style={styleNickname}
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
          />
        </div>
      </div>
      <div style={styleButton}>
        <Button
          type="gray"
          width="calc(50% - 5px)"
          padding="9px 0px 10px"
          radius={8}
          font={theme.font14}
          onClick={onClose}
        >
          취소
        </Button>
        <Button
          type="purple_inset"
          disabled={nickName == nickNameReal || !regexNickname.test(nickName)}
          width="calc(50% - 5px)"
          padding="9px 0px 10px"
          radius={8}
          font={theme.font14_bold}
          onClick={onClickEditNickName}
        >
          수정하기
        </Button>
      </div>
    </Modal>
  );
};
PopupModify.propTypes = {
  profToken: PropTypes.any,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onUpdate: PropTypes.func,
};

export default PopupModify;
