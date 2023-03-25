import axiosOri from "axios";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { useAxios } from "hooks/useTaxiAPI";

import AccountSelector from "components/AccountSelector";
import Button from "components/Button";
import DottedLine from "components/DottedLine";
import Modal from "components/Modal";

import ProfileImg from "./ProfileImg";

import alertAtom from "atoms/alert";
import loginInfoDetailAtom from "atoms/loginInfoDetail";
import { useRecoilState, useSetRecoilState } from "recoil";

import convertImg from "tools/convertImg";
import regExpTest from "tools/regExpTest";
import theme from "tools/theme";

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
  const { t } = useTranslation("mypage");
  const axios = useAxios();

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
      const data = await axios({
        url: "/users/editProfileImg/getPUrl",
        method: "post",
        data: {
          type: image.type,
        },
      });
      if (data.url && data.fields) {
        const formData = new FormData();
        for (const key in data.fields) {
          formData.append(key, data.fields[key]);
        }
        formData.append("file", image);
        const res = await axiosOri.post(data.url, formData);
        if (res.status === 204) {
          const data2 = await axios({
            url: "/users/editProfileImg/done",
            method: "get",
          });
          if (data2?.result) {
            setLoginInfoDetail({
              ...loginInfoDetail,
              profileImgUrl: data2.profileImageUrl,
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
        ? t("page_modify.profile_image_success")
        : profileAlert === "FAIL"
        ? t("page_modify.profile_image_failed")
        : profileAlert === "LOADING"
        ? t("page_modify.profile_image_loading")
        : t("page_modify.profile_image_change")}
    </div>
  );
};
BtnProfImg.propTypes = {
  onUpdate: PropTypes.func,
  onClose: PropTypes.func,
};

const PopupModify = (props) => {
  const { t } = useTranslation("mypage");
  const axios = useAxios();

  const [nickname, setNickname] = useState("");
  const [account, setAccount] = useState("");

  const [loginInfoDetail, setLoginInfoDetail] =
    useRecoilState(loginInfoDetailAtom);
  const setAlert = useSetRecoilState(alertAtom);

  useEffect(() => {
    setNickname(loginInfoDetail?.nickname || "");
    setAccount(loginInfoDetail?.account || "");
  }, [loginInfoDetail, props.isOpen]);

  const isEditable =
    regExpTest.account(account) && regExpTest.nickname(nickname);
  const handleEditProfile = async () => {
    let isNeedToUpdateLoginInfo = false;
    if (!isEditable) return;

    if (nickname !== loginInfoDetail?.nickname) {
      isNeedToUpdateLoginInfo = true;
      await axios({
        url: "/users/editNickname",
        method: "post",
        data: { nickname },
        onError: () => setAlert(t("page_modify.nickname_failed")),
      });
    }
    if (account !== loginInfoDetail?.account) {
      isNeedToUpdateLoginInfo = true;
      await axios({
        url: "/users/editAccount",
        method: "post",
        data: { account },
        onError: () => setAlert(t("page_modify.account_failed")),
      });
    }
    if (isNeedToUpdateLoginInfo) {
      setLoginInfoDetail(
        await axios({
          url: "/logininfo/detail",
          method: "get",
        })
      );
    }
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
  const styleButton = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "24px",
  };

  return (
    <Modal
      display={props.isOpen}
      onClickClose={props.onClose}
      padding="32px 10px 10px"
      onEnter={handleEditProfile}
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
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        <AccountSelector
          accountNumber={account}
          setAccountNumber={setAccount}
        />
      </div>
      <div style={styleButton}>
        <Button
          type="gray"
          width="calc(50% - 5px)"
          padding="10px 0 9px"
          radius={8}
          font={theme.font14}
          onClick={props.onClose}
        >
          {t("page_modify.cancel")}
        </Button>
        <Button
          type="purple_inset"
          disabled={
            !isEditable ||
            (nickname === loginInfoDetail?.nickname &&
              account === loginInfoDetail?.account)
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
