import { css } from "@emotion/react";
import { useState } from "react";

import { useAxios } from "@/hooks/useTaxiAPI";

import ModalArrivalStatus from "@/components/ModalPopup/ModalArrivalStatus";

import loginInfoAtom from "@/atoms/loginInfo";
import { useRecoilValue } from "recoil";

import theme from "@/tools/theme";

import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

type ArrivalNotificationsProps = {
  roomInfo: Room;
  fetchRoomInfo: () => void;
};

const ArrivalNotifications = ({
  roomInfo,
  fetchRoomInfo,
}: ArrivalNotificationsProps) => {
  const loginInfo = useRecoilValue(loginInfoAtom);
  const axios = useAxios();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const myId = loginInfo?.oid;
  const myPart = roomInfo.part.find((user) => user._id === myId);
  const isArrived = myPart?.isArrived ?? false;

  const arrivedUsers = roomInfo.part.filter((user) => user.isArrived);
  const arrivedCount = arrivedUsers.length;
  const isSettlementStarted = !!roomInfo.settlementTotal;

  const onClickArrival = () => {
    axios({
      url: "/rooms/arrival",
      method: "post",
      data: {
        roomId: roomInfo._id,
        isArrived: !isArrived,
      },
      onSuccess: () => {
        fetchRoomInfo();
      },
      onError: (err: any) => {
        alert(`도착 확인 실패: ${err.response?.status || "Unknown Error"}`);
      },
    });
  };

  if (!myPart) return null;

  return (
    <>
      <div
        css={css`
          box-sizing: border-box;
          padding: 10px 20px;
          background: ${theme.gray_background};
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: ${theme.shadow_3};
          z-index: ${theme.zIndex_nav - 1};
        `}
      >
        <div
          css={{
            ...theme.font14,
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {isSettlementStarted ? (
            <span css={{ color: theme.black }}>
              <b>{arrivedCount}명</b> 도착 완료
            </span>
          ) : isArrived ? (
            <span css={{ color: theme.purple }}>
              <b>{arrivedCount}명</b>{" "}
              {arrivedCount === roomInfo.part.length ? "모두 도착!" : "도착"}
            </span>
          ) : (
            "출발지에 도착하셨나요?"
          )}
        </div>
        <div css={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => setIsOpenModal(true)}
            css={css`
              display: flex;
              align-items: center;
              gap: 6px;
              padding: 6px 12px;
              border-radius: 8px;
              border: none;
              background: ${theme.white};
              color: ${theme.black};
              box-shadow: ${theme.shadow_color_button};
              cursor: pointer;
              transition: all 0.2s;
              ${theme.font12_bold}

              &:hover {
                opacity: 0.9;
              }
            `}
          >
            현황
          </button>
          {!isSettlementStarted && (
            <button
              onClick={onClickArrival}
              css={css`
                display: flex;
                align-items: center;
                gap: 4px;
                padding: 6px 12px;
                border-radius: 8px;
                border: none;
                background: ${isArrived ? theme.purple : theme.white};
                color: ${isArrived ? theme.white : theme.black};
                box-shadow: ${theme.shadow_color_button};
                cursor: pointer;
                transition: all 0.2s;
                ${theme.font12_bold}

                &:hover {
                  opacity: 0.9;
                }
              `}
            >
              <CheckRoundedIcon style={{ fontSize: "16px" }} />
              {isArrived ? "도착 완료" : "도착"}
            </button>
          )}
        </div>
      </div>
      <ModalArrivalStatus
        roomInfo={roomInfo}
        isOpen={isOpenModal}
        onChangeIsOpen={setIsOpenModal}
      />
    </>
  );
};

export default ArrivalNotifications;
