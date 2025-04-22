import { memo, useCallback, useEffect, useState } from "react";

import useIsTimeOver from "@/hooks/useIsTimeOver";
import { useAxios } from "@/hooks/useTaxiAPI";

import DottedLine from "@/components/DottedLine";
import {
  ModalCallTaxi,
  ModalChatCancel,
  ModalChatReport,
  ModalRoomShare,
} from "@/components/ModalPopup";
import User from "@/components/User";

import alertAtom from "@/atoms/alert";
import { useSetRecoilState } from "recoil";

import dayjs, { day2str, dayServerToClient } from "@/tools/day";
import theme from "@/tools/theme";

import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import LocalTaxiRoundedIcon from "@mui/icons-material/LocalTaxiRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import ReportGmailerrorredRoundedIcon from "@mui/icons-material/ReportGmailerrorredRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import WalletRoundedIcon from "@mui/icons-material/WalletRounded";

type SideMenuButtonProps = {
  type: "share" | "report" | "taxi";
  onClick?: () => void;
};

type SideMenuProps = {
  roomInfo: Room;
  isOpen: boolean;
  setIsOpen: (x: boolean) => void;
};

const SideMenuButton = ({ type, onClick }: SideMenuButtonProps) => {
  const style = {
    padding: "16px 0",
    cursor: "pointer",
    display: "flex",
    gap: "8px",
    alignItems: "center",
  };
  const styleIcon = { width: "16px", height: "16px", fill: theme.black };
  const styleText = { ...theme.font14, color: theme.black, flex: 1 };
  const styleArrow = { ...styleIcon, fill: theme.gray_text };

  const { icon, text } = {
    share: { icon: <ShareRoundedIcon style={styleIcon} />, text: "공유하기" },
    report: {
      icon: <ReportGmailerrorredRoundedIcon style={styleIcon} />,
      text: "신고하기",
    },
    taxi: {
      icon: <LocalTaxiRoundedIcon style={styleIcon} />,
      text: "택시 호출하기",
    },
  }[type];

  return (
    <div css={style} onClick={onClick}>
      {icon}
      <div css={styleText}>{text}</div>
      <KeyboardArrowRightRoundedIcon style={styleArrow} />
    </div>
  );
};

