import { memo } from "react";
import { Link } from "react-router-dom";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import Button from "@/components/Button";
import Footer from "@/components/Footer";
import HeaderWithBackButton from "@/components/Header/HeaderWithBackButton";
import WhiteContainer from "@/components/WhiteContainer";

import theme from "@/tools/theme";

// ToDo : 2023fall 이미지들
import { ReactComponent as TaxiLogoIcon } from "@/static/assets/sparcsLogos/TaxiLogo.svg";
import { ReactComponent as MainSection1 } from "@/static/events/2023fallMainSection1.svg";
import { ReactComponent as MainSection2 } from "@/static/events/2023fallMainSection2.svg";
import { ReactComponent as MainSection4 } from "@/static/events/2023fallMainSection4.svg";
import { ReactComponent as MainSection5 } from "@/static/events/2023fallMainSection5.svg";
import { ReactComponent as MainSection5Background } from "@/static/events/2023fallMainSection5Background.svg";
import { ReactComponent as MainSection6 } from "@/static/events/2023fallMainSection6.svg";
import { ReactComponent as MainStep2 } from "@/static/events/2023fallMainStep2.svg";
import { ReactComponent as MainStep3 } from "@/static/events/2023fallMainStep3.svg";
import { ReactComponent as MainTitle } from "@/static/events/2023fallMainTitle.svg";
import { ReactComponent as MissionCompleteIcon } from "@/static/events/2023fallMissionComplete.svg";

