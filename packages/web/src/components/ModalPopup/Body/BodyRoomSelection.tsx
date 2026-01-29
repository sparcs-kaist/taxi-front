import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import CarrierOptionRow from "@/components/ModalRoomOptions/CarrierOptionRow";
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
  onToggleCarrier?: () => void; // (혹시 몰라 남겨두지만 이번엔 안 씀)
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

  // 참여 시 캐리어 지참 여부 상태 (기본값 false)
  const [joinWithCarrier, setJoinWithCarrier] = useState(false);

  const isLogin = useIsLogin() && !!loginInfo?.id;
  const isRoomFull = roomInfo && roomInfo.part.length >= roomInfo.maxPartLength;

  const isAlreadyPart =
    isLogin &&
    roomInfo &&
    (roomInfo.part.some(
      (user: Room["part"][number]) => user._id === loginInfo.oid
    ) ??
      true);

  const isMaxPart =
    isLogin && myRooms && myRooms.ongoing.length >= MAX_PARTICIPATION;
  const isDepart = useIsTimeOver(dayServerToClient(roomInfo.time));

  const notPaid = useMemo(() => {
    const myOngoingRoom = myRooms?.ongoing.slice() ?? [];
    const notPaid = myOngoingRoom.find(
      (room) =>
        room.part.find((item: any) => item._id === loginInfo?.oid)
          ?.isSettlement === "send-required" && room.isDeparted
    );
    return notPaid;
  }, [myRooms, loginInfo]);

  const participantsWithCarrier = useMemo(() => {
    if (!roomInfo?.part) return [];
    return roomInfo.part.map((user: any) => ({
      ...user,
      withCarrier: user.hasCarrier || false,
    }));
  }, [roomInfo.part]);

  const requestJoin = useCallback(async () => {
    // 이미 참여 중이면 이동만
    if (isAlreadyPart) {
      history.push(`/myroom/${roomInfo._id}`);
      return;
    }

    if (onCall.current) return;
    onCall.current = true;

    await axios({
      url: "/rooms/join",
      method: "post",
      data: { roomId: roomInfo._id },
      onSuccess: async () => {
        // 만약 캐리어를 들고 탄다고 체크했다면 토글 API 추가 호출
        if (joinWithCarrier) {
          try {
            await axios({
              url: "/rooms/carrier/toggle",
              method: "post",
              data: {
                roomId: roomInfo._id,
                hasCarrier: true,
              },
              // ...
            });
          } catch (e) {
            console.error("캐리어 상태 반영 실패", e);
          }
        }

        // 내 방 목록 갱신 및 페이지 이동
        fetchMyRooms();
        history.push(`/myroom/${roomInfo._id}`);
      },
      onError: () => setAlert("방 참여에 실패하였습니다."),
    });

    onCall.current = false;
  }, [roomInfo?._id, history, isAlreadyPart, joinWithCarrier]); // 의존성 유지

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
  }, []);

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
              <Users values={participantsWithCarrier} />
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
        {taxiFare !== 0 ? (
          <InfoSection title="참여 시 예상 택시비" alignDirection="left">
            <div css={{ display: "flex", justifyContent: "start" }}>
              <p css={theme.font14}>{`${taxiFare.toLocaleString("ko-KR")}원 / ${
                roomInfo?.part?.length +
                (isAlreadyPart || isDepart || isRoomFull ? 0 : 1)
              }명`}</p>
              <p css={theme.font14_bold}>
                &nbsp;
                {`= 인당 ${Math.floor(
                  taxiFare /
                    (roomInfo?.part?.length +
                      (isAlreadyPart || isDepart || isRoomFull ? 0 : 1))
                ).toLocaleString("ko-KR")}원`}
              </p>
            </div>
          </InfoSection>
        ) : null}
      </div>

      {!isAlreadyPart && !isRoomFull && !isDepart && isLogin && (
        <div
          css={{ marginTop: "-5px", marginBottom: "12px", padding: "0 10px" }}
        >
          <CarrierOptionRow
            value={joinWithCarrier}
            handler={setJoinWithCarrier}
          />{" "}
        </div>
      )}

      {isLogin || isRoomFull || isDepart ? (
        <Button
          type="purple"
          disabled={
            (notPaid || isRoomFull || isDepart || isMaxPart) && !isAlreadyPart
          }
          css={{
            padding: "10px 0 9px",
            borderRadius: "8px",
            ...theme.font14_bold,
          }}
          onClick={requestJoin}
        >
          {isAlreadyPart
            ? "이미 참여 중입니다 : 바로가기"
            : notPaid
              ? "결제자에게 송금이 완료되지 않은 방이 있습니다"
              : isDepart
                ? "출발 시각이 현재 이전인 방은 참여할 수 없습니다"
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
