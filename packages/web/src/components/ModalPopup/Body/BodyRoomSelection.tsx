import { useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import {
  useFetchRecoilState,
  useIsLogin,
  useValueRecoilState,
} from "@/hooks/useFetchRecoilState";
import useIsTimeOver from "@/hooks/useIsTimeOver";
import { useAxios } from "@/hooks/useTaxiAPI";

import Button from "@/components/Button";
import DottedLine from "@/components/DottedLine";
import LinkLogin from "@/components/Link/LinkLogin";
import MiniCircle from "@/components/MiniCircle";
import Users from "@/components/User/Users";
import { MAX_PARTICIPATION } from "@/pages/Myroom";

import alertAtom from "@/atoms/alert";
import { useSetRecoilState } from "recoil";

import { dayServerToClient } from "@/tools/day";
import { date2str } from "@/tools/moment";
import theme from "@/tools/theme";
import { getLocationName } from "@/tools/trans";

import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";

type PlaceSectionProps = {
  type: "from" | "to";
  name: string;
};
type InfoSectionProps = {
  title: string;
  alignDirection: "left" | "right";
  children: React.ReactNode;
};
export type BodyRoomSelectionProps = {
  roomInfo: Room;
};

const PlaceSection = ({ type, name }: PlaceSectionProps) => (
  <div
    css={{
      display: "flex",
      flexDirection: "column" as any,
      justifyContent: "center",
      alignItems: "center",
      margin: "16px 12px 10px",
      flex: "1 1 0",
    }}
  >
    <MiniCircle type={type} />
    <p
      css={{
        ...theme.font12,
        color: theme.gray_text,
        margin: "5px 0 1px",
      }}
    >
      {type === "from" ? "출발지" : "도착지"}
    </p>
    <div
      css={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "39px",
        width: "100%",
      }}
    >
      <p
        css={{
          ...theme.font16_bold,
          color: theme.purple,
          textAlign: "center" as any,
          wordBreak: "keep-all" as any,
        }}
      >
        {name}
      </p>
    </div>
  </div>
);

const InfoSection = ({ title, alignDirection, children }: InfoSectionProps) => (
  <div>
    <p
      css={{
        ...theme.font12,
        color: theme.gray_text,
        marginBottom: "5px",
        textAlign: alignDirection,
      }}
    >
      {title}
    </p>
    {children}
  </div>
);

const BodyRoomSelection = ({ roomInfo }: BodyRoomSelectionProps) => {
  const { i18n } = useTranslation();
  const axios = useAxios();
  const history = useHistory();

  const onCall = useRef(false);
  const loginInfo = useValueRecoilState("loginInfo");
  const myRooms = useValueRecoilState("myRooms");
  const fetchMyRooms = useFetchRecoilState("myRooms");
  const setAlert = useSetRecoilState(alertAtom);

  const isLogin = useIsLogin() && !!loginInfo?.id; // 로그인 여부
  const isRoomFull = roomInfo && roomInfo.part.length >= roomInfo.maxPartLength; // 방이 꽉 찼는지 여부
  const isAlreadyPart =
    isLogin &&
    roomInfo &&
    (roomInfo.part.some(
      (user: Room["part"][number]) => user._id === loginInfo.oid
    ) ??
      true); // 이미 참여 중인지 여부
  const isMaxPart =
    isLogin && myRooms && myRooms.ongoing.length >= MAX_PARTICIPATION; // 최대 참여 가능한 방 개수를 초과했는지 여부
  const isDepart = useIsTimeOver(dayServerToClient(roomInfo.time)); // 방 출발 여부

  const requestJoin = useCallback(async () => {
    if (isAlreadyPart) {
      // 이미 참여 중인 방에서 버튼을 누르면 API 호출 관련 로직을 건너뛰고 해당 방으로 이동합니다.
      history.push(`/myroom/${roomInfo._id}`);
      return;
    }
    // 여기부터는 이미 참여 중인 방이 아닌 경우의 로직입니다.
    if (onCall.current) return;
    onCall.current = true;
    await axios({
      url: "/rooms/join",
      method: "post",
      data: { roomId: roomInfo._id },
      onSuccess: () => {
        fetchMyRooms();
        history.push(`/myroom/${roomInfo._id}`);
      },
      onError: () => setAlert("방 참여에 실패하였습니다."),
    });
    onCall.current = false;
  }, [roomInfo?._id, history]);

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
    overflow: "hidden",
    columnGap: "12px",
    justifyContent: "space-between",
  };

  return (
    <>
      <DottedLine />
      <div css={stylePlace}>
        <PlaceSection
          type="from"
          name={getLocationName(roomInfo.from, i18n.language)}
        />
        <ArrowRightAltRoundedIcon style={styleArrow} />
        <PlaceSection
          type="to"
          name={getLocationName(roomInfo.to, i18n.language)}
        />
      </div>
      <DottedLine />
      <div css={styleInfoSectionWrapper}>
        <InfoSection title="출발 시각 & 날짜" alignDirection="left">
          <p css={theme.font14_bold}>{date2str(roomInfo.time) ?? ""}</p>
        </InfoSection>
        <div css={styleMultipleInfo}>
          <div css={{ minWidth: 0 }}>
            <InfoSection title="탑승자" alignDirection="left">
              <Users values={roomInfo.part} />
            </InfoSection>
          </div>
          <div css={{ minWidth: "fit-content" }}>
            <InfoSection title="참여 / 최대 인원" alignDirection="right">
              <div css={{ display: "flex", justifyContent: "end" }}>
                <p
                  css={{ ...theme.font14_bold, color: theme.purple }}
                >{`${roomInfo?.part?.length}명`}</p>
                <p css={theme.font14}>
                  &nbsp;{`/ ${roomInfo?.maxPartLength}명`}
                </p>
              </div>
            </InfoSection>
          </div>
        </div>
      </div>
      {isLogin || isRoomFull || isDepart ? (
        <Button
          type="purple"
          disabled={(isRoomFull || isDepart || isMaxPart) && !isAlreadyPart}
          css={{
            padding: "10px 0 9px",
            borderRadius: "8px",
            ...theme.font14_bold,
          }}
          onClick={requestJoin}
        >
          {isDepart && !isAlreadyPart
            ? "출발 시각이 현재 이전인 방은 참여할 수 없습니다"
            : isAlreadyPart
            ? "이미 참여 중입니다 : 바로가기"
            : isRoomFull
            ? "남은 인원이 0명인 방은 참여할 수 없습니다"
            : isMaxPart
            ? "현재 5개의 방에 참여 중입니다"
            : "참여 신청"}
        </Button>
      ) : (
        <LinkLogin redirect={`/home/${roomInfo?._id}`}>
          <Button
            type="purple"
            css={{
              padding: "10px 0 9px",
              borderRadius: "8px",
              ...theme.font14_bold,
            }}
          >
            로그인 후 참여 신청
          </Button>
        </LinkLogin>
      )}
    </>
  );
};

export default BodyRoomSelection;
