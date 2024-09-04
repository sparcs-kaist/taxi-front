import { useCallback, useMemo, useRef, useState } from "react";

import {
  useFetchRecoilState,
  useIsLogin,
  useValueRecoilState,
} from "@/hooks/useFetchRecoilState";
import useQuery from "@/hooks/useTaxiAPI";
import { useAxios } from "@/hooks/useTaxiAPI";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import Button from "@/components/Button";
import Empty from "@/components/Empty";
import CreditAmountStatusContainer from "@/components/Event/CreditAmountStatusContainer";
import EventItemContainer from "@/components/Event/EventItemContainer";
import Footer from "@/components/Footer";
import HeaderWithLeftNav from "@/components/Header/HeaderWithLeftNav";
import ModalPurchaseSuccess from "@/components/ModalPopup/ModalPurchaseSuccess";
import ProfileImage from "@/components/User/ProfileImage";
import WhiteContainer from "@/components/WhiteContainer";

import alertAtom from "@/atoms/alert";
import { useSetRecoilState } from "recoil";

import { eventMode } from "@/tools/loadenv";
import theme from "@/tools/theme";

// ToDo : 2023fall 이미지
import { ReactComponent as TicketIcon } from "@/static/events/2024fallTicket.svg";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const LeaderboardTopBar = () => (
  <div
    css={{
      display: "flex",
      alignItems: "center",
      padding: "8px 12px",
      gap: "8px",
      ...theme.font12,
      color: theme.purple_disabled,
      marginTop: "4px",
    }}
  >
    <span>순위</span>
    <span css={{ marginLeft: "16px" }}>닉네임</span>
    <TicketIcon
      css={{
        marginLeft: "auto",
        width: "30px",
        height: "27px",
        marginTop: "-4px",
        marginBottom: "-4px",
        flexShrink: 0,
        transform: "rotate(-30deg)",
      }}
    />
    <span css={{ width: "56px" }}>당첨 확률</span>
  </div>
);

type LeaderboardElem = {
  nickname: string;
  profileImageUrl: string;
  amount: number;
  probability: number;
  rank: number;
};

type LeaderboardItemProps = {
  value: LeaderboardElem;
  rank: number;
  isMe?: boolean;
};

const LeaderboardItem = ({
  value,
  rank,
  isMe = false,
}: LeaderboardItemProps) => {
  const styleContainer = (index: number) => {
    switch (index) {
      case 0:
        return {
          color: "#C6B200",
          border: "0.5px solid #E4CD00",
          background: "#FFEE5A",
          boxShadow: "0px 1px 5px 0px #E4CD00",
          ...theme.font20,
          fontSize: "24px",
        };
      case 1:
        return {
          color: "#96BCC6",
          border: "0.5px solid #BBD4DA",
          background: "#EEF6F8",
          boxShadow: "0px 1px 5px 0px #BBD4DA",
          ...theme.font20,
          fontSize: "24px",
        };
      case 2:
        return {
          color: "#CD6830",
          border: "0.5px solid #DE8C5D",
          background: "#FFC5A4",
          boxShadow: "0px 1px 5px 0px #DE8C5D",
          ...theme.font20,
          fontSize: "24px",
        };
      case -1:
        return {
          color: theme.purple_disabled,
          background: theme.purple,
          boxShadow: theme.shadow,
          ...theme.font20,
        };
      default:
        return {
          color: theme.purple_disabled,
          background: theme.white,
          boxShadow: theme.shadow,
          ...theme.font20,
        };
    }
  };

  const styleText = (index: number) => {
    switch (index) {
      case 0:
        return "#6B6000";
      case 1:
        return "#337182";
      case 2:
        return "#9E3800";
      case -1:
        return theme.white;
      default:
        return theme.purple;
    }
  };

  const styleTicketText = {
    ...theme.font16,
    width: "30px",
    flexShrink: 0,
    textAlign: "center" as const,
  };

  return (
    <WhiteContainer
      css={{
        display: "flex",
        alignItems: "center",
        padding: "8px 15px",
        marginBottom: "8px",
        gap: "8px",
        ...styleContainer(isMe ? -1 : rank),
      }}
    >
      {rank}
      <div
        css={{
          width: "30px",
          height: "30px",
          borderRadius: "15px",
          overflow: "hidden",
          flexShrink: 0,
          flexGrow: 0,
          marginLeft: "5px",
        }}
      >
        <ProfileImage url={value.profileImageUrl} />
      </div>
      {isMe && (
        <div
          css={{
            width: "20px",
            height: "20px",
            ...theme.font12_bold,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: theme.purple_disabled,
            borderRadius: "5px",
            color: theme.purple,
          }}
        >
          나
        </div>
      )}
      <div
        css={{
          ...theme.font16_bold,
          ...theme.ellipsis,
          color: isMe ? theme.white : theme.black,
        }}
      >
        {value.nickname}
      </div>
      <span css={{ marginLeft: "auto", ...styleTicketText }}>
        {value.amount || 0}
      </span>
      <div
        css={{
          color: styleText(isMe ? -1 : rank),
          ...theme.font16_bold,
          width: "56px",
          flexShrink: 0,
          textAlign: "right",
        }}
        title={(value.probability * 100).toString()}
      >
        <span css={{ ...theme.font20 }}>
          {Math.trunc(value.probability * 100) || 0}
        </span>
        .{Math.floor(((value.probability * 100) % 1) * 10)}%
      </div>
    </WhiteContainer>
  );
};

