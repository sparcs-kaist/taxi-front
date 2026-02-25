import { useEffect, useState } from "react";
import { Link, Redirect, Route, Switch, useLocation } from "react-router-dom";

import {
  useFetchRecoilState,
  useValueRecoilState,
} from "@/hooks/useFetchRecoilState";

import Footer from "@/components/Footer";
import HeaderWithBackButton from "@/components/Header/HeaderWithBackButton";
import Title from "@/components/Title";

// 라우팅될 컴포넌트들
import GameMain from "./GameMain";
import RacingGame from "./RacingGame";
import Store from "./Store";
import TaxiDodgeGame from "./TaxiDodgeGame";
import WordChainGame from "./WordChainGame";

import theme from "@/tools/theme";

import coinGif from "@/static/events/2024springCoin.gif";

const Game = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const [amount, setAmount] = useState(0);

  const minigameInfo = useValueRecoilState("gameInfo");
  const fetchMinigameInfo = useFetchRecoilState("gameInfo");

  // [디자인] 탭 버튼 스타일
  const getTabStyle = (path: string) => {
    // [수정] 하위 경로 포함하여 활성화 체크 (단, /game/money가 /game/main을 포함하진 않으므로 startsWith 사용 가능)
    // 정확한 매칭을 위해 조건을 세분화
    let isActive = false;
    if (path === "/game/money") {
      isActive = currentPath.startsWith("/game/money"); // /game/money, /game/money/dodge 등
    } else {
      isActive = currentPath === path;
    }

    return {
      flex: 1,
      textAlign: "center" as const,
      padding: "6px 0", // 높이 살짝 줄임
      fontSize: "13px",
      fontWeight: isActive ? "bold" : "normal",
      color: isActive ? theme.purple : theme.gray_text,
      textDecoration: "none",
      cursor: "pointer",

      // 활성화 시 스타일
      borderRadius: "18px",
      backgroundColor: isActive ? "#ffffff" : "transparent",
      boxShadow: isActive ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
      transition: "all 0.2s ease-in-out",
    };
  };

  useEffect(() => {
    fetchMinigameInfo();
  }, []);

  useEffect(() => {
    if (minigameInfo) {
      setAmount(minigameInfo.creditAmount || 0);
    }
  }, [minigameInfo]);

  // [로직] 뒤로가기 경로 설정 (서브 게임에서는 메뉴로, 그 외에는 홈으로)
  const backPath = currentPath.startsWith("/game/money/")
    ? "/game/money"
    : "/home";

  return (
    <>
      {/* [통합 헤더 영역]
        TitleBar와 NavigationBar를 모두 포함하는 Sticky Container입니다.
        전체를 흰색 배경으로 만들고, 가장 하단에만 그림자를 줍니다.
      */}
      <div
        style={{
          position: "sticky",
          top: "0",
          zIndex: 2,
          width: "100%",
          // 헤더 전체 덩어리 아래에 부드러운 그림자 추가
        }}
      >
        {/* 1. 상단: 뒤로가기 + 타이틀 + 코인 */}
        <HeaderWithBackButton backPath={backPath}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              paddingRight: "8px",
            }}
          >
            <Title>택시 강화하기</Title>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "4px 8px",
                borderRadius: "12px",
                backgroundColor: "#f9f9f9", // 코인 배경을 더 연하게
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
                {amount.toLocaleString()}
              </span>
            </div>
          </div>
        </HeaderWithBackButton>

        {/* 2. 하단: 네비게이션 탭 (헤더 내부로 통합) */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            paddingBottom: "12px", // 헤더 하단 여백
            margin: "0 auto ",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "90%",
              maxWidth: "360px",
              backgroundColor: "#f0f0f0", // 탭 트랙 배경색 (연한 회색)
              borderRadius: "20px",
              padding: "4px",
              marginTop: "8px",
            }}
          >
            <Link to="/game/main" style={getTabStyle("/game/main")} replace>
              메인
            </Link>
            <Link to="/game/store" style={getTabStyle("/game/store")} replace>
              상점
            </Link>
            <Link to="/game/money" style={getTabStyle("/game/money")} replace>
              미니게임
            </Link>
          </div>
        </div>
      </div>

      {/* 3. 실제 페이지 내용 */}
      <div
        style={{
          minHeight: "calc(100vh - 140px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          paddingTop: "10px",
        }}
      >
        <div style={{ width: "100%", maxWidth: "400px" }}>
          <Switch>
            <Route path="/game/main" component={GameMain} />
            <Route path="/game/store" component={Store} />

            <Route path="/game/money" component={TaxiDodgeGame} />
            <Route path="/game/racing" component={RacingGame} />
            <Route path="/game/word-chain" component={WordChainGame} />

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
