import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useValueRecoilState } from "@/hooks/useFetchRecoilState";
import { useAxios } from "@/hooks/useTaxiAPI";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import Button from "@/components/Button";
import Footer from "@/components/Footer";
import HeaderWithBackButton from "@/components/Header/HeaderWithBackButton";
import { ModalEvent2025FallShare } from "@/components/ModalPopup";
import WhiteContainer from "@/components/WhiteContainer";

import alertAtom from "@/atoms/alert";
import { useSetRecoilState } from "recoil";

import moment, { getToday } from "@/tools/moment";
import theme from "@/tools/theme";

// use previous event icons
import { ReactComponent as TaxiLogoIcon } from "@/static/assets/sparcsLogos/TaxiLogo.svg";
// 리더보드 preview
import { ReactComponent as MainStep3 } from "@/static/events/2024fallMainStep3.svg";
// 이벤트 참여 방법
import { ReactComponent as MainSection2 } from "@/static/events/2025FallMainSection2.svg";
// 후원사 로고
import { ReactComponent as MainSection6 } from "@/static/events/2025FallMainSection6.svg";
// 응모권 교환 관련 가격표
import { ReactComponent as MainStep2 } from "@/static/events/2025FallMainStep2.svg";
// 새학기 이벤트 타이틀
import { ReactComponent as MainTitle } from "@/static/events/2025FallMainTitle.svg";
// 가장 위 섹션
import { ReactComponent as MainSection1 } from "@/static/events/2025springMainSection1.svg";
// 퀘스트 완료 아이콘
import { ReactComponent as MissionCompleteIcon } from "@/static/events/2025springMissionComplete.svg";

const Event2025Fall = () => {
  const [isOpenShare, setIsOpenShare] = useState<boolean>(false);
  const [inviteUrl, setInviteUrl] = useState<string>("");
  const setAlert = useSetRecoilState(alertAtom);
  const { isAgreeOnTermsOfEvent } =
    useValueRecoilState("event2025FallInfo") || {};
  const axios = useAxios();

  const today = getToday();
  const startDate = moment("2025-02-22", "YYYY-MM-DD");
  const endDate = moment("2025-10-22", "YYYY-MM-DD");
  const isEventDay = today.isBefore(endDate) && today.isAfter(startDate, "day");

  useEffect(() => {
    if (isAgreeOnTermsOfEvent && isEventDay)
      axios({
        url: `/events/2025fall/invites/create`,
        method: "post",
        onSuccess: ({ inviteUrl }) => {
          setInviteUrl(inviteUrl);
        },
        onError: () => setAlert("초대 링크를 생성하지 못했습니다."),
      });
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
          2025.10.2.(수) ~ 10.29.(수)
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
              응모권을 모아보세요!
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
              신규 전화번호 인증만 진행해도 응모권 5개 지급!
            </div>
            <div css={{ height: "16px" }} />
            <Link
              to="/event/2025fall-missions"
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
              응모권 교환소에서
              <br />
              경품 응모권을 사용해 보세요!
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
              응모권은 경품마다 별개로 모아지며 중복 구매 가능
              <br />
              경품 추첨 결과는 11월 4일에 발표
            </div>
            <div css={{ height: "16px" }} />
            <Link to="/event/2025fall-store" css={{ textDecoration: "none" }}>
              <Button
                type="purple_inset"
                css={{
                  padding: "14px 0 13px",
                  borderRadius: "12px",
                  ...theme.font14_bold,
                }}
              >
                교환소 구경하기
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
            <Link to="/event/2025fall-store" css={{ textDecoration: "none" }}>
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
              BONUS 1
            </div>
            <div css={{ height: "16px" }} />
            <div
              css={{
                ...theme.font20,
                color: theme.black,
              }}
            >
              Taxi를 친구에게 공유하고
              <br />
              친구와 함께 응모권 받아가세요!
            </div>
            <div css={{ height: "16px" }} />
            <div
              css={{
                ...theme.font14,
                color: theme.gray_text,
              }}
            >
              나의 초대 링크로 친구가 Taxi에 가입, 전화번호를 인증 시
              <br />
              친구와 나 모두 응모권 3개 획득!
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
                else if (isEventDay) {
                  setAlert(
                    "이벤트를 공유하기 위해서는 이벤트에 참여해야 합니다."
                  );
                } else {
                  setAlert("이벤트 기간이 아닙니다.");
                }
              }}
            >
              이벤트 공유하기
            </Button>
          </WhiteContainer>
          <div css={{ height: "16px" }} />

          <ModalEvent2025FallShare
            isOpen={isOpenShare}
            onChangeIsOpen={setIsOpenShare}
            inviteUrl={inviteUrl || ""}
          />
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
            본 이벤트는 KAIST의 후원으로 진행되었습니다.
          </div>
        </AdaptiveDiv>
      </div>
      <Footer type="event-2025fall" />
    </>
  );
};

export default memo(Event2025Fall);
