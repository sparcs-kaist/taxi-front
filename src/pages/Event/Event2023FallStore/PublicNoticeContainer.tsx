import { css, keyframes } from "@emotion/react";
import { useMemo } from "react";

import useQuery from "hooks/useTaxiAPI";

import WhiteContainer from "components/WhiteContainer";

import dayjs, {
  dayDifference2str,
  dayNowServer,
  dayServerToClient,
} from "tools/day";
import theme from "tools/theme";

import CampaignRoundedIcon from "@mui/icons-material/CampaignRounded";

type Transaction = {
  text: string;
  createAt: Date;
};

const PublicNoticeContainer = () => {
  const { transactions }: { transactions: Array<Transaction> } = useQuery.get(
    "/events/2023fall/public-notice/recentTransactions"
  )[1] || { transactions: [] };
  const notices = useMemo(() => {
    const publicNotices = transactions
      .sort((a, b) => dayjs(b.createAt).diff(a.createAt))
      .map(
        ({ text, createAt }) =>
          `[${dayDifference2str(
            dayServerToClient(createAt),
            dayNowServer()
          )}] ${text}`
      );
    return [
      "[공지] 아이템이 조기 소진될 경우 9월 30일(토), 10월 5일(목)에 추가 입고될 예정입니다.",
      ...publicNotices,
      "[공지] 이벤트가 종료되면 아이템을 구매할 수 없습니다. 종료 전에 송편을 모두 소진해주세요.",
    ];
  }, [transactions]);
  const animationDuration = useMemo(
    () => notices.reduce((acc, text) => acc + text.length, 0) * 0.2,
    [notices]
  );

  return (
    <WhiteContainer
      css={{
        padding: "9px 16px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        css={{
          color: theme.purple,
          ...theme.font16_bold,
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}
      >
        안내
        <CampaignRoundedIcon
          css={{
            fill: theme.purple,
            height: "19px",
            width: "19px",
            marginTop: "-2px",
          }}
        />
      </div>
      <div
        css={{
          position: "relative",
          flexGrow: 1,
          width: 0,
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        <div
          css={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: "40px",
            background:
              "linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0))",
            zIndex: theme.zIndex_nav - 2,
          }}
        />
        <span
          css={css`
            display: inline-block;
            white-space: nowrap;
            animation: ${keyframes`
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          `} ${animationDuration}s linear infinite;
          `}
        >
          {[...notices, ...notices].map((text, index) => (
            <span key={index} css={{ padding: "0 20px", ...theme.font14 }}>
              {text}
            </span>
          ))}
        </span>
        <div
          css={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            width: "40px",
            background:
              "linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0))",
          }}
        />
        <div
          css={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            width: "40px",
            background:
              "linear-gradient(to left, rgba(255,255,255,1), rgba(255,255,255,0))",
          }}
        />
      </div>
    </WhiteContainer>
  );
};

export default PublicNoticeContainer;
