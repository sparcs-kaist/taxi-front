import { useEffect, useState } from "react";
import { Link, Redirect, Route, Switch, useLocation } from "react-router-dom";

import Footer from "@/components/Footer";
import HeaderWithBackButton from "@/components/Header/HeaderWithBackButton";
import Title from "@/components/Title";

// 라우팅될 컴포넌트들
import GameMain from "./GameMain";
import Money from "./Money";
import Store from "./Store";

import { useGetMiniGameInfo, type MiniGameInfo } from "@/hooks/game/useMiniGame";
import { useValueRecoilState } from "@/hooks/useFetchRecoilState";

import theme from "@/tools/theme";

import coinGif from "@/static/events/2024springCoin.gif";

const Game = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const getMiniGameInfo = useGetMiniGameInfo();
  const gameInfo = useValueRecoilState("gameInfo");
  const [miniGameInfo, setMiniGameInfo] = useState<MiniGameInfo | null>(null);

  // Fetch miniGame info on mount and when gameInfo changes (e.g., after reinforcement)
  useEffect(() => {
    getMiniGameInfo(
      (data) => {
        const status = data.miniGameStatus || data.newMiniGameStatus;
        if (status) {
          setMiniGameInfo(status);
        }
      },
      (error) => {
        console.error("Failed to fetch miniGame info:", error);
      }
    );
  }, [getMiniGameInfo, gameInfo?.level]); // Refresh when level changes

  // Use miniGame creditAmount if available, otherwise fall back to gameInfo creditAmount
  const creditAmount = miniGameInfo?.creditAmount ?? gameInfo?.creditAmount ?? 0;

  // [변경] 둥근 알약(Pill) 스타일의 탭 디자인
  const getTabStyle = (path: string) => {
    const isActive = currentPath === path;
    return {
      flex: 1,
      textAlign: "center" as const,
      padding: "8px 0",
      fontSize: "14px",
      fontWeight: isActive ? "bold" : "normal",
      color: isActive ? theme.purple : theme.gray_text,
      textDecoration: "none",
      cursor: "pointer",

      // 둥근 디자인 핵심 속성
      borderRadius: "20px", // 버튼 자체를 둥글게
      backgroundColor: isActive ? "#ffffff" : "transparent", // 활성화되면 흰색 배경
      boxShadow: isActive ? "0 2px 4px rgba(0,0,0,0.05)" : "none", // 활성화 시 살짝 그림자
      transition: "all 0.2s ease-in-out", // 부드러운 전환 효과
    };
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 스크롤을 막음
    document.body.style.overflow = "hidden";

    // 컴포넌트가 언마운트될 때 스크롤을 다시 활성화함
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      {/* 1. 최상단 고정 헤더 */}
      <HeaderWithBackButton>
        {/* 헤더 내부를 Flex로 만들어 좌우 끝으로 배치합니다.
          width: 100%를 주어야 Title과 Coin이 양옆으로 벌어집니다.
        */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between", // 양쪽 끝 정렬 (Title은 왼쪽, Coin은 오른쪽)
            alignItems: "center", // 세로 중앙 정렬
            width: "100%",
            paddingRight: "8px", // 오른쪽 여백 살짝 추가
          }}
        >
          {/* 왼쪽: 타이틀 */}
          <Title>택시 강화하기</Title>

          {/* 오른쪽: 코인 정보 (이미지 + 텍스트) */}
          <div
            style={{
              display: "flex",
              alignItems: "center", // 이미지와 텍스트 높이 맞춤
              gap: "6px", // 이미지와 텍스트 사이 간격
              backgroundColor: "rgba(255, 255, 255, 0.5)", // (선택사항) 가독성을 위한 연한 배경
              padding: "4px 8px",
              borderRadius: "12px",
            }}
          >
            <img
              src={coinGif}
              alt="coin"
              style={{ width: "20px", height: "20px", objectFit: "contain" }}
            />
            <span
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                color: theme.black || "#333",
              }}
            >
              {creditAmount.toLocaleString()}원
            </span>
          </div>
        </div>
      </HeaderWithBackButton>

      {/* 2. 내비게이션 탭 영역 */}
      <div
        style={{
          display: "flex",
          position: "sticky",
          top: "0",
          zIndex: 10,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: "10px", // 아래 콘텐츠와 간격을 위해 패딩 추가
        }}
      >
        <div
          style={{
            display: "flex",
            width: "90%", // 좌우 여백을 위해 90%만 사용
            maxWidth: "360px", // 너무 넓어지지 않도록 제한

            // [요청사항 1] 헤더와 떨어뜨리기
            marginTop: "10px",

            // [요청사항 2] 전체 바를 동그랗게 만들기
            backgroundColor: "#f5f5f5", // 연한 회색 배경
            borderRadius: "25px", // 둥근 모서리
            padding: "4px", // 내부 버튼과의 간격
          }}
        >
          <Link to="/game/main" style={getTabStyle("/game/main")}>
            메인
          </Link>
          <Link to="/game/store" style={getTabStyle("/game/store")}>
            상점
          </Link>
          <Link to="/game/money" style={getTabStyle("/game/money")}>
            돈 벌기
          </Link>
        </div>
      </div>

      {/* 3. 실제 페이지 내용 */}
      <div
        style={{
          // backgroundColor: theme.gray_background, // 필요하다면 배경색 유지
          minHeight: "calc(100vh - 140px)", // 헤더 + 내비게이션 높이만큼 뺌
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ width: "100%", maxWidth: "400px" }}>
          <Switch>
            <Route path="/game/main" component={GameMain} />
            <Route path="/game/store" component={Store} />
            <Route path="/game/money" component={Money} />

            <Route exact path="/game">
              <Redirect to="/game/main" />
            </Route>
          </Switch>
        </div>
        <Footer type="game" />
      </div>
    </>
  );
};

export default Game;