// ToDo : 2023fall 문구 (일정만 반영함)
const Event2024Fall = () => {
  return (
    <>
      <HeaderWithBackButton>
        <div css={{ color: theme.purple, ...theme.font18 }}>이벤트 안내</div>
      </HeaderWithBackButton>
      <AdaptiveDiv
        type="center"
        css={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TaxiLogoIcon
          css={{ width: "71.36px", maxWidth: "100%", marginTop: "20px" }}
        />
        <MainTitle
          css={{ width: "218px", maxWidth: "100%", marginTop: "12px" }}
        />
        <div
          css={{ ...theme.font16_bold, color: theme.purple, marginTop: "16px" }}
        >
          2024.9.7.(토) ~ 9.23.(토)
        </div>
        <MainSection1 css={{ width: "100%" }} />
      </AdaptiveDiv>
      <div css={{ background: theme.purple }}>
        <AdaptiveDiv type="center">
          <MainSection2 css={{ width: "100%" }} />
        </AdaptiveDiv>
      </div>
      <div css={{ background: theme.purple_disabled, padding: "20px 0" }}>
        <AdaptiveDiv type="center">
          <WhiteContainer
            css={{ margin: 0, padding: "16px", textAlign: "center" }}
          >
            <div
              css={{
                ...theme.font14_bold,
                color: theme.purple,
              }}
            >
              STEP 1
            </div>
            <div css={{ height: "16px" }} />
            <div
              css={{
                ...theme.font20,
                color: theme.black,
              }}
            >
              Taxi 퀘스트 달성하고
              <br />
              송편을 모아보세요!
            </div>
            <div css={{ height: "16px" }} />
            <MissionCompleteIcon css={{ width: "192px", maxWidth: "100%" }} />
            <div css={{ height: "16px" }} />
            <div
              css={{
                ...theme.font14,
                color: theme.gray_text,
              }}
            >
              Taxi 웹사이트와 앱에서 퀘스트 내용 확인
              <br />
              이벤트 기간 내 첫 로그인 시 송편 100개 지급
            </div>
            <div css={{ height: "16px" }} />
            <Link
              to="/event/2024fall-missions"
              css={{ textDecoration: "none" }}
            >
              <Button
                type="purple_inset"
                css={{
                  padding: "14px 0 13px",
                  borderRadius: "12px",
                  ...theme.font14_bold,
                }}
              >
                퀘스트 바로가기
              </Button>
            </Link>
          </WhiteContainer>
          <div css={{ height: "16px" }} />
          <WhiteContainer
            css={{ margin: 0, padding: "16px", textAlign: "center" }}
          >
            <div
              css={{
                ...theme.font14_bold,
                color: theme.purple,
              }}
            >
              STEP 2
            </div>
            <div css={{ height: "16px" }} />
            <div
              css={{
                ...theme.font20,
                color: theme.black,
              }}
            >
              달토끼 상점에서
              <br />
              아이템을 구매해보세요!
            </div>
            <div css={{ height: "16px" }} />
            <MainStep2 css={{ width: "100%" }} />
            <div css={{ height: "16px" }} />
            <div
              css={{
                ...theme.font14,
                color: theme.gray_text,
              }}
            >
              일반응모권, 고급응모권, 랜덤박스도 구매 가능
              <br />
              상품이 조기에 품절될 수 있어 선착순 판매
            </div>
            <div css={{ height: "16px" }} />
            <Link to="/event/2024fall-store" css={{ textDecoration: "none" }}>
              <Button
                type="purple_inset"
                css={{
                  padding: "14px 0 13px",
                  borderRadius: "12px",
                  ...theme.font14_bold,
                }}
              >
                상점 구경하기
              </Button>
            </Link>
          </WhiteContainer>
          <div css={{ height: "16px" }} />
          <WhiteContainer
            css={{ margin: 0, padding: "16px", textAlign: "center" }}
          >
            <div
              css={{
                ...theme.font14_bold,
                color: theme.purple,
              }}
            >
              STEP 3
            </div>
            <div css={{ height: "16px" }} />
            <div
              css={{
                ...theme.font20,
                color: theme.black,
              }}
            >
              보너스 경품 추첨에
              <br />
              응모권으로 참여해보세요!
            </div>
            <div css={{ height: "16px" }} />
            <MainStep3 css={{ width: "216px", maxWidht: "100%" }} />
            <div css={{ height: "16px" }} />
            <div
              css={{
                ...theme.font14,
                color: theme.gray_text,
              }}
            >
              응모권은 퀘스트 달성, 달토끼 상점을 통해 얻음
              <br />
              고급응모권은 일반응모권 당첨확률의 5배
            </div>
            <div css={{ height: "16px" }} />
            <Link
              to="/event/2024fall-leaderboard"
              css={{ textDecoration: "none" }}
            >
              <Button
                type="purple_inset"
                css={{
                  padding: "14px 0 13px",
                  borderRadius: "12px",
                  ...theme.font14_bold,
                }}
              >
                응모권 리더보드 확인하기
              </Button>
            </Link>
          </WhiteContainer>
        </AdaptiveDiv>
      </div>
      <div css={{ background: "linear-gradient(to top, #797F6C, #203F76)" }}>
        <AdaptiveDiv
          type="center"
          css={{ padding: "16px", textAlign: "center" }}
        >
          <div css={{ color: theme.white, ...theme.font14_bold }}>EVENT</div>
          <div css={{ height: "16px" }} />
          <div css={{ color: theme.white, ...theme.font20 }}>
            10월 13일 아이템 받고
            <br />
            경품 추첨 결과도 확인해보세요!
          </div>
          <div css={{ height: "16px" }} />
          <MainSection4 css={{ width: "334px", maxWidth: "100%" }} />
          <div css={{ height: "16px" }} />
          <div css={{ color: theme.gray_line, ...theme.font14 }}>
            추첨 결과는 인스타그램, Ara, Taxi 홈페이지에 발표
            <br />
            달토끼 상점에서 구매한 아이템 실물 상품으로 교환
          </div>
        </AdaptiveDiv>
      </div>
      <div
        css={{
          position: "relative",
          overflow: "hidden",
          background: "#3C0057",
        }}
      >
        <MainSection5Background
          css={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
          }}
        />
        <AdaptiveDiv
          type="center"
          css={{ padding: "16px", textAlign: "center" }}
        >
          <div css={{ color: theme.white, ...theme.font14_bold }}>EVENT</div>
          <div css={{ height: "16px" }} />
          <div css={{ color: theme.white, ...theme.font20 }}>
            지금 스토리 공유하고
            <br />
            송편 100개 받아가세요!
          </div>
          <div css={{ height: "16px" }} />
          <MainSection5 css={{ width: "159px", maxWidth: "100%" }} />
          {/* <LinkEvent2024FallInstagramStoryShare type="eventSharingOnInstagram">
            <Button
              type="purple_inset"
              css={{
                padding: "14px 0 13px",
                borderRadius: "12px",
                ...theme.font14_bold,
              }}
            >
              인스타그램에 공유하기
            </Button>
          </LinkEvent2024FallInstagramStoryShare> */}
        </AdaptiveDiv>
      </div>
      <div
        css={{
          padding: "56px 0 16px",
          background: theme.white,
        }}
      >
        <AdaptiveDiv type="center" css={{ textAlign: "center" }}>
          <MainSection6 css={{ width: "292px", maxWidth: "100%" }} />
          <div css={{ height: "56px" }} />
          <div css={{ color: theme.gray_text, ...theme.font14 }}>
            본 이벤트는 위메이드와 KAIST의 후원으로 진행되었습니다.
          </div>
        </AdaptiveDiv>
      </div>
      <Footer type="event-2024fall" />
    </>
  );
}; // ToDo : 2023fall footer 수정

export default memo(Event2024Fall);
