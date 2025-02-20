import { CSSProperties, useEffect, useState } from "react";

import { useIsLogin } from "@/hooks/useFetchRecoilState";
import { useQuery } from "@/hooks/useTaxiAPI";

import Modal from "@/components/Modal";
import WhiteContainer from "@/components/WhiteContainer";

import alertAtom from "@/atoms/alert";
import { useSetRecoilState } from "recoil";

import moment, { getToday } from "@/tools/moment";
import theme from "@/tools/theme";

import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

type DateAttendanceModalProps = {
  year: number;
  month: number;
  day: number;
  isOpen: boolean;
  onChangeIsOpen?: ((isOpen: boolean) => void) | undefined;
};

const styleBox = (selected: boolean): CSSProperties => ({
  display: "flex",
  flexDirection: "column",
  flex: "1",
  alignItems: "center",
  textAlign: "center",
  background: selected ? theme.purple : theme.gray_background,
  color: selected ? theme.white : theme.black,
  fontWeight: selected ? 700 : 300,
  borderRadius: "12px",
  padding: "12px",
  gap: "12px",
  lineHeight: "30px",
  whiteSpace: "pre",
});

const DailyAttendanceQuizResult = ({
  year,
  month,
  day,
  isOpen,
  onChangeIsOpen,
}: DateAttendanceModalProps) => {
  const today = getToday();
  const selectedDate = moment(`${year}-${month}-${day}`, "YYYY-MM-DD");
  const isPast = selectedDate.isBefore(today);
  const isToday =
    selectedDate.isSame(today, "year") &&
    selectedDate.isSame(today, "month") &&
    selectedDate.isSame(today, "day");
  const [error, dateData, isLoading] =
    useQuery.get(
      `/events/2025spring/quizzes/${year}-${`${month}`.padStart(
        2,
        "0"
      )}-${`${day}`.padStart(2, "0")}`,
      { skip: !isPast || isToday }
    ) || {};
  const [todayError, todayData, todayIsLoading] =
    useQuery.get(`/events/2025spring/quizzes/today`, { skip: !isToday }) || {};

  const isLogin = useIsLogin();
  const [userError, userData, userIsLoading] = useQuery.get(
    `/events/2025spring/quizzes/answers`,
    { skip: !isLogin }
  ) || [true, {}, true];
  const setAlert = useSetRecoilState(alertAtom);

  const [dateSelectedChoice, setDateSelectedChoice] = useState("");

  useEffect(() => {
    if (!isPast && !isToday && isOpen) {
      setAlert("아직 공개되지 않은 밸런스 게임입니다.");
      onChangeIsOpen && onChangeIsOpen(false);
    }
  }, [isPast, isToday, isOpen, setAlert, onChangeIsOpen]);

  useEffect(() => {
    setDateSelectedChoice("");
    if (
      (isPast || isToday) &&
      !userError &&
      !userIsLoading &&
      userData.answers.length !== 0
    ) {
      const selectedData = userData.answers.find(
        (entry: any) =>
          selectedDate.isSame(entry.quizDate, "year") &&
          selectedDate.isSame(entry.quizDate, "month") &&
          selectedDate.isSame(entry.quizDate, "day")
      );
      if (selectedData) {
        setDateSelectedChoice(selectedData.answer);
      }
    }
  }, [
    isPast,
    isToday,
    userError,
    userIsLoading,
    userData,
    selectedDate,
    dateSelectedChoice,
  ]);

  const styleIcon = {
    fontSize: "20px",
    fontWeight: 700,
    margin: "0 4px 4px 0",
    color: theme.black,
  };
  const styleTitle = {
    ...theme.font18,
    display: "flex",
    alignItems: "center",
    margin: "0 8px 12px",
  };
  const styleBody = {
    display: "flex",
  };
  const styleImageWrap = {
    flexGrow: 0,
    width: "25%",
    overflow: "hidden",
    marginRight: "12px",
    position: "relative" as const,
  };
  const styleImageBorder = {
    position: "relative" as const,
    aspectRatio: "1 / 1",
    border: `1px solid ${theme.gray_line}`,
    borderRadius: "10px",
    overflow: "hidden",
    backgroundColor: theme.white,
  };
  const styleImage = {
    width: "100%",
    height: "100%",
  };
  const styleContentBox = {
    width: 0,
    flexGrow: 1,
  };
  const styleQuizTitle = {
    ...theme.font16_bold,
    color: theme.black,
    marginBottom: "4px",
  };
  const styleDescription = {
    ...theme.font14,
    color: theme.black,
  };
  return (
    (isPast || isToday) && (
      <Modal
        padding="16px 12px 12px"
        isOpen={isOpen}
        onChangeIsOpen={onChangeIsOpen}
        css={{ display: "flex", flexDirection: "column" }}
      >
        {isToday
          ? !todayError &&
            !todayIsLoading && (
              <div>
                <div css={styleTitle}>
                  <QuestionMarkIcon style={styleIcon} />
                  오늘의 밸런스 게임
                </div>
                <WhiteContainer
                  css={{
                    padding: "12px 12px 12px 20px",
                    backgroundColor: theme.gray_background,
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
                    <div css={styleImageWrap}>
                      <div css={styleImageBorder}>
                        <img
                          src={todayData.quizImage}
                          alt={todayData.quizTitle}
                          css={styleImage}
                        />
                      </div>
                    </div>
                    <div css={styleContentBox}>
                      <div css={styleQuizTitle}>{todayData.quizTitle}</div>
                      <div
                        css={styleDescription}
                        dangerouslySetInnerHTML={{
                          __html: todayData.quizContent,
                        }}
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
                  }}
                >
                  <div
                    style={styleBox(
                      dateSelectedChoice === ""
                        ? false
                        : dateSelectedChoice === "A"
                    )}
                  >
                    {todayData.optionA}
                  </div>
                  <div
                    style={styleBox(
                      dateSelectedChoice === ""
                        ? false
                        : dateSelectedChoice === "B"
                    )}
                  >
                    {todayData.optionB}
                  </div>
                </div>
              </div>
            )
          : !error &&
            !isLoading && (
              <div>
                <div css={styleTitle}>
                  <QuestionMarkIcon style={styleIcon} />
                  {`${year}년 ${month}월 ${day}일의 밸런스 게임`}
                </div>
                <WhiteContainer
                  css={{
                    padding: "12px 12px 12px 20px",
                    backgroundColor: theme.gray_background,
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
                    <div css={styleImageWrap}>
                      <div css={styleImageBorder}>
                        <img
                          src={dateData.quizImage}
                          alt={dateData.quizTitle}
                          css={styleImage}
                        />
                        {/*{<div css={styleBlur} />}*/}
                      </div>
                    </div>
                    <div css={styleContentBox}>
                      <div css={styleQuizTitle}>{dateData.quizTitle}</div>
                      <div
                        css={styleDescription}
                        dangerouslySetInnerHTML={{
                          __html: dateData.quizContent,
                        }}
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
                  }}
                >
                  <div
                    style={styleBox(
                      dateSelectedChoice === ""
                        ? false
                        : dateSelectedChoice === "A"
                    )}
                  >
                    {dateData.optionA}
                    {"\n"}
                    {dateData.pickRatio.A.toFixed(1) + "%"}
                  </div>
                  <div
                    style={styleBox(
                      dateSelectedChoice === ""
                        ? false
                        : dateSelectedChoice === "B"
                    )}
                  >
                    {dateData.optionB}
                    {"\n"}
                    {dateData.pickRatio.B.toFixed(1) + "%"}
                  </div>
                </div>
              </div>
            )}
      </Modal>
    )
  );
};

export default DailyAttendanceQuizResult;
