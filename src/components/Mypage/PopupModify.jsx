import React, { useEffect, useState, useRef } from "react";
import { useRecoilState } from "recoil";
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
// 왠지는 모르겠는데 이미 react-select가 깔려있어서 썼습니당
import Select from "react-select";

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
  const [profileAlert, setProfileAlert] = useState(null);
  const [loginInfoDetail, setLoginInfoDetail] =
    useRecoilState(loginInfoDetailAtom);

  useEffect(() => {
    if (profileAlert === "LOADING") return;
    const timeoutID = setTimeout(() => setProfileAlert(null), 1500);
    return () => clearTimeout(timeoutID);
  }, [profileAlert]);

  const handleUploadProfileImage = async () => {
    setProfileAlert("LOADING");
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
            setLoginInfoDetail({
              ...loginInfoDetail,
              profileImgUrl: res2.data.profileImageUrl,
            });
            props.onUpdate();
            setProfileAlert("SUCCESS");
            return;
          }
        }
      }
      setProfileAlert("FAIL");
    } catch (e) {
      setProfileAlert("FAIL");
    }
  };
  const style = {
    textAlign: "center",
    ...theme.font10_bold,
    color:
      profileAlert === "SUCCESS"
        ? theme.green_button
        : profileAlert === "FAIL"
        ? theme.red_button
        : profileAlert === "LOADING"
        ? theme.gray_text
        : theme.purple,
    width: "fit-content",
    margin: "16px auto",
    cursor: profileAlert ? "default" : "pointer",
  };
  const onClick = () => {
    if (!profileAlert) {
      inputImage.current.click();
    }
  };

  return (
    <div style={style} onClick={onClick}>
      <input
        type="file"
        accept="image/jpg, image/png, image/jpeg, image/heic"
        hidden
        onChange={handleUploadProfileImage}
        ref={inputImage}
      />
      {profileAlert === "SUCCESS"
        ? "프로필 사진이 변경되었습니다."
        : profileAlert === "FAIL"
        ? "프로필 사진 변경에 실패했습니다."
        : profileAlert === "LOADING"
        ? "변경 중입니다..."
        : "프로필 사진 변경"}
    </div>
  );
};
BtnProfImg.propTypes = {
  onUpdate: PropTypes.func,
  onClose: PropTypes.func,
};

const PopupModify = (props) => {
  const regexNickname = new RegExp("^[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9-_ ]{3,25}$");
  const regexAccountNumber = new RegExp("^[A-Za-z가-힣]{2,7} [0-9]{10,14}$");
  const [nickName, setNickName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountNumberReal, setAccountNumberReal] = useState("");
  const [nickNameReal, setNickNameReal] = useState("");
  const [message, setMessage] = useState(null);
  const [loginInfoDetail, setLoginInfoDetail] =
    useRecoilState(loginInfoDetailAtom);

  useEffect(() => {
    if (loginInfoDetail?.nickname) {
      setNickName(loginInfoDetail?.nickname);
      setNickNameReal(loginInfoDetail?.nickname);
    }
  }, [loginInfoDetail]);
  useEffect(() => {
    const timeoutID = setTimeout(() => setMessage(null), 1500);
    return () => clearTimeout(timeoutID);
  }, [message]);

  const onClose = () => {
    setNickName(nickNameReal);
    props.onClose();
  };
  const onClickEditNickName = async () => {
    const result = await axios.post(`/users/editNickname`, {
      nickname: nickName,
    });
    if (result.status !== 200) {
      setMessage("닉네임 변경에 실패하였습니다.");
      return;
    }
    setLoginInfoDetail({ ...loginInfoDetail, nickname: nickName });
    props.onUpdate();
    props.onClose();
  };
  const onClickEditAccountNumber = async () => {
    const result = await axios.post(`/users/editAccount`, {
      account: accountNumber,
    });
    if (result.status !== 200) {
      setMessage("계좌번호 변경에 실패하였습니다.");
      return;
    }
    setLoginInfoDetail({ ...loginInfoDetail, account: accountNumber });
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
  const styleMessage = {
    color: theme.red_button,
    ...theme.font10,
    margin: "4px 0 -16px 0",
    textAlign: "right",
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
  const styleBanks = {
    width: "75px",
    ...theme.font14,
    color: theme.purple,
    fontWeight: "400",
    border: "none",
    outline: "none",
    borderRadius: "6px",
    padding: "6px 4px",
    marginLeft: "10px",
    background: theme.purple_light,
    boxShadow: theme.shadow_purple_input_inset,
    textAlign: "center",
  };
  const styleButton = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "24px",
  };

  const reactSelectOptions = [
    { value: "NH농협", label: "NH농협" },
    { value: "KB국민", label: "KB국민" },
    { value: "카카오뱅크", label: "카카오뱅크" },
    { value: "신한", label: "신한" },
    { value: "우리", label: "우리" },
    { value: "IBK기업", label: "IBK기업" },
    { value: "하나", label: "하나" },
    { value: "토스뱅크", label: "토스뱅크" },
    { value: "새마을", label: "새마을" },
    { value: "부산", label: "부산" },
    { value: "대구", label: "대구" },
    { value: "케이뱅크", label: "케이뱅크" },
    { value: "신협", label: "신협" },
    { value: "우체국", label: "우체국" },
    { value: "SC제일", label: "SC제일" },
    { value: "경남", label: "경남" },
    { value: "수협", label: "수협" },
    { value: "광주", label: "광주" },
    { value: "전북", label: "전북" },
    { value: "저축은행", label: "저축은행" },
    { value: "씨티", label: "씨티" },
    { value: "제주", label: "제주" },
    { value: "KDB산업", label: "KDB산업" },
  ];

  return (
    <Modal
      display={props.isOpen}
      onClickClose={onClose}
      padding="32px 10px 10px"
      onEnter={onClickEditNickName}
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
        <div style={{ ...styleTitle, marginTop: "10px" }}>
          계좌
          <select style={styleBanks}>
            {reactSelectOptions.map((option) => {
              return (
                <option value={option.value} key={option.value}>
                  {option.label}
                </option>
              );
            })}
          </select>
          <input
            style={styleNickname}
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
        </div>
        {message && <div style={styleMessage}>{message}</div>}
      </div>
      <div style={styleButton}>
        <Button
          type="gray"
          width="calc(50% - 5px)"
          padding="10px 0 9px"
          radius={8}
          font={theme.font14}
          onClick={onClose}
        >
          취소
        </Button>
        <Button
          type="purple_inset"
          disabled={
            !regexAccountNumber.test(accountNumber) ||
            !regexNickname.test(nickName) ||
            (nickName == nickNameReal && accountNumber == accountNumberReal)
          }
          width="calc(50% - 5px)"
          padding="10px 0 9px"
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
