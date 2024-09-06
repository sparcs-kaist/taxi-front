import { memo, useCallback, useEffect, useState } from "react";

import { useValueRecoilState } from "@/hooks/useFetchRecoilState";
import { useAxios } from "@/hooks/useTaxiAPI";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import Button from "@/components/Button";
import Footer from "@/components/Footer";
import HeaderWithBackButton from "@/components/Header/HeaderWithBackButton";
import { ModalEvent2024FallShare } from "@/components/ModalPopup";
import WhiteContainer from "@/components/WhiteContainer";

import alertAtom from "@/atoms/alert";
import { useSetRecoilState } from "recoil";

import theme from "@/tools/theme";

import { ReactComponent as TaxiLogoIcon } from "@/static/assets/sparcsLogos/TaxiLogo.svg";
import { ReactComponent as MissionCompleteIcon } from "@/static/events/2023fallMissionComplete.svg";
import { ReactComponent as MainSection1 } from "@/static/events/2024fallMainSection1.svg";
import { ReactComponent as MainSection2 } from "@/static/events/2024fallMainSection2.svg";
import { ReactComponent as MainSection4 } from "@/static/events/2024fallMainSection4.svg";
import { ReactComponent as MainSection6 } from "@/static/events/2024fallMainSection6.svg";
import { ReactComponent as MainStep2 } from "@/static/events/2024fallMainStep2.svg";
import { ReactComponent as MainStep3 } from "@/static/events/2024fallMainStep3.svg";
import { ReactComponent as MainTitle } from "@/static/events/2024fallMainTitle.svg";

const EVENT_INSTAGRAM_URL =
  "https://www.instagram.com/p/C_H7YTfPEGZ/?igsh=MXh3MWc0NnJsZml3MQ==";

