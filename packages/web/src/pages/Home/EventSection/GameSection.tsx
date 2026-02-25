import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useFetchRecoilState } from "@/hooks/useFetchRecoilState";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import Button from "@/components/Button";
import CreditAmountStatusContainer from "@/components/Event/CreditAmountStatusContainer";
import Title from "@/components/Title";

import theme from "@/tools/theme";

const GameSection = () => {
  const fetchGameInfo = useFetchRecoilState("gameInfo");

  useEffect(() => {
    fetchGameInfo();
  }, []);

  return (
    <AdaptiveDiv type="center">
      <Title icon="festival" isHeader>
        택시 강화하기
      </Title>
      <CreditAmountStatusContainer />
      <div css={{ display: "flex", gap: "15px" }}>
        <Link
          to="/game/main"
          css={{ width: 0, flexGrow: 1, textDecoration: "none" }}
        >
          <Button
            type="purple"
            css={{
              padding: "14px 0 13px",
              borderRadius: "12px",
              ...theme.font16_bold,
            }}
          >
            강화 메인 페이지 이동
          </Button>
        </Link>
      </div>
    </AdaptiveDiv>
  );
};

export default GameSection;
