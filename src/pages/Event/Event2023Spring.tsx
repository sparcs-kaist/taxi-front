import Button from "components/Button";
import Footer from "components/Footer";
import RLayout from "components/RLayout";
import Title from "components/Title";
import WhiteContainer from "components/WhiteContainer";

import theme from "tools/theme";

type EventLinkProps = {
  href: string;
  text?: string;
};
const EventLink = ({ href, text }: EventLinkProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      css={{ color: theme.purple, textDecoration: "none" }}
    >
      {text || href}
    </a>
  );
};

const Event2023Spring = () => {
  const styleText = {
    ...theme.font14,
    lineHeight: "1.5rem",
    color: theme.black,
    margin: "0px 4px 15px",
  };
  return (
    <RLayout.R1>
      <Title icon="taxi" header>
        탑승 인증 이벤트
      </Title>
      <WhiteContainer>
        <div css={styleText}>
          <b>🎁 경품 : </b>
          에어팟 3세대 (1명), 갤럭시 워치5 (1명), 택시비 5000원 지원 (40명)
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
          인스타 스토리에{" "}
          <EventLink
            href="https://www.instagram.com/sparcs.kaist"
            text="@sparcs.kaist"
          />
          를 태그 후 스크린샷으로 인증해 추가로 업로드 하면 당첨확률이 2배!
        </div>
        <a href="https://bit.ly/2023taxi" target="_blank" rel="noreferrer">
          <Button
            type="purple"
            padding="14px 0 13px"
            radius={12}
            font={theme.font16_bold}
          >
            탑승 인증하기
          </Button>
        </a>
      </WhiteContainer>

      <Title icon="favorite" header>
        인스타 공유 이벤트
      </Title>
      <WhiteContainer>
        <div css={styleText}>
          <b>🎁 경품 : </b>
          스타벅스 아이스 카페 아메리카노 T (30명)
          <br />
          <b>📌 이벤트 기간 : </b>
          5월 3일 ~ 5월 15일
          <br />
          <b>🌟 인증방법</b>
          <br />
          1.{" "}
          <EventLink
            href="https://www.instagram.com/sparcs.kaist"
            text="@sparcs.kaist"
          />{" "}
          팔로우 후 본 게시물을 인스타그램 스토리에 공유해주세요.
          <br />
          2.{" "}
          <EventLink
            href="https://www.instagram.com/sparcs.kaist"
            text="@sparcs.kaist"
          />{" "}
          를 태그 후 {'"'}공유이벤트 참여{'"'}라는 문구를 남겨주세요.
        </div>
        <a href="https://www.instagram.com/sparcs.kaist" target="_blank">
          <Button
            type="purple"
            padding="14px 0 13px"
            radius={12}
            font={theme.font16_bold}
          >
            인스타그램에서 확인하기
          </Button>
        </a>
      </WhiteContainer>
      <Footer />
    </RLayout.R1>
  );
};

export default Event2023Spring;
