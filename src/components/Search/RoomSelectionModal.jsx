import { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import preferenceAtom from "recoil/preference";
import loginInfoDetailAtom from "recoil/loginInfoDetail";
import alertAtom from "recoil/alert";
import myRoomAtom from "recoil/myRoom";
import PropTypes from "prop-types";
import { date2str } from "tools/moment";
import { getLocationName } from "tools/trans";
import axios from "tools/axios";
import theme from "styles/theme";
import { MAX_PARTICIPATION } from "components/Myroom/Myroom";

import Modal from "components/common/modal/Modal";
import Button from "components/common/Button";
import DottedLine from "components/common/DottedLine";
import Tooltip from "@mui/material/Tooltip";
import MiniCircle from "components/common/MiniCircle";

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

const InfoSection = (props) => {
  const style = {
    display: "flex",
    flexDirection: "column",
    alignItems: props.isAlignLeft ? "flex-start" : "flex-end",
    rowGap: "5px",
    maxWidth: "fit-content",
    flex: props.isBold || props.isColored ? "1 0" : "1 1",
  };
  const styleTitle = {
    ...theme.font12,
    color: theme.gray_text,
  };
  const styleText = {
    ...theme.font14,
    color: props.isColored ? theme.purple : undefined,
    fontWeight: props.isBold || props.isColored ? 500 : undefined,
  };

  return (
    <div style={style}>
      <p style={styleTitle}>{props.title}</p>
      <p style={styleText}>{props.text}</p>
    </div>
  );
};
InfoSection.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isBold: PropTypes.bool,
  isColored: PropTypes.bool,
  isAlignLeft: PropTypes.bool,
};
InfoSection.defaultProps = {
  isBold: false,
  isColored: false,
  isAlignLeft: true,
};

const RoomSelectionModal = (props) => {
  const onCall = useRef(false);
  const [roomInfo, setRoomInfo] = useState(null);
  const history = useHistory();
  const [myRoom, setMyRoom] = useRecoilState(myRoomAtom);
  const loginInfoDetail = useRecoilValue(loginInfoDetailAtom);
  const preference = useRecoilValue(preferenceAtom);
  const setAlert = useSetRecoilState(alertAtom);
  const disableJoinBtn =
    roomInfo?.part.some((user) => user._id === loginInfoDetail?.oid) ?? true;
  const isRoomFull = roomInfo
    ? roomInfo.maxPartLength - roomInfo.part.length === 0
    : false;
  const fullParticipation = myRoom?.ongoing.length >= MAX_PARTICIPATION;

  useEffect(() => {
    if (props.isOpen) setRoomInfo(props.roomInfo);
  }, [props.isOpen]);

  useEffect(() => {
    if (onCall.current) history.push(`/myroom/${roomInfo._id}`);
  }, [myRoom?.ongoing.length]);

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
      const result = await axios.post("/rooms/join", {
        roomId: roomInfo._id,
      });
      if (result.status === 200) {
        try {
          const { data } = await axios.get("/rooms/searchByUser");
          setMyRoom(data);
        } catch (error) {
          setAlert("예상치 못한 오류가 발생했습니다. 새로고침 해주세요.");
        }
      } else {
        setAlert("방 개설에 실패하였습니다.");
      }
    }
  };

  return (
    <Modal display={props.isOpen} onClickClose={props.onClose} padding="10px">
      <div style={styleTitle}>{roomInfo?.name ?? ""}</div>
      <DottedLine margin="0 2px" />
      <div style={stylePlace}>
        <PlaceSection
          type="from"
          name={getLocationName(roomInfo?.from, preference.lang)}
        />
        <ArrowRightAltRoundedIcon style={styleArrow} />
        <PlaceSection
          type="to"
          name={getLocationName(roomInfo?.to, preference.lang)}
        />
      </div>
      <DottedLine margin="0 2px" />
      <div style={styleInfoSectionWrapper}>
        <InfoSection
          title="출발 시각 & 날짜"
          text={date2str(roomInfo?.time) ?? ""}
          isBold
        />
        <div style={styleMultipleInfo}>
          <InfoSection
            title="탑승자"
            text={
              roomInfo?.part
                .reduce((acc, user) => {
                  acc.push(user.nickname);
                  return acc;
                }, [])
                .join(", ") ?? ""
            }
          />
          <InfoSection
            title="남은 인원"
            text={
              roomInfo
                ? `${roomInfo.maxPartLength - roomInfo.part.length}명`
                : ""
            }
            isAlignLeft={false}
            isColored
          />
        </div>
      </div>
      <Tooltip
        title={"참여할 수 있는 방 개수는 최대 5개입니다."}
        componentsProps={{
          tooltip: {
            sx: {
              display: fullParticipation ? undefined : "none",
              ...theme.font12,
              color: theme.black,
              padding: "8px 10px 7px",
              marginTop: "20px !important",
              width: "148px",
              boxShadow: theme.shadow,
              backgroundColor: theme.white,
              textAlign: "center",
              whiteSpace: "normal",
              borderRadius: "8px",
              cursor: "default",
            },
          },
        }}
        enterTouchDelay={0}
        leaveTouchDelay={2000}
      >
        <div>
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
        </div>
      </Tooltip>
    </Modal>
  );
};
RoomSelectionModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  roomInfo: PropTypes.object,
};

export default RoomSelectionModal;
