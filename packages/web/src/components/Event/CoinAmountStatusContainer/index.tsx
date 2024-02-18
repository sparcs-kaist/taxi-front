import { useValueRecoilState } from "@/hooks/useFetchRecoilState";

import WhiteContainer from "@/components/WhiteContainer";

import eventTheme from "@/tools/eventTheme";
import theme from "@/tools/theme";

import CoinIcon from "@/static/events/2024springCoin.gif";

type CreditAmountStatusContainerProps = {} & Parameters<
  typeof WhiteContainer
>[0];

const CreditAmountStatusContainer = ({
  ...whiteContainerProps
}: CreditAmountStatusContainerProps) => {
  const { creditAmount } = useValueRecoilState("event2024SpringInfo") || {};

  return (
    <WhiteContainer
      css={{
        padding: "14px 16px",
        background: eventTheme.black,
        border: "1px solid #FFF",
      }}
      {...whiteContainerProps}
    >
      <div
        css={{
          display: "flex",
          gap: "8px",
          alignItems: "center",
        }}
      >
        <div css={{ color: theme.white, ...eventTheme.font16, flexGrow: 1 }}>
          새터 00반 넙죽코인
        </div>
        <img width="27px" src={CoinIcon} alt="coin" />
        <div css={{ color: theme.white, ...eventTheme.font16_bold }}>
          {creditAmount ? ("000" + creditAmount).slice(-4) : "000"}
        </div>
      </div>
      <div
        css={{
          display: "flex",
          gap: "4px",
          alignItems: "center",
          marginTop: "12px",
        }}
      >
        <div css={{ color: theme.white, ...eventTheme.font12, flexGrow: 1 }}>
          내가 획득한 넙죽코인
        </div>
        <img width="16px" src={CoinIcon} alt="coin" />
        <div css={{ color: theme.white, ...eventTheme.font12_bold }}>
          {creditAmount ? ("000" + creditAmount).slice(-4) : "000"}
        </div>
      </div>
    </WhiteContainer>
  );
};

export default CreditAmountStatusContainer;
