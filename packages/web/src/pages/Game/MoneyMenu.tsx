import { Link } from "react-router-dom";

import theme from "@/tools/theme";

// 나중에 실제 게임 이미지로 교체 필요
// 현재는 텍스트 박스로 대체

const GameCard = ({
  title,
  description,
  to,
}: {
  title: string;
  description: string;
  to: string;
}) => {
  return (
    <Link to={to} style={{ textDecoration: "none", width: "100%" }}>
      <div
        css={{
          backgroundColor: theme.white,
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          overflow: "hidden",
          border: `1px solid ${theme.gray_line}`,
          transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
          ":hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 8px 16px rgba(0,0,0,0.12)",
          },
        }}
      >
        {/* 이미지 영역 (Placeholder) */}
        <div
          css={{
            width: "100%",
            height: "120px",
            backgroundColor: "#f0f0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: theme.gray_text,
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          (사진)
        </div>

        {/* 텍스트 영역 */}
        <div css={{ padding: "16px", textAlign: "center" }}>
          <div
            css={{
              ...theme.font16_bold,
              color: theme.black,
              marginBottom: "4px",
            }}
          >
            {title}
          </div>
          <div css={{ ...theme.font12, color: theme.gray_text }}>
            {description}
          </div>
        </div>
      </div>
    </Link>
  );
};

const MoneyMenu = () => {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        marginTop: "16px",
        marginBottom: "40px",
        padding: "0 24px",
      }}
    >
      <GameCard
        title="장애물 피하기"
        description="택시를 운전해 장애물을 피하고 코인을 획득하세요!"
        to="/game/money/dodge"
      />
      <GameCard
        title="경마"
        description="승리할 말을 예측하고 배팅하세요! (준비 중)"
        to="/game/money/racing"
      />
    </div>
  );
};

export default MoneyMenu;
