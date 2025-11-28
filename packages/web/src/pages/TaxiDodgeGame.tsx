import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import { useIsLogin } from "@/hooks/useFetchRecoilState";
import { useAxios } from "@/hooks/useTaxiAPI";

import Footer from "@/components/Footer";
import { ModalLeaderboard } from "@/components/ModalPopup";
import WhiteContainerSuggestLogin from "@/components/WhiteContainer/WhiteContainerSuggestLogin";

import theme from "@/tools/theme";

import BananaImg from "@/static/assets/games/banana.png";
import BarigateImg from "@/static/assets/games/barigate.png";
import ConeImg from "@/static/assets/games/cone.png";
import KickImg from "@/static/assets/games/kick.png";
import PoliceImg from "@/static/assets/games/police.png";
import RoadImg from "@/static/assets/games/road.png";
import TaxiImg from "@/static/assets/games/taxi.png";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import LocalTaxiRoundedIcon from "@mui/icons-material/LocalTaxiRounded";

const PageWrapper = styled.div`
  width: 100%;
  background-color: ${theme.purple_background};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const HeaderContainer = styled.div`
  width: 100%;
  background-color: ${theme.white};
  box-shadow: ${theme.shadow};
  display: flex;
  justify-content: center;
`;

const HeaderContent = styled.div`
  width: calc(
    min(${theme.adaptivediv.center_device_max_width}px, 100%) -
      ${theme.adaptivediv.margin * 2}px
  );
  padding-top: 16px;
  padding-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const HeaderTitle = styled.div`
  color: ${theme.purple};
  ${theme.font18};
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  width: calc(
    min(${theme.adaptivediv.center_device_max_width}px, 100%) -
      ${theme.adaptivediv.margin * 2}px
  );
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
`;

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  overflow: hidden;
  touch-action: none;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
`;

const Canvas = styled.canvas`
  background-color: #333;
  border: 2px solid ${theme.purple};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 100%;
  max-height: 60vh;
`;

const ScoreArea = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const ScoreBoard = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: ${theme.purple};
  ${theme.font20}
`;

const Controls = styled.div`
  display: flex;
  gap: 140px;
  margin-top: 20px;
  width: 100%;
  max-width: 400px;
  justify-content: center;
`;

const Button = styled.button`
  background-color: ${theme.purple};
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 0 ${theme.purple_dark};
  &:active {
    transform: translateY(4px);
    box-shadow: none;
  }
  user-select: none;
`;

const RankingButton = styled.button`
  background-color: ${theme.white};
  color: ${theme.purple};
  border: 1px solid ${theme.purple};
  border-radius: 8px;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  &:hover {
    background-color: ${theme.purple_light};
  }
`;

const GameOverModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  z-index: 10;
  border: 1px solid ${theme.gray_line};
`;

const RestartButton = styled.button`
  margin-top: 15px;
  padding: 10px 20px;
  background-color: ${theme.purple};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  &:hover {
    background-color: ${theme.purple_dark};
  }
`;

const WarningText = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: red;
  font-weight: bold;
  font-size: 18px;
  background: rgba(255, 255, 255, 0.8);
  padding: 5px 10px;
  border-radius: 5px;
  pointer-events: none;
  white-space: nowrap;
`;

type ObstacleType = "barigate" | "cone" | "kick" | "police" | "banana";

