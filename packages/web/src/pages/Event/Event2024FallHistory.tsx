import { memo, useMemo } from "react";

import type { Transaction } from "@/types/event2024fall";

import { useIsLogin, useValueRecoilState } from "@/hooks/useFetchRecoilState";
import useQuery from "@/hooks/useTaxiAPI";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import Empty from "@/components/Empty";
import CreditAmountStatusContainer from "@/components/Event/CreditAmountStatusContainer";
import Footer from "@/components/Footer";
import HeaderWithLeftNav from "@/components/Header/HeaderWithLeftNav";
import Title from "@/components/Title";
import WhiteContainer from "@/components/WhiteContainer";
import WhiteContainerSuggestLogin from "@/components/WhiteContainer/WhiteContainerSuggestLogin";

import dayjs, { day2str } from "@/tools/day";
import theme from "@/tools/theme";

type HistoryItemProps = {
  imageUrl: string;
  title: string;
  description: string;
  date: Date;
};

const HistoryItem = ({
  imageUrl,
  title,
  description,
  date,
}: HistoryItemProps) => (
  <WhiteContainer
    css={{
      padding: "12px",
      display: "flex",
      alignItems: "stretch",
      gap: "10px",
    }}
  >
    <div
      css={{
        width: "25%",
        flexShrink: 0,
      }}
    >
      <div
        css={{
          border: `1px solid ${theme.gray_line}`,
          borderRadius: "10px",
          overflow: "hidden",
          backgroundColor: theme.white,
          aspectRatio: "1 / 1",
        }}
      >
        <img src={imageUrl} css={{ width: "100%" }} />
      </div>
    </div>
    <div
      css={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div css={{ ...theme.font16_bold }}>{title}</div>
      <div css={{ ...theme.font14, marginTop: "5px" }}>{description}</div>
      <div css={{ ...theme.font12, color: theme.gray_text, marginTop: "auto" }}>
        {day2str(dayjs(date))}
      </div>
    </div>
  </WhiteContainer>
);

const HistorySection = () => {
  const { transactions } =
    useQuery.get("/events/2024fall/transactions")[1] || {};
  const purchaseHistory = useMemo(
    () =>
      (transactions || []).sort((x: Transaction, y: Transaction) =>
        dayjs(y.createdAt).diff(dayjs(x.createdAt))
      ),
    [transactions]
  ) as Array<Transaction>;
  const { quests } = useValueRecoilState("event2024FallInfo") || {};

  return (
    <>
      <Title icon="ticket" isHeader>
        획득한 응모권
      </Title>
      <CreditAmountStatusContainer type="ticket" />
      <Title icon="shop" isHeader>
        구매 이력
      </Title>
      {purchaseHistory.length > 0 ? (
        purchaseHistory.map(
          ({ comment, createdAt, questId, item }: Transaction) => {
            if (questId) {
              const quest = quests?.find((quest) => quest.id === questId);
              return (
                <HistoryItem
                  imageUrl={quest?.imageUrl || ""}
                  title={quest?.name || ""}
                  description={comment}
                  date={createdAt}
                />
              );
            } else if (item) {
              return (
                <HistoryItem
                  imageUrl={item.imageUrl}
                  title={item.name}
                  description={comment}
                  date={createdAt}
                />
              );
            } else {
              return null;
            }
          }
        )
      ) : (
        <Empty type="mobile">구매 이력이 없습니다.</Empty>
      )}
    </>
  );
};

const Event2024FallHistory = () => {
  const isLogin = useIsLogin();
  return (
    <>
      <HeaderWithLeftNav
        value="history"
        options={[
          {
            value: "store",
            label: "응모권 교환소",
            to: "/event/2024fall-store",
          },
          {
            value: "history",
            label: "구매 이력",
            to: "/event/2024fall-history",
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
                marginBottom: "5px",
              }}
            >
              <b>📌 상품 지급일 : </b>10월 13일(금)
            </div>
            <div
              css={{
                ...theme.font14,
                marginBottom: "15px",
              }}
            >
              구매하신 모든 아이템은 이벤트 종료 후 교환권 또는 기프티콘 형태로
              일괄 지급됩니다.
            </div>
            <div
              css={{
                ...theme.font14,
                marginBottom: "5px",
              }}
            >
              <b>🎁 지급 방법 :</b> 각 상품 별 지급 방법은 아래와 같습니다.
            </div>
            <div css={{ ...theme.font14, marginBottom: "5px" }}>
              1. 북측 매점 교환권 / 교내 엔제리너스 아이스 아메리카노 S: (엔터
              넣어주세요) 교양분관 SPARCS 동방에서 교환권을 수령하실 수
              있습니다.
            </div>
            <div css={{ ...theme.font14, marginBottom: "5px" }}>
              2. BBQ 황금올리브+콜라 1.25L / 오색송편: 이벤트 참여 때 등록한
              연락처로 기프티콘을 발송해 드립니다.
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
      <Footer type="event-2024fall" />
    </>
  );
};
// ToDo : 2023fall 문구 및 footer
export default memo(Event2024FallHistory);