interface Event2024FallStoreItemProps {
  itemId: string;
}

const Event2024FallStoreItem = ({ itemId }: Event2024FallStoreItemProps) => {
  const fetchEvent2024FallInfo = useFetchRecoilState("event2024FallInfo");
  const event2024FallInfo = useValueRecoilState("event2024FallInfo");
  const isLogin = useIsLogin();
  const isRequesting = useRef<boolean>(false);
  const [purchaseAmount, setPurchaseAmount] = useState<number>(1);
  const [isOpenPurchaseSuccess, setIsOpenPurchaseSuccess] =
    useState<boolean>(false);
  const setAlert = useSetRecoilState(alertAtom);
  const axios = useAxios();
  const changePurchaseAmountHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.valueAsNumber;
    if (value < 1 || isNaN(value)) {
      setPurchaseAmount(1);
    } else {
      setPurchaseAmount(value);
    }
  };

  const { leaderboard, totalAmount, totalUser, amount, probability, rank } =
    useQuery.get(`/events/2024fall/items/leaderboard/${itemId}`, null, [
      event2024FallInfo,
    ])[1] || {
      leaderboard: [],
      totalAmount: 0,
      totalUser: 0,
      amount: 0,
      probability: 0,
    };

  const { item } = useQuery.get("/events/2024fall/items/" + itemId)[1] || {
    item: null,
  };
  const { nickname, profileImgUrl } = useValueRecoilState("loginInfo") || {};
  const myLeaderboardInfo = useMemo<Nullable<LeaderboardElem>>(() => {
    if (!nickname || !profileImgUrl || !probability) return null;
    return {
      nickname,
      profileImageUrl: profileImgUrl,
      amount: amount || 0,
      probability,
      rank,
    };
  }, [nickname, profileImgUrl, probability]);

  const [isDisabled, buttonText] = useMemo(
    () =>
      eventMode !== "2024fall"
        ? [true, "이벤트 기간이 아닙니다"]
        : !event2024FallInfo || !isLogin
        ? [true, "로그인 후 구매가 가능합니다"]
        : event2024FallInfo.creditAmount < (item?.price * purchaseAmount || 0)
        ? [true, "송편코인이 부족합니다"]
        : [false, "응모권 구매하기"],
    [eventMode, event2024FallInfo, item, purchaseAmount]
  );

  const onClickOk = useCallback(async () => {
    if (isRequesting.current) return;
    isRequesting.current = true;
    await axios({
      url: `/events/2024fall/items/purchase/${item?._id}`,
      method: "post",
      data: {
        amount: purchaseAmount,
      },
      onSuccess: ({ reward }) => {
        fetchEvent2024FallInfo();
        setPurchaseAmount(1);
        setIsOpenPurchaseSuccess(true);
      },
      onError: () => setAlert("구매를 실패하였습니다."),
    });
    isRequesting.current = false;
  }, [item?._id, fetchEvent2024FallInfo, purchaseAmount]);

  // fetchItems,
  return (
    <>
      <HeaderWithLeftNav
        value="store"
        options={[
          { value: "store", label: "뽑기장", to: "/event/2024fall-store" },
          {
            value: "history",
            label: "구매 이력",
            to: "/event/2024fall-history",
          },
        ]}
      />
      <AdaptiveDiv type="center">
        <div
          css={{
            marginTop: "15px",
          }}
        >
          <CreditAmountStatusContainer />
        </div>
        <div
          css={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {item && (
            <EventItemContainer
              key={itemId}
              value={item}
              fetchItems={() => {}}
            />
          )}
          <WhiteContainer
            css={{
              width: "calc(50% - 24px)",
              flexBasis: "calc(50% - 24px)",
              boxSizing: "border-box",
              minWidth: "100px",
              padding: "12px 12px 0px 12px",
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
              gap: "12px",
              ...theme.font14,
            }}
          >
            <div
              css={{
                ...theme.font14,
              }}
            >
              <b>경품 수량</b>: {item?.realStock || 0}개
            </div>
            <div
              css={{
                ...theme.font14,
              }}
            >
              <b>발급한 사용자 수</b>
              <br />: {totalUser}명
            </div>
            <div
              css={{
                ...theme.font14,
              }}
            >
              <b>발급된 총 응모권 수</b>
              <div css={{ display: "flex", alignItems: "center" }}>
                :
                <TicketIcon
                  css={{
                    marginLeft: "5px",
                    marginRight: "5px",
                    width: "32px",
                    height: "30px",
                    marginTop: "-4px",
                    marginBottom: "-4px",
                  }}
                />{" "}
                X {totalAmount}개
              </div>
            </div>
            <div
              css={{
                ...theme.font14_bold,
                display: "flex",
                alignItems: "center",
              }}
            >
              <ShoppingCartIcon
                css={{
                  fontSize: "20px",
                  marginRight: "2px",
                }}
              />
              구매 수량:
              <input
                onChange={changePurchaseAmountHandler}
                type="number"
                style={{
                  ...theme.font14,
                  width: "41px",
                  borderRadius: "6px",
                  padding: "6px 0",
                  background: theme.purple_light,
                  boxShadow: theme.shadow_purple_input_inset,
                  border: "none",
                  outline: "none",
                  textAlign: "center",
                  marginLeft: "5px",
                }}
                value={purchaseAmount}
              />
            </div>
            <Button
              type="purple"
              css={{
                width: "100%",
                padding: "10px 0 9px",
                borderRadius: "8px",
                alignSelf: "center",
                marginTop: "10%",
                ...theme.font14_bold,
              }}
              onClick={onClickOk}
              disabled={isDisabled}
            >
              {buttonText}
            </Button>
          </WhiteContainer>
        </div>
        {leaderboard.length > 0 ? (
          <>
            <LeaderboardTopBar />
            {leaderboard.map((elem: LeaderboardElem, index: number) => (
              <LeaderboardItem
                key={index}
                rank={elem.rank}
                value={elem}
                isMe={index === rank - 1}
              />
            ))}
            {rank > 20 && myLeaderboardInfo && (
              <LeaderboardItem rank={rank - 1} value={myLeaderboardInfo} isMe />
            )}
            <div
              css={{
                color: theme.purple_disabled,
                ...theme.font12,
                marginTop: "20px",
              }}
            >
              • 리더보드에 표시되는 확률은 이상적인 가정 하에 계산된{" "}
              <b>상품에 당첨될 확률</b>의 근삿값으로, 실제 확률과 다를 수
              있습니다. <br />
              <br />• 확률의 총 합이 100%가 아닌 이유는 여러 사람이 상품에
              당첨될 수 있기 때문으로, 잘못된 계산이 아닙니다.
              <br />
              <br />• 확률은 다른 사용자의 참여에 따라 계속 변동될 수 있습니다.
            </div>
          </>
        ) : (
          <Empty type="mobile">리더보드가 비어있습니다.</Empty>
        )}
        <ModalPurchaseSuccess
          isOpen={isOpenPurchaseSuccess}
          onChangeIsOpen={setIsOpenPurchaseSuccess}
        />
      </AdaptiveDiv>
      <Footer type="event-2024fall" />
    </>
  );
}; // ToDo : 2023fall 문구 및 footer

export default Event2024FallStoreItem;
