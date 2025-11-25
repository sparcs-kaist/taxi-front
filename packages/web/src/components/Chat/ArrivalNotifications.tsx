import { css } from "@emotion/react";
import { useState } from "react";

import { useAxios } from "@/hooks/useTaxiAPI";

import Button from "@/components/Button";
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

  const styleContainer = css`
    box-sizing: border-box;
    padding: 10px 20px;
    background: ${theme.gray_background};
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: ${theme.shadow_3};
    z-index: ${theme.zIndex_nav - 1};
  `;

  const styleText = {
    ...theme.font14,
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };

  const styleButton = {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    padding: "6px 12px",
    borderRadius: "8px",
    border: "none",
    boxShadow: theme.shadow_color_button,
    ...theme.font12_bold,
  };

  return (
    <>
      <div css={styleContainer}>
        <div css={styleText}>
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
          <Button
            type="white"
            onClick={() => setIsOpenModal(true)}
            css={{
              ...styleButton,
              color: theme.black,
            }}
          >
            현황
          </Button>
          {!isSettlementStarted && (
            <Button
              type={isArrived ? "purple" : "white"}
              onClick={onClickArrival}
              css={{
                ...styleButton,
                color: isArrived ? theme.white : theme.black,
              }}
            >
              <CheckRoundedIcon style={{ fontSize: "16px" }} />
              {isArrived ? "도착 완료" : "도착"}
            </Button>
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
