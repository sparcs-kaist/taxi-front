import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import Button from "@/components/Button";
import Footer from "@/components/Footer";
import HeaderWithBackButton from "@/components/Header/HeaderWithBackButton";

import theme from "@/tools/theme";

import { getToday } from "@/tools/moment";
import moment from "@/tools/moment";
import { useSetRecoilState } from "recoil";
import alertAtom from "@/atoms/alert";
import { useValueRecoilState } from "@/hooks/useFetchRecoilState";
import { useAxios } from "@/hooks/useTaxiAPI";

import WhiteContainer from "@/components/WhiteContainer";

import { ReactComponent as TaxiLogoIcon } from "@/static/assets/sparcsLogos/TaxiLogo.svg";
import { ReactComponent as BonusSection2 } from "@/static/events/2025springBonusSection2.svg";
import { ReactComponent as MainTitle } from "@/static/events/2025springMainTitle.svg";
import { ReactComponent as MainStep3 } from "@/static/events/2026springMainStep3.svg";
import { ReactComponent as MainSection2 } from "@/static/events/2026springMainSection2.svg";
import { ReactComponent as MissionCompleteIcon } from "@/static/events/2025springMissionComplete.svg";
import { ReactComponent as MainStep2 } from "@/static/events/2026springMainStep2.svg";

import { ReactComponent as MainSection1 } from "@/static/events/2026springMainSection1.svg";
import { ReactComponent as MainSection4 } from "@/static/events/2026springMainSection4.svg";
import { ReactComponent as MainSection6 } from "@/static/events/2026springMainSection6.svg";

import { ModalEvent2026SpringShare } from "@/components/ModalPopup";
import { ModalEvent2026SpringCoupon } from "@/components/ModalPopup";

const EVENT_INSTAGRAM_URL =
  ""; // TODO: 인스타그램 링크 추가

const Event2026Spring = () => {
  const [isOpenShare, setIsOpenShare] = useState<boolean>(false);
  const [inviteUrl, setInviteUrl] = useState<string>("");
  const [isOpenCoupon, setIsOpenCoupon] = useState<boolean>(false);
  const setAlert = useSetRecoilState(alertAtom);
  const { isAgreeOnTermsOfEvent } =
    useValueRecoilState("event2026SpringInfo") || {};
  const axios = useAxios();
  
  const today = getToday();
  const startDate = moment("2026-02-20", "YYYY-MM-DD");
  const endDate = moment("2026-03-31", "YYYY-MM-DD");
  const isEventDay = today.isBefore(endDate) && today.isAfter(startDate, "day");

  useEffect(() => {
    if (isAgreeOnTermsOfEvent && isEventDay)
      axios({
        url: `/events/2026spring/invites/create`,
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
          2026.2.27.(금) ~ 3.31.(화)
        </div>
        <MainSection1 css={{ width: "100%" }} />
      </AdaptiveDiv>
      <div css={{ background: theme.purple, height: "253px" }}>
        <AdaptiveDiv type="center">
          <MainSection2 />
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
              코인을 모아보세요!
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
              이벤트 참여만 해도 넙죽코인 지급!
            </div>
            <div css={{ height: "16px" }} />
            <Link
              to="/event/2026spring-missions"
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
              미니게임 즐기고
              <br />
              코인을 모아보세요!
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
              끝말잇기와 택시 레이스는
              <br />
              택시 방 내에서 즐기실 수 있습니다
            </div>
            <div css={{ height: "16px" }} />
            <Link to="/game/main" css={{ textDecoration: "none" }}>
              <Button
                type="purple_inset"
                css={{
                  padding: "14px 0 13px",
                  borderRadius: "12px",
                  ...theme.font14_bold,
                }}
              >
                미니게임 하러가기
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
              모은 코인으로 
              <br />
              나만의 택시를 강화해보세요!
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
              강화 랭킹 순위권에 들면 경품이!
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
            <BonusSection2 css={{ width: "100%" }} />
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
          <ModalEvent2026SpringShare
            isOpen={isOpenShare}
            onChangeIsOpen={setIsOpenShare}
            inviteUrl={inviteUrl || ""}
          />
          <ModalEvent2026SpringCoupon
            isOpen={isOpenCoupon}
            setIsOpen={setIsOpenCoupon}
            onChangeIsOpen={setIsOpenCoupon}
          />
        </AdaptiveDiv>
      </div>
      <div
        css={{
          background: "linear-gradient(to top, #797F6C, #203F76)",
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
            이 영역을 누르면 인스타그램 게시물로 이동
            <br />
            추첨 결과는 4월 중에 발표
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
          <MainSection6 css={{ width: "292px", maxWidth: "100%", height: "50px", marginTop: "-100px" }} />
          <div css={{ height: "26px" }} />
          <div css={{ color: theme.gray_text, ...theme.font14 }}>
            본 이벤트는 토스뱅크와 KAIST의 후원으로 진행되었습니다.
          </div>
        </AdaptiveDiv>
      </div>
      <Footer type="event-2026spring" />
    </>
  );
};

export default memo(Event2026Spring);
