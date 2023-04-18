import Button from "components/Button";
import RLayout from "components/RLayout";
import Title from "components/Title";
import WhiteContainer from "components/WhiteContainer";

import theme from "tools/theme";

const Event = () => {
  const styleText = {
    ...theme.font14,
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
          이벤트 설명 어쩌구 저쩌구
          <br />
          <br />
          🎁 경품: 스타벅스 아이스 카페 아메리카노 T (15명)
          <br />
          📌 이벤트 기간 및 당첨자 발표: 11월 28일 ~ 12월 12일
        </div>
        <a href="/" target="_blank">
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
          <a
            href="https://www.instagram.com/sparcs.kaist"
            target="_blank"
            rel="noreferrer"
            css={{ color: theme.purple, textDecoration: "none" }}
          >
            @sparcs.kaist
          </a>{" "}
          팔로우 후 본 게시물을 인스타그램 스토리에 공유해주세요. 그리고
          <a
            href="https://www.instagram.com/sparcs.kaist"
            target="_blank"
            rel="noreferrer"
            css={{ color: theme.purple, textDecoration: "none" }}
          >
            @sparcs.kaist
          </a>{" "}
          를 태그 후 {'"'}공유이벤트 참여{'"'}라는 문구를 남겨주세요. 추첨을
          통해 15명에게 경품을 드립니다.
          <br />
          <br />
          🎁 경품: 스타벅스 아이스 카페 아메리카노 T (15명)
          <br />
          📌 이벤트 기간 및 당첨자 발표: 11월 28일 ~ 12월 12일
        </div>
        <a href="/" target="_blank" rel="noreferrer">
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

      <Title icon="feed" header>
        설문조사 참여 이벤트
      </Title>
      <WhiteContainer>
        <div css={styleText}>
          서비스 개선을 위한 설문조사에 참여해 주세요. 설문조사는 약 2분의
          시간이 소요됩니다. 추첨을 통해 5명에게 경품을 드립니다.
          <br />
          <br />
          🎁 경품: 배달의 민족 2만원 상품권 (5명)
          <br />
          📌 이벤트 기간 및 당첨자 발표: 11월 28일 ~ 12월 12일
        </div>
        <a href="/" target="_blank">
          <Button
            type="purple"
            padding="14px 0 13px"
            radius={12}
            font={theme.font16_bold}
          >
            설문조사 참여하기
          </Button>
        </a>
      </WhiteContainer>
    </RLayout.R1>
  );
};

export default Event;
