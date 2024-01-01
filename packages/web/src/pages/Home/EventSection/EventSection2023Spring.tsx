import { Link } from "react-router-dom";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import Button from "@/components/Button";
import Title from "@/components/Title";
import WhiteContainer from "@/components/WhiteContainer";

import theme from "@/tools/theme";

const EventSection2023Spring = () => {
  return (
    <AdaptiveDiv type="center">
      <Title icon="notice" isHeader>
        공지
      </Title>
      <WhiteContainer>
        <div
          css={{
            ...theme.font14,
            color: theme.black,
            margin: "0px 4px 15px",
          }}
        >
          <div
            css={{
              ...theme.font14,
              marginBottom: "10px",
            }}
          >
            <b css={{ color: theme.purple }}>택시 탑승 인증 이벤트</b> 및{" "}
            <b css={{ color: theme.purple }}>인스타그램 공유 이벤트</b> 절찬리
            진행 중!
          </div>
          <div
            css={{
              ...theme.font14,
              gap: "10px",
              alignItems: "center",
              lineHeight: "1.2rem",
            }}
          >
            <b>📌 이벤트 기간 : </b>5/3(수) ~ 5/15(월) <br />
            <b>🎁 경품 : </b>에어팟 3세대 (1명), 갤럭시 워치5 (1명), 스타벅스
            아이스 카페 아메리카노 T (30명), 택시비 카카오페이 상품권 5000원
            (40명)
          </div>
        </div>
        <Link to="/event/2023spring" style={{ textDecoration: "none" }}>
          <Button
            type="purple"
            css={{
              padding: "14px 0 13px",
              borderRadius: "12px",
              ...theme.font16_bold,
            }}
          >
            이벤트 확인하기
          </Button>
        </Link>
      </WhiteContainer>
    </AdaptiveDiv>
  );
};

export default EventSection2023Spring;
