import { useValueRecoilState } from "@/hooks/useFetchRecoilState";

import eventTheme from "@/tools/eventTheme";

import coin from "@/static/events/2024springCoin.gif";

const CreditAmountContainer = () => {
  const { creditAmount } = useValueRecoilState("event2024SpringInfo") || {};

  return (
    <div
      css={{
        ...eventTheme.font16_bold,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        color: eventTheme.white,
      }}
    >
      <img width="24px" src={coin} alt="coin" />
      {creditAmount ? ("000" + creditAmount).slice(-4) : "000"}
    </div>
  );
};

export default CreditAmountContainer;
