import { memo, useMemo } from "react";

import type { Transaction } from "@/types/event2025fall";

import { useIsLogin, useValueRecoilState } from "@/hooks/useFetchRecoilState";
import useQuery from "@/hooks/useTaxiAPI";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import Empty from "@/components/Empty";
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
    useQuery.get("/events/2025spring/transactions")[1] || {};
  const purchaseHistory = useMemo(
    () =>
      (transactions || []).sort((x: Transaction, y: Transaction) =>
        dayjs(y.createdAt).diff(dayjs(x.createdAt))
      ),
    [transactions]
  ) as Array<Transaction>;
  const { quests } = useValueRecoilState("event2025FallInfo") || {};

  return (
    <>
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

const Event2025FallHistory = () => {
  const isLogin = useIsLogin();
  return (
    <>
      <HeaderWithLeftNav
        value="history"
        options={[
          {
            value: "store",
            label: "응모권 교환소",
            to: "/event/2025spring-store",
          },
          {
            value: "history",
            label: "구매 이력",
            to: "/event/2025spring-history",
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
              <b>📌 결과 발표일 : </b>3월 19일(수)
            </div>
            <div
              css={{
                ...theme.font14,
                marginBottom: "15px",
              }}
            >
              <div css={{ ...theme.font14, marginBottom: "5px" }}>
                1. 당첨되신 모든 경품은 이벤트 종료 후 실물 또는 기프티콘 형태로
                일괄 지급됩니다.
              </div>
              <div css={{ ...theme.font14, marginBottom: "0" }}>
                2. 하나의 경품은 1번만 당첨될 수 있지만, 여러 경품에 동시에
                당첨될 수는 있습니다.
              </div>
            </div>
            <div
              css={{
                ...theme.font14,
                marginBottom: "5px",
              }}
            >
              <b>🎁 지급 방법 :</b> 각 경품별 지급 방법은 아래와 같습니다.
            </div>
            <div css={{ ...theme.font14, marginBottom: "5px" }}>
              1. 에어팟 4 / 넙죽이 노트북 파우치 : 교양분관 SPARCS 동아리방에서
              실물을 수령하실 수 있습니다. 파우치의 경우 이벤트 참여 동의 때
              입력한 연락처로 사이즈를 확인할 예정입니다.
            </div>
            <div css={{ ...theme.font14, marginBottom: "0" }}>
              2. 그 외 경품 : 이벤트 참여 동의 때 입력한 연락처로 기프티콘을
              발송해 드립니다. 기프티콘의 유효 기간은 발급일로부터 30일입니다.
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
      <Footer type="event-2025spring" />
    </>
  );
};

export default memo(Event2025FallHistory);
