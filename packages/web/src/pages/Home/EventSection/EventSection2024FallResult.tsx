import { Link } from "react-router-dom";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import Button from "@/components/Button";
import Title from "@/components/Title";
import WhiteContainer from "@/components/WhiteContainer";

import theme from "@/tools/theme";

const EventSection2024FallResult = () => {
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
        한가위 송편 이벤트
      </Title>
      <WhiteContainer>
        <div css={styleText}>
          <b>🎉 경품 추첨 결과 발표 및 상품 수령 안내</b>
        </div>
        <div css={styleText}>
          인스타그램 게시글을 통해 추첨 결과 및 수령 방법을 확인하실 수
          있습니다.
        </div>
        <div css={styleText}>
          또한 이벤트 참여 때 등록해주신 연락처로 상품 수령 방법을
          안내해드렸으나 받지 못하신 분들은 마이페이지 {">"} 채널톡 문의하기를
          통해 연락주시면 감사하겠습니다.
        </div>
        <div css={styleText}>
          많은 관심을 가지고 이벤트에 참여해주셔서 감사합니다 🙇
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
        <Link to="/event/2024fall-history" css={{ textDecoration: "none" }}>
          <Button type="purple" css={styleButton}>
            내 달토끼 상점 구매 이력 확인하기
          </Button>
        </Link>
      </WhiteContainer>
    </AdaptiveDiv>
  );
};

export default EventSection2024FallResult;
