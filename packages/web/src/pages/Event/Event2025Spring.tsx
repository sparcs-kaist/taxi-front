import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useValueRecoilState } from "@/hooks/useFetchRecoilState";
import { useAxios } from "@/hooks/useTaxiAPI";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import Button from "@/components/Button";
import Footer from "@/components/Footer";
import HeaderWithBackButton from "@/components/Header/HeaderWithBackButton";
import {
  ModalEvent2025SpringCoupon,
  ModalEvent2025SpringShare,
} from "@/components/ModalPopup";
import WhiteContainer from "@/components/WhiteContainer";

import alertAtom from "@/atoms/alert";
import { useSetRecoilState } from "recoil";

import moment, { getToday } from "@/tools/moment";
import theme from "@/tools/theme";

// use previous event icons
import { ReactComponent as TaxiLogoIcon } from "@/static/assets/sparcsLogos/TaxiLogo.svg";
import { ReactComponent as MainStep3 } from "@/static/events/2024fallMainStep3.svg";
import { ReactComponent as MainSection1 } from "@/static/events/2025springMainSection1.svg";
import { ReactComponent as MainSection2 } from "@/static/events/2025springMainSection2.svg";
import { ReactComponent as MainSection4 } from "@/static/events/2025springMainSection4.svg";
import { ReactComponent as MainSection6 } from "@/static/events/2025springMainSection6.svg";
import { ReactComponent as MainStep2 } from "@/static/events/2025springMainStep2.svg";
import { ReactComponent as MainTitle } from "@/static/events/2025springMainTitle.svg";
import { ReactComponent as MissionCompleteIcon } from "@/static/events/2025springMissionComplete.svg";

const EVENT_INSTAGRAM_URL =
  "https://www.instagram.com/p/C_j1gibhTOa/?igsh=eWoyMnhweGNzeWR2"; // TODO: FIXME

const Event2025Spring = () => {
  const [isOpenShare, setIsOpenShare] = useState<boolean>(false);
  const [inviteUrl, setInviteUrl] = useState<string>("");
  const [isOpenCoupon, setIsOpenCoupon] = useState<boolean>(false);
  const setAlert = useSetRecoilState(alertAtom);
  const { isAgreeOnTermsOfEvent } =
    useValueRecoilState("event2025SpringInfo") || {};
  const axios = useAxios();

  const today = getToday();
  const startDate = moment("2025-02-20", "YYYY-MM-DD");
  const endDate = moment("2025-03-13", "YYYY-MM-DD");
  const isEventDay = today.isBefore(endDate) && today.isAfter(startDate, "day");

  useEffect(() => {
    if (isAgreeOnTermsOfEvent && isEventDay)
      axios({
        url: `/events/2025spring/invites/create`,
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
          2025.2.21.(금) ~ 3.12.(수)
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
              넙죽코인을 모아보세요!
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
              이벤트 참여만 해도 넙죽코인 200개 지급!
            </div>
            <div css={{ height: "16px" }} />
            <Link
              to="/event/2025spring-missions"
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
              응모권은 경품마다 별개로 모아지며 중복 구매 가능
              <br />
              경품 추첨 결과는 3월 19일에 발표
            </div>
            {/*TODO: 날짜 수정*/}
            <div css={{ height: "16px" }} />
            <Link to="/event/2025spring-store" css={{ textDecoration: "none" }}>
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
            <Link to="/event/2025spring-store" css={{ textDecoration: "none" }}>
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
              이벤트를 친구에게 공유하고
              <br />
              친구와 함께 넙죽코인 받아가세요!
            </div>
            <div css={{ height: "16px" }} />
            <div
              css={{
                ...theme.font14,
                color: theme.gray_text,
              }}
            >
              나의 초대 링크로 친구가 이벤트에 참여하면
              <br />
              친구와 나 모두 넙죽코인 700개 획득!
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
          <WhiteContainer
            css={{ margin: 0, padding: "16px", textAlign: "center" }}
          >
            <div
              css={{
                ...theme.font14_bold,
                color: theme.purple,
              }}
            >
              BONUS 2
            </div>
            <div css={{ height: "16px" }} />
            <div
              css={{
                ...theme.font20,
                color: theme.black,
              }}
            >
              SPARCS 행사 참여하고
              <br />
              넙죽코인 쿠폰 받아가세요!
            </div>
            <div css={{ height: "16px" }} />
            <div
              css={{
                ...theme.font14,
                color: theme.gray_text,
              }}
            >
              해오름식 SPARCS 부스 또는 SPARCS 오픈동방에 참여하면
              <br />
              넙죽코인을 얻을 수 있는 쿠폰이?!
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
                if (inviteUrl) setIsOpenCoupon(true);
                else if (isEventDay) {
                  setAlert(
                    "쿠폰을 사용하기 위해서는 이벤트에 참여해야 합니다."
                  );
                } else {
                  setAlert("이벤트 기간이 아닙니다.");
                }
              }}
            >
              쿠폰 사용하기
            </Button>
          </WhiteContainer>
          <ModalEvent2025SpringShare
            isOpen={isOpenShare}
            onChangeIsOpen={setIsOpenShare}
            inviteUrl={inviteUrl || ""}
          />
          <ModalEvent2025SpringCoupon
            isOpen={isOpenCoupon}
            setIsOpen={setIsOpenCoupon}
            onChangeIsOpen={setIsOpenCoupon}
          />
        </AdaptiveDiv>
      </div>
      <div
        css={{
          background: "linear-gradient(to top, #797F6C, #203F76)",
          pointerEvents: "none", // TODO: 인스타 링크 업데이트 후 삭제
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
            2월 21일 12시에 게시물 업로드 예정
            <br />
            추첨 결과는 3월 19일에 발표
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
            본 이벤트는 에이핀아이앤씨와 KAIST의 후원으로 진행되었습니다.
          </div>
        </AdaptiveDiv>
      </div>
      <Footer type="event-2025spring" />
    </>
  );
};

export default memo(Event2025Spring);