const Event2024Fall = () => {
  const [isOpenShare, setIsOpenShare] = useState<boolean>(false);
  const [inviteUrl, setInviteUrl] = useState<string>("");
  const setAlert = useSetRecoilState(alertAtom);
  const { isAgreeOnTermsOfEvent } =
    useValueRecoilState("event2024FallInfo") || {};
  const axios = useAxios();

  const getInviteUrl = useCallback(
    () =>
      axios({
        url: `/events/2024fall/invites/create`,
        method: "post",
        onSuccess: ({ inviteUrl }) => {
          setInviteUrl(inviteUrl);
        },
        onError: () => setAlert("공유 링크를 생성하지 못했습니다."),
      }),
    [isAgreeOnTermsOfEvent]
  );

  useEffect(() => {
    if (isAgreeOnTermsOfEvent) getInviteUrl();
  }, [isAgreeOnTermsOfEvent]);

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
          2024.9.7.(토) ~ 9.23.(월)
        </div>
        <MainSection1 css={{ width: "100%" }} />
      </AdaptiveDiv>
      <div css={{ background: theme.purple, height: "253px" }}>
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
              송편코인을 모아보세요!
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
              Taxi 웹 사이트와 앱에서 퀘스트 내용 확인
              <br />
              이벤트 참여 동의만 해도 송편코인 200개 지급
            </div>
            <div css={{ height: "16px" }} />
            {/* <Link to="/event/2024fall-missions" css={{ textDecoration: "none" }}> */}
            <Button
              disabled
              type="purple_inset"
              css={{
                padding: "14px 0 13px",
                borderRadius: "12px",
                ...theme.font14_bold,
              }}
            >
              이벤트 시작 후 확인해 보세요!
            </Button>
            {/* </Link> */}
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
              응모권 교환소에서
              <br />
              경품 응모권을 구매해 보세요!
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
              응모권은 경품마다 별개로 발급됨
              <br />
              경품 추첨 결과는 9월 30일에 발표
            </div>
            <div css={{ height: "16px" }} />
            {/* <Link to="/event/2024fall-store" css={{ textDecoration: "none" }}> */}
            <Button
              disabled
              type="purple_inset"
              css={{
                padding: "14px 0 13px",
                borderRadius: "12px",
                ...theme.font14_bold,
              }}
            >
              이벤트 시작 후 확인해 보세요!
            </Button>
            {/* </Link> */}
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
              경품 당첨 확률
              <br />
              리더보드를 확인하세요!
            </div>
            <div css={{ height: "16px" }} />
            <MainStep3 css={{ width: "233px", maxWidth: "100%" }} />
            <div css={{ height: "16px" }} />
            <div
              css={{
                ...theme.font14,
                color: theme.gray_text,
              }}
            >
              응모권 개수가 많을수록 당첨 확률이 상승함
              <br />위 이미지는 실제와 다를 수 있음
            </div>
            <div css={{ height: "16px" }} />
            {/* <Link
            to="/event/2024fall-leaderboard"
            css={{ textDecoration: "none" }}
          > */}
            <Button
              disabled
              type="purple_inset"
              css={{
                padding: "14px 0 13px",
                borderRadius: "12px",
                ...theme.font14_bold,
              }}
            >
              {/* 응모권 순위 확인하기 */}
              이벤트 시작 후 확인해 보세요!
            </Button>
            {/* </Link> */}
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
              BONUS
            </div>
            <div css={{ height: "16px" }} />
            <div
              css={{
                ...theme.font20,
                color: theme.black,
              }}
            >
              이벤트를 친구에게 공유하고
              <br />
              친구와 함께 송편코인 받아가세요!
            </div>
            <div css={{ height: "16px" }} />
            <div
              css={{
                ...theme.font14,
                color: theme.gray_text,
              }}
            >
              나의 링크로 친구가 이벤트에 참여하면
              <br />
              친구와 나 모두 송편코인 700개 획득!
            </div>
            <div css={{ height: "16px" }} />
            <Button
              type="purple_inset"
              css={{
                padding: "14px 0 13px",
                borderRadius: "12px",
                ...theme.font14_bold,
              }}
              onClick={() => {
                if (inviteUrl) setIsOpenShare(true);
                else
                  setAlert(
                    "이벤트를 공유하기 위해서는 이벤트에 참여해야 합니다."
                  );
              }}
            >
              이벤트 공유하기
            </Button>
          </WhiteContainer>
          <ModalEvent2024FallShare
            isOpen={isOpenShare}
            onChangeIsOpen={setIsOpenShare}
            inviteUrl={inviteUrl || ""}
          />
        </AdaptiveDiv>
      </div>
      <div
        css={{
          background: "linear-gradient(to top, #797F6C, #203F76)",
          pointerEvents: "none",
          ...theme.cursor(),
        }}
        onClick={() => window.open(EVENT_INSTAGRAM_URL, "_blank")}
      >
        <AdaptiveDiv
          type="center"
          css={{ padding: "16px", textAlign: "center" }}
        >
          <div css={{ color: theme.white, ...theme.font14_bold }}>EVENT</div>
          <div css={{ height: "16px" }} />
          <div css={{ color: theme.white, ...theme.font20 }}>
            인스타그램 스토리 공유하고
            <br />
            공유 이벤트에 참여하세요!
          </div>
          <div css={{ height: "16px" }} />
          <MainSection4 css={{ width: "334px", maxWidth: "100%" }} />
          <div css={{ height: "16px" }} />
          <div css={{ color: theme.gray_line, ...theme.font14 }}>
            {/* 추첨 결과는 인스타그램, Ara, Taxi 홈페이지에 발표
          <br />
          실물 상품 또는 기프티콘으로 지급
          <br /> */}
            인스타그램 게시물은 9월 6일 정오에 업로드 예정
          </div>
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
            본 이벤트는 현대모비스와 에이핀아이앤씨의 후원으로 진행되었습니다.
          </div>
        </AdaptiveDiv>
      </div>
      <Footer type="event-2024fall" />
    </>
  );
};

export default memo(Event2024Fall);
