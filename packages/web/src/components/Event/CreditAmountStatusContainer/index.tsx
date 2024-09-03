import { useValueRecoilState } from "@/hooks/useFetchRecoilState";

import WhiteContainer from "@/components/WhiteContainer";

import theme from "@/tools/theme";

import { ReactComponent as CreditIcon } from "@/static/events/2023fallCredit.svg";
// ToDo : 2023fall 이미지
import { ReactComponent as Ticket1Icon } from "@/static/events/2023fallTicket1.svg";
// ToDo : 2023fall 이미지
import { ReactComponent as Ticket2Icon } from "@/static/events/2023fallTicket2.svg";

// ToDo : 2023fall 이미지

type CreditAmountStatusContainerProps = {
  type?: "credit" | "ticket";
} & Parameters<typeof WhiteContainer>[0];

const CreditAmountStatusContainer = ({
  type = "credit",
  ...whiteContainerProps
}: CreditAmountStatusContainerProps) => {
  const { creditAmount } = useValueRecoilState("event2024FallInfo") || {};

  return (
    <WhiteContainer
      css={{
        padding: "9px 16px",
        background: theme.purple,
        display: "flex",
        gap: "8px",
        alignItems: "center",
      }}
      {...whiteContainerProps}
    >
      <div css={{ color: theme.white, ...theme.font16_bold, flexGrow: 1 }}>
        {type === "credit" ? "내가 모은 송편" : "일반 / 고급 응모권"}
      </div>
      <>
        <CreditIcon css={{ width: "27px", height: "16px" }} />
        <div css={{ color: theme.white, ...theme.font16_bold }}>
          {creditAmount || 0}
        </div>
      </>
      {/* {type === "credit" ? (
      ) : (
        <>
          <Ticket1Icon
            css={{
              width: "27px",
              height: "27px",
              marginTop: "-4px",
              marginBottom: "-4px",
            }}
          />
          <div css={{ color: theme.white, ...theme.font16_bold }}>
            {ticket1Amount || 0}
          </div>
          <div css={{ marginLeft: "-4px" }} />
          <Ticket2Icon
            css={{
              width: "27px",
              height: "27px",
              marginTop: "-4px",
              marginBottom: "-4px",
            }}
          />
          <div css={{ color: theme.white, ...theme.font16_bold }}>
            {ticket2Amount || 0}
          </div>
        </>
      )} */}
    </WhiteContainer>
  );
};

export default CreditAmountStatusContainer;