const SideMenu = ({ roomInfo, isOpen, setIsOpen }: SideMenuProps) => {
  const axios = useAxios();

  const setAlert = useSetRecoilState(alertAtom);
  const [isOpenShare, setIsOpenShare] = useState<boolean>(false);
  const [isOpenCallTaxi, setIsOpenCallTaxi] = useState<boolean>(false);
  const [isOpenReport, setIsOpenReport] = useState<boolean>(false);
  const [isOpenCancel, setIsOpenCancel] = useState<boolean>(false);
  const isDeparted = useIsTimeOver(dayServerToClient(roomInfo.time)); // 방 출발 여부
  
  const onClikcShare = useCallback(() => setIsOpenShare(true), []);
  const onClickCancel = useCallback(
    () =>
      isDeparted
        ? setAlert("출발 시각이 이전인 방은 탑승 취소를 할 수 없습니다.")
        : setIsOpenCancel(true),
    [isDeparted]
  );
  const onClickCallTaxi = useCallback(() => setIsOpenCallTaxi(true), []);
  const onClickReport = useCallback(() => setIsOpenReport(true), []);

  const [taxiFare, setTaxiFare] = useState<number>(0);
  const getTaxiFare = async () => {
    await axios({
      url: "/fare/getTaxiFare",
      method: "get",
      params: {
        from: roomInfo.from._id.toString(),
        to: roomInfo.to._id.toString(),
        time: roomInfo.time,
      },
      onSuccess: (data) => setTaxiFare(data.fare),
      onError: (status) => {},
    });
  };

  useEffect(() => {
    getTaxiFare();
  }, [roomInfo._id]);
  const isAlone = roomInfo.part.length === 1;

  const styleBackground = {
    position: "absolute" as any,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: theme.black_40,
    zIndex: theme.zIndex_background,
    pointerEvents: isOpen ? "auto" : ("none" as any),
    opacity: isOpen ? 1 : 0,
    transition: "opacity 0.3s",
  };
  const style = {
    position: "absolute" as any,
    top: 0,
    right: isOpen ? 0 : "max(calc(-100% + 60px), -370px)",
    width: "min(calc(100% - 60px), 370px)",
    height: "100%",
    padding: "0 16px",
    boxSizing: "border-box" as any,
    background: theme.white,
    zIndex: theme.zIndex_modal - 1,
    transition: "right 0.3s",
    display: "flex",
    flexDirection: "column" as any,
  };
  const styleNameSection = {
    margin: "16px 8px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  };
  const styleIcon = {
    width: "16px",
    height: "16px",
    fill: theme.black,
  };
  const styleInfoSection = {
    padding: "20px 0",
  };
  const styleInfo = {
    ...theme.font14,
    color: theme.black,
  };
  const styleUsers = {
    paddingTop: "16px",
    display: "flex",
    flexDirection: "column" as any,
    gap: "6px",
  };

  return (
    <>
      <div css={styleBackground} onClick={() => setIsOpen(false)}></div>
      <div css={style}>
        <div css={{ height: "max(5px, env(safe-area-inset-top))" }} />
        <div css={styleNameSection}>
          <ArrowForwardRoundedIcon
            style={{ fontSize: "24px", fill: theme.purple, cursor: "pointer" }}
            onClick={() => setIsOpen(false)}
          />
          <div css={{ color: theme.purple, ...theme.font18 }}>
            {roomInfo.name}
          </div>
        </div>
        <DottedLine />
        <div css={{ flexGrow: 1, overflowY: "auto" }}>
          <div css={styleInfoSection}>
            <div css={{ display: "flex", gap: "8px" }}>
              <LocationOnRoundedIcon style={styleIcon} />
              <div css={{ ...styleInfo, ...theme.font14_bold }}>
                {roomInfo.from?.koName}&nbsp; → &nbsp;{roomInfo.to?.koName}
              </div>
            </div>
            <div css={{ height: "16px" }} />
            <div css={{ display: "flex", gap: "8px" }}>
              <CalendarTodayRoundedIcon style={styleIcon} />
              <div css={styleInfo}>{day2str(dayjs(roomInfo.time))}</div>
            </div>
          </div>
          <DottedLine />
          <div css={styleInfoSection}>
            <div css={{ display: "flex", gap: "8px" }}>
              <PeopleAltRoundedIcon style={styleIcon} />
              <div css={{ ...styleInfo }}>
                참여 / 최대 인원 :{" "}
                <span css={theme.font14_bold}>{roomInfo.part.length}명</span>{" "}
                <span css={{ color: theme.gray_text }}>
                  / {roomInfo.maxPartLength}명
                </span>
              </div>
            </div>
            <div css={styleUsers}>
              {roomInfo.part.map((item) => (
                <User key={item._id} value={item} isDeparted={isDeparted} />
              ))}
            </div>
          </div>
          <DottedLine />
          {taxiFare !== 0 ? (
            <>
              <div css={styleInfoSection}>
                <div css={{ display: "flex", gap: "8px" }}>
                  <WalletRoundedIcon style={styleIcon} />
                  <div css={{ ...styleInfo }}>
                    예상 택시비 : {taxiFare.toLocaleString("ko-KR")}원
                  </div>
                </div>
              </div>
              <DottedLine />
            </>
          ) : null}
          <SideMenuButton type="share" onClick={onClikcShare} />
          <DottedLine />
          <SideMenuButton type="taxi" onClick={onClickCallTaxi} />
          {!isAlone && (
            <>
              <DottedLine />
              <SideMenuButton type="report" onClick={onClickReport} />
            </>
          )}
        </div>
        <DottedLine />
        <div css={styleNameSection} onClick={onClickCancel}>
          <LogoutOutlinedIcon
            style={{
              fontSize: "24px",
              fill: isDeparted ? theme.gray_text : theme.purple,
              ...theme.cursor(isDeparted),
            }}
          />
          <div
            css={{
              color: isDeparted ? theme.gray_text : theme.purple,
              ...theme.font18,
              ...theme.cursor(isDeparted),
            }}
          >
            탑승 취소
          </div>
        </div>
        <div css={{ height: "env(safe-area-inset-bottom)" }} />
      </div>
      <ModalRoomShare
        isOpen={isOpenShare}
        onChangeIsOpen={setIsOpenShare}
        roomInfo={roomInfo}
      />
      <ModalChatCancel
        roomId={roomInfo._id}
        isOpen={isOpenCancel}
        onChangeIsOpen={setIsOpenCancel}
      />
      <ModalCallTaxi
        roomInfo={roomInfo}
        isOpen={isOpenCallTaxi}
        onChangeIsOpen={setIsOpenCallTaxi}
      />
      <ModalChatReport
        roomInfo={roomInfo}
        isOpen={isOpenReport}
        onChangeIsOpen={setIsOpenReport}
      />
    </>
  );
};

export default memo(SideMenu);
