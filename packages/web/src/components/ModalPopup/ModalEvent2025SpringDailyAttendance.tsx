import { useEffect, useState } from "react";
import { CSSProperties } from "react";

import { useEvent2025SpringCancelAnswer } from "@/hooks/event/useEvent2025SpringCancelAnswer";
import { useEvent2025SpringQuestComplete } from "@/hooks/event/useEvent2025SpringQuestComplete";
import { useEvent2025SpringSubmitAnswer } from "@/hooks/event/useEvent2025SpringSubmitAnswer";
import { useIsLogin, useValueRecoilState } from "@/hooks/useFetchRecoilState";
import { useQuery } from "@/hooks/useTaxiAPI";

import Button from "@/components/Button";
import CreditAmountStatusContainer from "@/components/Event/CreditAmountStatusContainer";
import Modal from "@/components/Modal";

import WhiteContainer from "../WhiteContainer";

import moment, { getToday } from "@/tools/moment";
import theme from "@/tools/theme";

import { ReactComponent as DailyAttendance } from "@/static/events/2025springDailyAttendance.svg";

interface ModalEvent2025SpringDailyAttendanceProps {
  isOpen: boolean;
  onChangeIsOpen?: ((isOpen: boolean) => void) | undefined;
  forceOpen?: boolean;
}

const styleBox: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  flex: "1",
  alignItems: "center",
  background: theme.gray_background,
  borderRadius: "12px",
  padding: "12px",
  gap: "12px",
};

const ModalEvent2025SpringDailyAttendance = ({
  isOpen,
  onChangeIsOpen,
  forceOpen = false,
}: ModalEvent2025SpringDailyAttendanceProps) => {
  const today = getToday();
  // const today = moment("2024-09-23", "YYYY-MM-DD"); // FIXME: 배포 전에 수정
  const endDate = moment("2025-03-13", "YYYY-MM-DD");
  const isEventDay = today.isBefore(endDate);

  const event2025SpringQuestComplete = useEvent2025SpringQuestComplete();

  const { isAgreeOnTermsOfEvent = false, completedQuests = [] } =
    useValueRecoilState("event2025SpringInfo") || {};

  const todayInitial = completedQuests?.filter(
    ({ questId, completedAt }) =>
      questId === "dailyAttendance" && moment(completedAt).isSame(today, "day")
  );

  const [selectedChoice, setSelectedChoice] = useState("");
  const [error, todayData, isLoading] =
    useQuery.get("/events/2025spring/quizzes/today", {}) || {};

  const isLogin = useIsLogin();
  const [userError, userData, userIsLoading] = useQuery.get(
    "/events/2025spring/quizzes/todayAnswer",
    {},
    [],
    { skip: !isLogin }
  ) || [true, null, true];

  useEffect(() => {
    if (!userError && !userIsLoading && userData !== null) {
      setSelectedChoice(userData.answer);
    }
  }, [userData]);

  const submitAnswer = useEvent2025SpringSubmitAnswer();
  const cancelAnswer = useEvent2025SpringCancelAnswer();

  const handleSubmit = async (answer: string) => {
    setSelectedChoice(answer);
    if (answer !== "") {
      try {
        await cancelAnswer();
      } catch {
        // do nothing
      }
      await submitAnswer(answer);
      event2025SpringQuestComplete("dailyAttendance");
    }
  };

  useEffect(() => {
    const now = moment();
    const isRestrictedTime = now.hour() === 23 && now.minute() >= 55;

    const modalOpened =
      !isRestrictedTime &&
      isEventDay &&
      isAgreeOnTermsOfEvent &&
      todayInitial.length === 0;

    if (onChangeIsOpen) {
      onChangeIsOpen(forceOpen && !isRestrictedTime ? true : modalOpened);
    }
  }, [isEventDay, isAgreeOnTermsOfEvent, forceOpen]);

  const styleBody = {
    display: "flex",
  };
  const styleContentBox = {
    width: 0,
    flexGrow: 1,
  };
  const styleTitle = {
    ...theme.font16_bold,
    color: theme.black,
    marginBottom: "4px",
  };
  const styleDescription = {
    ...theme.font14,
    color: theme.black,
  };
  return (
    !error &&
    !isLoading && (
      <Modal
        padding="16px 12px 12px"
        isOpen={isOpen}
        onChangeIsOpen={onChangeIsOpen}
        css={{ display: "flex", flexDirection: "column" }}
      >
        <DailyAttendance
          css={{ width: "92%", height: "200px", margin: "0 4%" }}
        />
        <CreditAmountStatusContainer />
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <WhiteContainer
            css={{
              padding: "12px 12px 12px 20px",
              backgroundColor: theme.gray_background,
              width: "calc(100% - 32px)",
            }}
          >
            <div
              css={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                width: "8px",
                background: theme.purple,
              }}
            />
            <div css={styleBody}>
              <div css={styleContentBox}>
                <div css={styleTitle}>{todayData.quizTitle}</div>
                <div
                  css={styleDescription}
                  dangerouslySetInnerHTML={{ __html: todayData.quizContent }}
                />
              </div>
            </div>
          </WhiteContainer>
          <div
            css={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              gap: "12px",
              marginBottom: "15px",
            }}
          >
            <div style={styleBox}>
              {todayData.optionA}
              <Button
                type={selectedChoice === "A" ? "white" : "purple"}
                disabled={false}
                css={{
                  width: "100%",
                  padding: "14px 0 13px",
                  borderRadius: "12px",
                  ...theme.font16_bold,
                }}
                onClick={() => {
                  handleSubmit("A");
                }}
              >
                {selectedChoice === "A" ? "선택 완료" : "선택"}
              </Button>
            </div>
            <div style={styleBox}>
              {todayData.optionB}
              <Button
                type={selectedChoice === "B" ? "white" : "purple"}
                disabled={false}
                css={{
                  width: "100%",
                  padding: "14px 0 13px",
                  borderRadius: "12px",
                  ...theme.font16_bold,
                }}
                onClick={() => {
                  handleSubmit("B");
                }}
              >
                {selectedChoice === "B" ? "선택 완료" : "선택"}
              </Button>
            </div>
          </div>
          <div
            css={{
              ...theme.font14,
              color: theme.gray_text,
              textAlign: "center",
            }}
          >
            {selectedChoice === "A" || selectedChoice === "B"
              ? "응답 완료되었습니다."
              : todayInitial.length !== 0
              ? "이미 출석이 완료되었습니다."
              : ""}
            <br />
            결과는 내일 0시에 확인할 수 있어요.
          </div>
        </div>
      </Modal>
    )
  );
};

export default ModalEvent2025SpringDailyAttendance;
