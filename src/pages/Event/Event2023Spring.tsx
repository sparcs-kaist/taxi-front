import { Carousel } from "antd";

import AdaptiveDiv from "components/AdaptiveDiv";
import Button from "components/Button";
import Footer from "components/Footer";
import Title from "components/Title";
import WhiteContainer from "components/WhiteContainer";

import theme from "tools/theme";

import Card01 from "static/events/2023springCard01.png";
import Card02 from "static/events/2023springCard02.png";
import Card03 from "static/events/2023springCard03.png";
import Card04 from "static/events/2023springCard04.png";
import Card05 from "static/events/2023springCard05.png";
import Card06 from "static/events/2023springCard06.png";
import Card07 from "static/events/2023springCard07.png";
import Card08 from "static/events/2023springCard08.png";
import Card09 from "static/events/2023springCard09.png";
import Card10 from "static/events/2023springCard10.png";

type EventLinkProps = {
  href: string;
  text?: string;
};
type WhiteContainerCardProps = {
  src: string;
};

const EventLink = ({ href, text }: EventLinkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    css={{ color: theme.purple, textDecoration: "none" }}
  >
    {text || href}
  </a>
);

const WhiteContainerCard = ({ src }: WhiteContainerCardProps) => (
  <div>
    <img
      src={src}
      css={{
        margin: 0,
        width: "100%",
      }}
      alt="card1"
    />
  </div>
);

const Event2023Spring = () => {
  const styleText = {
    ...theme.font14,
    lineHeight: "1.5rem",
    color: theme.black,
    margin: "0px 4px 15px",
  };

  return (
    <AdaptiveDiv type="center">
      <Title icon="notice" isHeader>
        이벤트 요약
      </Title>
      <WhiteContainer css={{ padding: "0" }}>
        <Carousel autoplay autoplaySpeed={5000}>
          {[
            Card01,
            Card02,
            Card03,
            Card04,
            Card05,
            Card06,
            Card07,
            Card08,
            Card09,
            Card10,
          ].map((item, index) => (
            <WhiteContainerCard src={item} key={index} />
          ))}
        </Carousel>
      </WhiteContainer>
      <Title icon="taxi" isHeader>
        택시 탑승 인증 이벤트
      </Title>
      <WhiteContainer>
        <div css={styleText}>
          <b>🎁 경품 : </b>
          에어팟 3세대 (1명), 갤럭시 워치5 (1명), 택시비 카카오페이 상품권
          5000원 (40명)
          <br />
          <b>📌 이벤트 기간 : </b>
          5월 3일(수) ~ 5월 15일(월)
          <br />
          <b>🌟 인증방법</b>
          <br />둘 중 한가지 방법을 선택해 버튼을 눌러 올려주시면 참여 완료!
          <br />
          1. Taxi 서비스의 채팅 페이지 스크린샷과 카드 결제 메시지
          <br />
          2. Taxi 서비스의 채팅 페이지 스크린샷과 택시를 탑승한 후 미터기 사진
          <br />
          <b>🎈 당첨 확률 UP</b>
          <br />
          1. 참여 횟수 비례 당첨확률 UP!
          <br /> 2. 인스타 스토리에{" "}
          <EventLink
            href="https://www.instagram.com/sparcs.kaist"
            text="@sparcs.kaist"
          />
          를 태그 후 스크린샷으로 인증해 추가로 업로드 하면 당첨확률이 2배!
        </div>
        <a
          href="https://bit.ly/2023taxi"
          target="_blank"
          rel="noreferrer"
          css={{ textDecoration: "none" }}
        >
          <Button
            type="purple"
            css={{
              padding: "14px 0 13px",
              borderRadius: "12px",
              ...theme.font16_bold,
            }}
          >
            탑승 인증하기
          </Button>
        </a>
      </WhiteContainer>

      <Title icon="favorite" isHeader>
        인스타 스토리 공유 이벤트
      </Title>
      <WhiteContainer>
        <div css={styleText}>
          <b>🎁 경품 : </b>
          스타벅스 아이스 카페 아메리카노 T (30명)
          <br />
          <b>📌 이벤트 기간 : </b>
          5월 3일(수) ~ 5월 15일(월)
          <br />
          <b>🌟 인증방법</b>
          <br />
          1.{" "}
          <EventLink
            href="https://www.instagram.com/sparcs.kaist"
            text="@sparcs.kaist"
          />{" "}
          팔로우 후 본 게시물을 인스타그램 스토리에 공유하기
          <br />
          2.{" "}
          <EventLink
            href="https://www.instagram.com/sparcs.kaist"
            text="@sparcs.kaist"
          />{" "}
          를 태그 후 {'"'}공유이벤트 참여{'"'}라는 문구를 남겨주시면 참여 완료!
        </div>
        <a
          href="https://www.instagram.com/sparcs.kaist"
          target="_blank"
          rel="noreferrer"
          css={{ textDecoration: "none" }}
        >
          <Button
            type="purple"
            css={{
              padding: "14px 0 13px",
              borderRadius: "12px",
              ...theme.font16_bold,
            }}
          >
            게시물 확인하기
          </Button>
        </a>
      </WhiteContainer>
      <Footer />
    </AdaptiveDiv>
  );
};

export default Event2023Spring;
