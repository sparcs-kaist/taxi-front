import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { useAxios } from "hooks/useTaxiAPI";

import Button from "components/Button";
import DottedLine from "components/DottedLine";
import LinkLogin from "components/Link/LinkLogin";
import MiniCircle from "components/MiniCircle";
import Modal from "components/Modal";
import { MAX_PARTICIPATION } from "pages/Myroom";

import alertAtom from "atoms/alert";
import loginInfoAtom from "atoms/loginInfo";
import myRoomsAtom from "atoms/myRooms";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { date2str } from "tools/moment";
import theme from "tools/theme";
import { getLocationName } from "tools/trans";

import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";

const PlaceSection = (props) => {
  const style = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "16px 12px 10px",
    flex: "1 1 0",
  };
  const stylePlaceType = {
    ...theme.font12,
    color: theme.gray_text,
    margin: "5px 0 1px",
  };
  const stylePlaceNameWrapper = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "39px",
    width: "100%",
  };
  const stylePlaceName = {
    ...theme.font16_bold,
    color: theme.purple,
    textAlign: "center",
    wordBreak: "keep-all",
  };

  return (
    <div style={style}>
      <MiniCircle type={props.type} />
      <p style={stylePlaceType}>
        {props.type === "from" ? "출발지" : "도착지"}
      </p>
      <div style={stylePlaceNameWrapper}>
        <p style={stylePlaceName}>{props.name}</p>
      </div>
    </div>
  );
};
PlaceSection.propTypes = {
  type: PropTypes.oneOf(["from", "to"]),
  name: PropTypes.string.isRequired,
};

const InfoSection = (props) => (
  <div
    css={{
      display: "flex",
      flexDirection: "column",
      alignItems: props.isAlignLeft ? "flex-start" : "flex-end",
      rowGap: "5px",
      maxWidth: "fit-content",
    }}
  >
    <p
      css={{
        ...theme.font12,
        color: theme.gray_text,
      }}
    >
      {props.title}
    </p>
    {props.children}
  </div>
);
InfoSection.propTypes = {
  title: PropTypes.string.isRequired,
  isAlignLeft: PropTypes.bool,
  children: PropTypes.node,
};
InfoSection.defaultProps = {
  isAlignLeft: true,
};

const ModalRoomSelection = (props) => {
  const { i18n } = useTranslation();
  const axios = useAxios();
  const history = useHistory();

  const [roomInfo, setRoomInfo] = useState(null);
  const onCall = useRef(false);

  const [myRooms, setMyRooms] = useRecoilState(myRoomsAtom);
  const loginInfo = useRecoilValue(loginInfoAtom);
  const setAlert = useSetRecoilState(alertAtom);
  const disableJoinBtn =
    roomInfo?.part.some((user) => user._id === loginInfo?.oid) ?? true;
  const isRoomFull = roomInfo
    ? roomInfo.maxPartLength - roomInfo.part.length === 0
    : false;
  const fullParticipation = myRooms?.ongoing.length >= MAX_PARTICIPATION;
  const isLogin = !!loginInfo?.id;

  useEffect(() => {
    if (props.isOpen) setRoomInfo(props.roomInfo);
  }, [props.isOpen]);

  const styleTitle = {
    ...theme.font18,
    padding: "10px 26px 18px 14px",
  };
  const stylePlace = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const styleArrow = {
    fontSize: "24px",
    color: theme.gray_text,
  };
  const styleInfoSectionWrapper = {
    padding: "16px 14px",
    display: "grid",
    rowGap: "16px",
  };
  const styleMultipleInfo = {
    display: "flex",
    justifyContent: "space-between",
    columnGap: "12px",
  };

  const requestJoin = async () => {
    if (!onCall.current) {
      onCall.current = true;
      // FIXME: "/rooms/join" API가 myRoom을 반환하도록 수정
      await axios({
        url: "/rooms/join",
        method: "post",
        data: {
          roomId: roomInfo._id,
        },
        onSuccess: async () => {
          setMyRooms(
            await axios({
              url: "/rooms/searchByUser",
              method: "get",
              onError: () =>
                setAlert("예상치 못한 오류가 발생했습니다. 새로고침 해주세요."),
            })
          );
          history.push(`/myroom/${roomInfo._id}`);
        },
        onError: () => setAlert("방 참여에 실패하였습니다."),
      });
      onCall.current = false;
    }
  };

  return (
    <Modal isOpen={props.isOpen} onChangeIsOpen={props.onClose} padding="10px">
      <div style={styleTitle}>{roomInfo?.name ?? ""}</div>
      <DottedLine margin="0 2px" />
      <div style={stylePlace}>
        <PlaceSection
          type="from"
          name={getLocationName(roomInfo?.from, i18n.language)}
        />
        <ArrowRightAltRoundedIcon style={styleArrow} />
        <PlaceSection
          type="to"
          name={getLocationName(roomInfo?.to, i18n.language)}
        />
      </div>
      <DottedLine margin="0 2px" />
      <div style={styleInfoSectionWrapper}>
        <InfoSection title="출발 시각 & 날짜" isBold>
          <p style={theme.font14_bold}>{date2str(roomInfo?.time) ?? ""}</p>
        </InfoSection>
        <div style={styleMultipleInfo}>
          <InfoSection title="탑승자">
            <p style={theme.font14}>
              {roomInfo?.part
                .reduce((acc, user) => {
                  acc.push(user.nickname);
                  return acc;
                }, [])
                .join(", ") ?? ""}
            </p>
          </InfoSection>
          <InfoSection title="탑승 / 최대 인원" isAlignLeft={false}>
            <div style={{ display: "flex" }}>
              <p
                style={{ ...theme.font14_bold, color: theme.purple }}
              >{`${roomInfo?.part?.length}명`}</p>
              <p style={theme.font14}>
                &nbsp;{`/ ${roomInfo?.maxPartLength}명`}
              </p>
            </div>
          </InfoSection>
        </div>
      </div>
      {isLogin ? (
        <Button
          type="purple"
          disabled={isRoomFull || disableJoinBtn || fullParticipation}
          padding="10px 0 9px"
          radius={8}
          font={theme.font14_bold}
          onClick={requestJoin}
        >
          {disableJoinBtn
            ? "이미 참여 중입니다"
            : isRoomFull
            ? "인원이 0명인 방은 참여할 수 없습니다"
            : fullParticipation
            ? "현재 5개의 방에 참여 중입니다"
            : "참여 신청"}
        </Button>
      ) : (
        <LinkLogin redirect={`/home/${roomInfo?._id}`}>
          <Button
            type="purple"
            padding="10px 0 9px"
            radius={8}
            font={theme.font14_bold}
          >
            로그인 후 참여 신청
          </Button>
        </LinkLogin>
      )}
    </Modal>
  );
};
ModalRoomSelection.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  roomInfo: PropTypes.object,
};

export default ModalRoomSelection;