const TaxiDodgeGame = () => {
  const history = useHistory();
  const isLogin = useIsLogin();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isRankingOpen, setIsRankingOpen] = useState(false);

  const request = useAxios();

  const gameOverRef = useRef(false);
  const taxiX = useRef(175);
  const obstacles = useRef<
    { x: number; y: number; speed: number; type: ObstacleType }[]
  >([]);
  const coins = useRef<{ x: number; y: number; speed: number }[]>([]);
  const floatingTexts = useRef<
    { x: number; y: number; text: string; opacity: number }[]
  >([]);
  const scoreRef = useRef(0);
  const animationFrameId = useRef<number>();
  const lastObstacleTime = useRef(0);
  const lastCoinTime = useRef(0);
  const keysPressed = useRef<Set<string>>(new Set());
  const backgroundY = useRef(0);
  const reverseEndTimeRef = useRef<number | null>(null);
  const timeLeftRef = useRef<number | null>(null);

  const taxiImage = useRef<HTMLImageElement>(new Image());
  const roadImage = useRef<HTMLImageElement>(new Image());
  const barigateImage = useRef<HTMLImageElement>(new Image());
  const coneImage = useRef<HTMLImageElement>(new Image());
  const bananaImage = useRef<HTMLImageElement>(new Image());
  const kickImage = useRef<HTMLImageElement>(new Image());
  const policeImage = useRef<HTMLImageElement>(new Image());

  const CANVAS_WIDTH = 350;
  const CANVAS_HEIGHT = 600;
  const TAXI_SIZE = 40;
  const OBSTACLE_SIZE = 40;
  const COIN_SIZE = 30;
  const BASE_TAXI_SPEED = 5;
  const HITBOX_PADDING = 8;

  useEffect(() => {
    taxiImage.current.src = TaxiImg;
    roadImage.current.src = RoadImg;
    barigateImage.current.src = BarigateImg;
    coneImage.current.src = ConeImg;
    bananaImage.current.src = BananaImg;
    kickImage.current.src = KickImg;
    policeImage.current.src = PoliceImg;
  }, []);

  useEffect(() => {
    if (gameOver) {
      request({
        url: "/miniGame/miniGames/update",
        method: "post",
        data: {
          creditAmount: score,
        },
      });
    }
  }, [gameOver, score, request]);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    gameOverRef.current = false;
    setScore(0);
    scoreRef.current = 0;
    taxiX.current = CANVAS_WIDTH / 2 - TAXI_SIZE / 2;
    obstacles.current = [];
    coins.current = [];
    floatingTexts.current = [];
    lastObstacleTime.current = 0;
    lastCoinTime.current = 0;
    keysPressed.current.clear();
    backgroundY.current = 0;
    reverseEndTimeRef.current = null;
    timeLeftRef.current = null;
    setTimeLeft(null);
    gameLoop(0);
  };

  const gameLoop = (timestamp: number) => {
    if (gameOverRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const difficultyLevel = 1 + Math.floor(scoreRef.current / 300) * 0.1;
    const currentTaxiSpeed =
      BASE_TAXI_SPEED * (1 + (difficultyLevel - 1) * 0.4);
    const obstacleSpeedBase = 4 * difficultyLevel;
    const obstacleSpawnInterval = 400 / difficultyLevel;

    if (reverseEndTimeRef.current) {
      const diff = reverseEndTimeRef.current - Date.now();
      if (diff <= 0) {
        reverseEndTimeRef.current = null;
        timeLeftRef.current = null;
        setTimeLeft(null);
      } else {
        const sec = Math.ceil(diff / 1000);
        if (sec !== timeLeftRef.current) {
          timeLeftRef.current = sec;
          setTimeLeft(sec);
        }
      }
    }

    const isReverse = !!reverseEndTimeRef.current;

    let moveLeft = keysPressed.current.has("ArrowLeft");
    let moveRight = keysPressed.current.has("ArrowRight");

    if (isReverse) {
      const temp = moveLeft;
      moveLeft = moveRight;
      moveRight = temp;
    }

    if (moveLeft) {
      taxiX.current = Math.max(0, taxiX.current - currentTaxiSpeed);
    }
    if (moveRight) {
      taxiX.current = Math.min(
        CANVAS_WIDTH - TAXI_SIZE,
        taxiX.current + currentTaxiSpeed
      );
    }

    backgroundY.current += obstacleSpeedBase;
    if (backgroundY.current >= CANVAS_HEIGHT) {
      backgroundY.current = 0;
    }

    ctx.drawImage(
      roadImage.current,
      0,
      backgroundY.current,
      CANVAS_WIDTH,
      CANVAS_HEIGHT
    );
    ctx.drawImage(
      roadImage.current,
      0,
      backgroundY.current - CANVAS_HEIGHT,
      CANVAS_WIDTH,
      CANVAS_HEIGHT
    );

    if (timestamp - lastObstacleTime.current > obstacleSpawnInterval) {
      const rand = Math.random();
      let type: ObstacleType = "barigate";
      let speedMultiplier = 1.0;

      if (rand < 0.3) {
        type = "barigate";
        speedMultiplier = 1.0;
      } else if (rand < 0.6) {
        type = "cone";
        speedMultiplier = 1.0;
      } else if (rand < 0.8) {
        type = "kick";
        speedMultiplier = 1.2;
      } else if (rand < 0.9) {
        type = "police";
        speedMultiplier = 1.5;
      } else {
        type = "banana";
        speedMultiplier = 1.0;
      }

      obstacles.current.push({
        x: Math.random() * (CANVAS_WIDTH - OBSTACLE_SIZE),
        y: -OBSTACLE_SIZE,
        speed: obstacleSpeedBase * speedMultiplier,
        type,
      });
      lastObstacleTime.current = timestamp;
    }

    for (let i = obstacles.current.length - 1; i >= 0; i--) {
      const obs = obstacles.current[i];
      obs.y += obs.speed;

      let img = barigateImage.current;
      if (obs.type === "cone") img = coneImage.current;
      else if (obs.type === "banana") img = bananaImage.current;
      else if (obs.type === "kick") img = kickImage.current;
      else if (obs.type === "police") img = policeImage.current;

      ctx.drawImage(img, obs.x, obs.y, OBSTACLE_SIZE, OBSTACLE_SIZE);

      if (
        taxiX.current + HITBOX_PADDING <
          obs.x + OBSTACLE_SIZE - HITBOX_PADDING &&
        taxiX.current + TAXI_SIZE - HITBOX_PADDING > obs.x + HITBOX_PADDING &&
        CANVAS_HEIGHT - TAXI_SIZE - 10 + HITBOX_PADDING <
          obs.y + OBSTACLE_SIZE - HITBOX_PADDING &&
        CANVAS_HEIGHT - 10 - HITBOX_PADDING > obs.y + HITBOX_PADDING
      ) {
        if (obs.type === "banana") {
          obstacles.current.splice(i, 1);
          const endTime = Date.now() + 5000;
          reverseEndTimeRef.current = endTime;

          const sec = 5;
          timeLeftRef.current = sec;
          setTimeLeft(sec);

          scoreRef.current += 200;
          setScore(scoreRef.current);

          floatingTexts.current.push({
            x: taxiX.current + TAXI_SIZE / 2,
            y: CANVAS_HEIGHT - TAXI_SIZE - 20,
            text: "+200",
            opacity: 1.0,
          });
          continue;
        } else {
          setGameOver(true);
          gameOverRef.current = true;
          if (animationFrameId.current)
            cancelAnimationFrame(animationFrameId.current);
          return;
        }
      }

      if (obs.y > CANVAS_HEIGHT) {
        obstacles.current.splice(i, 1);
        scoreRef.current += 10;
        setScore(scoreRef.current);
      }
    }

    if (timestamp - lastCoinTime.current > 1500) {
      if (Math.random() < 0.8) {
        coins.current.push({
          x: Math.random() * (CANVAS_WIDTH - COIN_SIZE),
          y: -COIN_SIZE,
          speed: obstacleSpeedBase,
        });
      }
      lastCoinTime.current = timestamp;
    }

    ctx.fillStyle = "#FFD700";
    ctx.strokeStyle = "#DAA520";
    ctx.lineWidth = 2;
    for (let i = coins.current.length - 1; i >= 0; i--) {
      const coin = coins.current[i];
      coin.y += coin.speed;

      ctx.beginPath();
      ctx.arc(
        coin.x + COIN_SIZE / 2,
        coin.y + COIN_SIZE / 2,
        COIN_SIZE / 2,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#DAA520";
      ctx.font = "bold 20px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("C", coin.x + COIN_SIZE / 2, coin.y + COIN_SIZE / 2);
      ctx.fillStyle = "#FFD700";

      if (
        taxiX.current < coin.x + COIN_SIZE &&
        taxiX.current + TAXI_SIZE > coin.x &&
        CANVAS_HEIGHT - TAXI_SIZE - 10 < coin.y + COIN_SIZE &&
        CANVAS_HEIGHT - 10 > coin.y
      ) {
        coins.current.splice(i, 1);
        scoreRef.current += 50;
        setScore(scoreRef.current);

        floatingTexts.current.push({
          x: taxiX.current + TAXI_SIZE / 2,
          y: CANVAS_HEIGHT - TAXI_SIZE - 20,
          text: "+50",
          opacity: 1.0,
        });
        continue;
      }

      if (coin.y > CANVAS_HEIGHT) {
        coins.current.splice(i, 1);
      }
    }

    ctx.font = "bold 20px Arial";
    ctx.textAlign = "center";
    for (let i = floatingTexts.current.length - 1; i >= 0; i--) {
      const ft = floatingTexts.current[i];
      ft.y -= 1;
      ft.opacity -= 0.02;

      if (ft.opacity <= 0) {
        floatingTexts.current.splice(i, 1);
        continue;
      }

      ctx.fillStyle = `rgba(255, 215, 0, ${ft.opacity})`;
      ctx.fillText(ft.text, ft.x, ft.y);
    }

    if (gameOverRef.current) return;

    ctx.drawImage(
      taxiImage.current,
      taxiX.current,
      CANVAS_HEIGHT - TAXI_SIZE - 10,
      TAXI_SIZE,
      TAXI_SIZE
    );

    animationFrameId.current = requestAnimationFrame(gameLoop);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current.add(e.key);
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key);
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (animationFrameId.current)
        cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  const handleLeftDown = () => keysPressed.current.add("ArrowLeft");
  const handleLeftUp = () => keysPressed.current.delete("ArrowLeft");
  const handleRightDown = () => keysPressed.current.add("ArrowRight");
  const handleRightUp = () => keysPressed.current.delete("ArrowRight");

  return (
    <PageWrapper>
      <HeaderContainer>
        <HeaderContent>
          <ArrowBackRoundedIcon
            style={{
              fill: theme.purple,
              cursor: "pointer",
              width: "24px",
              height: "24px",
            }}
            onClick={() => history.goBack()}
          />
          <HeaderTitle>
            <LocalTaxiRoundedIcon
              style={{ fill: theme.purple, width: "24px", height: "24px" }}
            />
            장애물 피하기
          </HeaderTitle>
        </HeaderContent>
      </HeaderContainer>
      <ContentWrapper>
        {isLogin ? (
          <>
            <ScoreArea>
              <ScoreBoard css={{ marginRight: "15px" }}>
                점수: {score}
              </ScoreBoard>
              <RankingButton onClick={() => setIsRankingOpen(true)}>
                <EmojiEventsRoundedIcon style={{ fontSize: "16px" }} />
                랭킹
              </RankingButton>
            </ScoreArea>
            <GameContainer>
              <div style={{ position: "relative" }}>
                <Canvas
                  ref={canvasRef}
                  width={CANVAS_WIDTH}
                  height={CANVAS_HEIGHT}
                />
                {timeLeft && (
                  <WarningText>
                    {timeLeft}초 동안 방향이 반대가 됩니다!
                  </WarningText>
                )}
                {!gameStarted && !gameOver && (
                  <GameOverModal>
                    <p>장애물을 피해 점수를 획득하세요!</p>
                    <RestartButton onClick={startGame}>게임 시작</RestartButton>
                  </GameOverModal>
                )}
                {gameOver && (
                  <GameOverModal>
                    <ScoreBoard css={{ marginBottom: "10px" }}>
                      게임 종료
                    </ScoreBoard>
                    <p>최종 점수: {score}</p>
                    <RestartButton onClick={startGame}>다시하기</RestartButton>
                  </GameOverModal>
                )}
              </div>
              <Controls>
                <Button
                  onPointerDown={timeLeft ? handleRightDown : handleLeftDown}
                  onPointerUp={timeLeft ? handleRightUp : handleLeftUp}
                  onPointerLeave={timeLeft ? handleRightUp : handleLeftUp}
                >
                  ◀
                </Button>
                <Button
                  onPointerDown={timeLeft ? handleLeftDown : handleRightDown}
                  onPointerUp={timeLeft ? handleLeftUp : handleRightUp}
                  onPointerLeave={timeLeft ? handleLeftUp : handleRightUp}
                >
                  ▶
                </Button>
              </Controls>
            </GameContainer>
          </>
        ) : (
          <WhiteContainerSuggestLogin />
        )}
      </ContentWrapper>
      <div style={{ paddingBottom: "30px" }}>
        <Footer type="only-logo" />
      </div>

      <ModalLeaderboard
        isOpen={isRankingOpen}
        onChangeIsOpen={setIsRankingOpen}
      />
    </PageWrapper>
  );
};

export default TaxiDodgeGame;
