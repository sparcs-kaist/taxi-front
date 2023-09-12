import { memo, useMemo } from "react";

import type { Transaction } from "types/event2023fall";

import { useValueRecoilState } from "hooks/useFetchRecoilState";
import useQuery from "hooks/useTaxiAPI";

import AdaptiveDiv from "components/AdaptiveDiv";
import DottedLine from "components/DottedLine";
import CreditAmountStatusContainer from "components/Event/CreditAmountStatusContainer";
import HeaderWithLeftNav from "components/Header/HeaderWithLeftNav";
import Title from "components/Title";
import WhiteContainer from "components/WhiteContainer";
import WhiteContainerSuggestLogin from "components/WhiteContainer/WhiteContainerSuggestLogin";

import dayjs, { day2str } from "tools/day";
import theme from "tools/theme";

const HistorySection = () => {
  const { transactions } =
    useQuery.get("/events/2023fall/transactions")[1] || {};
  const purchaseHistory = useMemo(
    () =>
      (transactions || [])
        .filter(({ type }: Transaction) => type === "use")
        .sort((x: Transaction, y: Transaction) =>
          dayjs(y.doneat).diff(dayjs(x.doneat))
        ),
    [transactions]
  ) as Array<Transaction>;

  return (
    <>
      <Title icon="ticket" isHeader>
        획득한 응모권
      </Title>
      <CreditAmountStatusContainer type="ticket" />
      <Title icon="shop" isHeader>
        구매 이력
      </Title>
      {purchaseHistory.map(
        ({ _id, amount, eventId, itemId, comment, doneat }: Transaction) => (
          <WhiteContainer key={_id} css={{ padding: "12px" }}>
            <div
              css={{
                ...theme.font12_bold,
                color: theme.purple,
                margin: "0 8px",
                marginBottom: "12px",
              }}
            >
              {comment}
            </div>
            <DottedLine />
            <div css={{ padding: "12px 8px 0" }}>
              <div css={{ ...theme.font12 }}>
                <b>구매 아이디</b> : {_id}
                <br />
                <b>구매 상품</b> : {itemId || ""}
                <br />
                <b>차감된 송편</b> : {amount || ""}
                <br />
                <b>구매 시각</b> : {day2str(dayjs(doneat))}
              </div>
            </div>
          </WhiteContainer>
        )
      )}
    </>
  );
};

const Event2023FallHistory = () => {
  const isLogin = !!useValueRecoilState("loginInfo")?.id;
  return (
    <>
      <HeaderWithLeftNav
        value="history"
        options={[
          { value: "store", label: "달토끼 상점", to: "/event/2023fall-store" },
          {
            value: "history",
            label: "구매 이력",
            to: "/event/2023fall-history",
          },
        ]}
      />
      <AdaptiveDiv type="center">
        <Title icon="notice" isHeader>
          안내
        </Title>
        <WhiteContainer>
          <div
            css={{
              ...theme.font14,
              color: theme.black,
              margin: "0 4px",
            }}
          >
            <div
              css={{
                ...theme.font14,
                marginBottom: "10px",
              }}
            >
              모든 상품은 이벤트 종료 후 일괄 지급됩니다.
            </div>
            <div
              css={{
                ...theme.font14,
                marginBottom: "10px",
              }}
            >
              <b css={{ color: theme.purple }}>택시 탑승 인증 이벤트</b> 및{" "}
              <b css={{ color: theme.purple }}>인스타그램 공유 이벤트</b> 절찬리
              진행 중!
            </div>
            <div
              css={{
                ...theme.font14,
                gap: "10px",
                alignItems: "center",
                lineHeight: "1.2rem",
              }}
            >
              <b>📌 추첨 결과 발표 : </b>5/3(수) ~ 5/15(월) <br />
              <b>🎁 경품 : </b>에어팟 3세대 (1명), 택시비 카카오페이 상품권
              5000원 (12명)
            </div>
          </div>
        </WhiteContainer>
        {isLogin ? (
          <HistorySection />
        ) : (
          <>
            <Title icon="shop" isHeader>
              구매 이력
            </Title>
            <WhiteContainerSuggestLogin />
          </>
        )}
      </AdaptiveDiv>
    </>
  );
};

export default memo(Event2023FallHistory);
