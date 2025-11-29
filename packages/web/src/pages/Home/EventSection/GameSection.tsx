import { ReactElement } from "react";
import { Link } from "react-router-dom";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import CreditAmountStatusContainer from "@/components/Event/CreditAmountStatusContainer";
import WhiteContainerSuggestJoinEvent from "@/components/Event/WhiteContainerSuggestJoinEvent";
import Title from "@/components/Title";
import WhiteContainer from "@/components/WhiteContainer";

import theme from "@/tools/theme";
import Button from "@/components/Button";

const GameSection = () => {
  return (
    <AdaptiveDiv type="center">
      <Title icon="festival" isHeader>
        택시 강화하기
      </Title>
      <CreditAmountStatusContainer />
      <div css={{ display: "flex", gap: "15px" }}>
        <Link to="/game/main" css={{ width: 0, flexGrow: 1 }}>
          <Button
            type="purple"
            css={{ padding: "14px 0 13px", borderRadius: "12px", ...theme.font16_bold }}
          >강화 메인 페이지 이동
          </Button>
        </Link>
      </div>
    </AdaptiveDiv>
  );
};

export default GameSection;
