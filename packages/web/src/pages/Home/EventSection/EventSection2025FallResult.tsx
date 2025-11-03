import { Link } from "react-router-dom";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import Button from "@/components/Button";
import Title from "@/components/Title";
import WhiteContainer from "@/components/WhiteContainer";

import theme from "@/tools/theme";

const EventSection2025FallResult = () => {
  const styleText = {
    ...theme.font14,
    marginBottom: "12px",
  };
  const styleButton = {
    padding: "14px 0 13px",
    borderRadius: "12px",
    ...theme.font14_bold,
  };

  return (
    <AdaptiveDiv type="center">
      <Title icon="festival" isHeader>
        뱃지 이벤트
      </Title>
      <WhiteContainer>
        <div css={styleText}>
          <b>🎉 경품 추첨 결과 발표 및 상품 수령 안내</b>
        </div>
        <div css={styleText}>
          많은 관심을 가지고 이벤트에 참여해 주셔서 감사드립니다. 🙇
        </div>
        <div css={styleText}>
          인스타그램 게시글을 통해 경품 추첨 결과 및 수령 방법을 확인하실 수
          있습니다.
        </div>
        <a
          href="https://www.instagram.com/sparcs.kaist/"
          target="_blank"
          rel="noreferrer"
          css={{ textDecoration: "none" }}
        >
          <Button type="purple" css={styleButton}>
            인스타그램에서 추첨 결과 확인하기
          </Button>
        </a>
        <div css={{ height: "12px" }} />
        <Link to="/event/2025fall-store" css={{ textDecoration: "none" }}>
          <Button type="purple" css={styleButton}>
            응모권 리더보드 확인하기
          </Button>
        </Link>
      </WhiteContainer>
    </AdaptiveDiv>
  );
};

export default EventSection2025FallResult;
