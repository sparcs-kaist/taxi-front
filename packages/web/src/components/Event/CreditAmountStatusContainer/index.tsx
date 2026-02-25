import { useValueRecoilState } from "@/hooks/useFetchRecoilState";

import WhiteContainer from "@/components/WhiteContainer";

import theme from "@/tools/theme";

import { ReactComponent as Ticket1Icon } from "@/static/events/2023fallTicket1.svg";
import { ReactComponent as Ticket2Icon } from "@/static/events/2023fallTicket2.svg";
import coinGif from "@/static/events/2024springCoin.gif";

type CreditAmountStatusContainerProps = {
  type?: "credit" | "ticket" | "doubleTicket";
} & Parameters<typeof WhiteContainer>[0];

const CreditAmountStatusContainer = ({
  type = "credit",
  ...whiteContainerProps
}: CreditAmountStatusContainerProps) => {
  // 2025 spring과 변수명이 겹쳐 잠시 비활성화.
  // const { creditAmount } = useValueRecoilState("event2025SpringInfo") || {};
  const { ticket1Amount, ticket2Amount } =
    useValueRecoilState("event2024SpringInfo") || {};
  const { creditAmount, level } = useValueRecoilState("gameInfo") || {};

  return (
    <WhiteContainer
      css={{
        padding: "12px 16px",
        display: "flex",
        flexDirection: type === "credit" ? "column" : "row",
        alignItems: type === "credit" ? "flex-start" : "center",
        justifyContent: type === "credit" ? "space-between" : "flex-start",
        gap: type === "credit" ? "0px" : "8px",
        minHeight: type === "credit" ? "auto" : "auto",
        position: "relative",
        marginBottom: "12px",
      }}
      {...whiteContainerProps}
    >
      {type === "credit" ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div
              css={{
                color: theme.black,
                ...theme.font14,
                fontWeight: "bold",
              }}
            >
              현재 택시
            </div>
            <div
              css={{
                color: theme.purple,
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              {level !== undefined ? `+${level}강` : "로딩중..."}
            </div>
          </div>

          <div
            css={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              marginTop: "auto",
              backgroundColor: theme.purple_light,
              padding: "4px 8px",
              borderRadius: "8px",
            }}
          >
            <img
              src={coinGif}
              alt="coin"
              style={{ width: "16px", height: "16px", objectFit: "contain" }}
            />
            <div css={{ color: theme.purple, ...theme.font14_bold }}>
              {creditAmount ? creditAmount.toLocaleString() : 0}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div css={{ color: theme.white, ...theme.font16_bold, flexGrow: 1 }}>
            {type === "ticket" ? "내가 모은 응모권" : "일반 / 고급 응모권"}
          </div>
          {type === "ticket" ? (
            <>
              <Ticket2Icon css={{ width: "27px", height: "27px" }} />
              <div css={{ color: theme.white, ...theme.font16_bold }}>
                {creditAmount || 0}
              </div>
            </>
          ) : (
            <>
              <Ticket1Icon css={{ width: "27px", height: "27px" }} />
              <div css={{ color: theme.white, ...theme.font16_bold }}>
                {ticket1Amount || 0}
              </div>
              <div css={{ marginLeft: "-4px" }} />

              <Ticket2Icon css={{ width: "27px", height: "27px" }} />
              <div css={{ color: theme.white, ...theme.font16_bold }}>
                {ticket2Amount || 0}
              </div>
            </>
          )}
        </>
      )}
    </WhiteContainer>
  );
};

export default CreditAmountStatusContainer;
