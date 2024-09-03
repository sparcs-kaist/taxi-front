import { useValueRecoilState } from "@/hooks/useFetchRecoilState";

import WhiteContainer from "@/components/WhiteContainer";

import theme from "@/tools/theme";

import { ReactComponent as CreditIcon } from "@/static/events/2023fallCredit.svg";

type CreditAmountStatusContainerProps = {
  type?: "credit";
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
        내가 모은 송편
      </div>
      <>
        <CreditIcon css={{ width: "27px", height: "16px" }} />
        <div css={{ color: theme.white, ...theme.font16_bold }}>
          {creditAmount || 0}
        </div>
      </>
    </WhiteContainer>
  );
};

export default CreditAmountStatusContainer;
