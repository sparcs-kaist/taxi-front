import { useValueRecoilState } from "hooks/useFetchRecoilState";

import WhiteContainer from "components/WhiteContainer";

import theme from "tools/theme";

import { ReactComponent as CreditIcon } from "static/events/2023fallCredit.svg";

const CreditAmountStatusContainer = () => {
  const eventInfo = useValueRecoilState("event2023FallInfo");
  return (
    <WhiteContainer
      css={{
        padding: "9px 16px",
        background: theme.purple,
        display: "flex",
        gap: "8px",
        alignItems: "center",
      }}
    >
      <div css={{ color: theme.white, ...theme.font16_bold, flexGrow: 1 }}>
        내가 모은 송편
      </div>
      <CreditIcon style={{ width: "27px", height: "16px" }} />
      <div css={{ color: theme.white, ...theme.font16_bold }}>
        {eventInfo?.creditAmount || 0}
      </div>
    </WhiteContainer>
  );
};

export default CreditAmountStatusContainer;
