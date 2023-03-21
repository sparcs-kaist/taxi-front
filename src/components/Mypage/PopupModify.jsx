import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
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
import AccountSelector from "components/common/AccountSelector";

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
        ? props.t("page_modify.profile_image_success")
        : profileAlert === "FAIL"
        ? props.t("page_modify.profile_image_failed")
        : profileAlert === "LOADING"
        ? props.t("page_modify.profile_image_loading")
        : props.t("page_modify.profile_image_change")}
    </div>
  );
};
BtnProfImg.propTypes = {
  onUpdate: PropTypes.func,
  onClose: PropTypes.func,
  t: PropTypes.any,
};

const PopupModify = (props) => {
  const { t } = useTranslation("mypage");
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
    if (loginInfoDetail?.account) {
      setAccountNumberReal(loginInfoDetail?.account);
      setAccountNumber(loginInfoDetail?.account);
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
      setMessage(t("page_modify.nickname_failed"));
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
  const handleEditProfile = () => {
    if (nickName !== nickNameReal) {
      onClickEditNickName();
    }
    if (accountNumber !== accountNumberReal) {
      onClickEditAccountNumber();
    }
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
      onEnter={onClickEditNickName}
    >
      <div style={styleName}>{loginInfoDetail?.name}</div>
      <ProfImg
        profileImgUrl={loginInfoDetail?.profileImgUrl}
        token={props.profToken}
      />
      <BtnProfImg onClose={props.onClose} onUpdate={props.onUpdate} t={t} />
      <DottedLine direction="row" margin="0 2px" />
      <div style={{ rowGap: "10px", padding: "0px 20px" }}>
        <div style={{ ...styleTitle, marginTop: "24px" }}>
          {t("student_id")}
          <div style={styleContent}>{loginInfoDetail?.subinfo?.kaist}</div>
        </div>
        <div style={{ ...styleTitle, marginTop: "16px" }}>
          {t("email")}
          <div style={styleContent}>{loginInfoDetail?.email}</div>
        </div>
        <div style={{ ...styleTitle, marginTop: "10px" }}>
          {t("nickname")}
          <input
            style={styleNickname}
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
          />
        </div>
        <AccountSelector
          accountNumber={accountNumber}
          setAccountNumber={setAccountNumber}
        />

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
          {t("page_modify.cancel")}
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
          onClick={handleEditProfile}
        >
          {t("page_modify.modify")}
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
