import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";

import AdaptiveDiv from "@/components/AdaptiveDiv";
import Title from "@/components/Title";

import theme from "@/tools/theme";

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  overflow: hidden;
  touch-action: none;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Canvas = styled.canvas`
  background-color: #fff;
  border: 2px solid ${theme.purple};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 100%;
  max-height: 60vh;
`;

const ScoreBoard = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
  color: ${theme.purple};
  ${theme.font20}
`;

const Controls = styled.div`
  display: flex;
  gap: 20px;
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

const TaxiDodgeGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const gameOverRef = useRef(false);
  const taxiX = useRef(175);
  const obstacles = useRef<{ x: number; y: number; speed: number }[]>([]);
  const scoreRef = useRef(0);
  const animationFrameId = useRef<number>();
  const lastObstacleTime = useRef(0);
  const keysPressed = useRef<Set<string>>(new Set());

  const CANVAS_WIDTH = 350;
  const CANVAS_HEIGHT = 600;
  const TAXI_SIZE = 40;
  const OBSTACLE_SIZE = 30;
  const TAXI_SPEED = 5;

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    gameOverRef.current = false;
    setScore(0);
    scoreRef.current = 0;
    taxiX.current = CANVAS_WIDTH / 2 - TAXI_SIZE / 2;
    obstacles.current = [];
    lastObstacleTime.current = 0;
    keysPressed.current.clear();
    gameLoop(0);
  };

  const gameLoop = (timestamp: number) => {
    if (gameOverRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 택시 움직임
    if (keysPressed.current.has("ArrowLeft")) {
      taxiX.current = Math.max(0, taxiX.current - TAXI_SPEED);
    }
    if (keysPressed.current.has("ArrowRight")) {
      taxiX.current = Math.min(
        CANVAS_WIDTH - TAXI_SIZE,
        taxiX.current + TAXI_SPEED
      );
    }

    // 캔버스 초기화
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // 장애물 생성
    if (timestamp - lastObstacleTime.current > 1000) {
      obstacles.current.push({
        x: Math.random() * (CANVAS_WIDTH - OBSTACLE_SIZE),
        y: -OBSTACLE_SIZE,
        speed: 3 + Math.random() * 3,
      });
      lastObstacleTime.current = timestamp;
    }

    ctx.fillStyle = "#8B4513";

    for (let i = obstacles.current.length - 1; i >= 0; i--) {
      const obs = obstacles.current[i];
      obs.y += obs.speed;

      // 장애물 모양
      ctx.beginPath();
      ctx.arc(
        obs.x + OBSTACLE_SIZE / 2,
        obs.y + OBSTACLE_SIZE / 2,
        OBSTACLE_SIZE / 2,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // 충돌 감지
      if (
        taxiX.current < obs.x + OBSTACLE_SIZE &&
        taxiX.current + TAXI_SIZE > obs.x &&
        CANVAS_HEIGHT - TAXI_SIZE - 10 < obs.y + OBSTACLE_SIZE &&
        CANVAS_HEIGHT - 10 > obs.y
      ) {
        setGameOver(true);
        gameOverRef.current = true;
        if (animationFrameId.current)
          cancelAnimationFrame(animationFrameId.current);
        return;
      }

      // 화면 밖으로 나가면 삭제하고 점수 추가
      if (obs.y > CANVAS_HEIGHT) {
        obstacles.current.splice(i, 1);
        scoreRef.current += 10;
        setScore(scoreRef.current);
      }
    }

    if (gameOverRef.current) return;

    // 택시 모양
    ctx.fillStyle = "#FFC107";
    ctx.fillRect(
      taxiX.current,
      CANVAS_HEIGHT - TAXI_SIZE - 10,
      TAXI_SIZE,
      TAXI_SIZE
    );

    ctx.fillStyle = "black";
    ctx.fillRect(taxiX.current + 5, CANVAS_HEIGHT - TAXI_SIZE - 5, 10, 5);
    ctx.fillRect(taxiX.current + 25, CANVAS_HEIGHT - TAXI_SIZE - 5, 10, 5);
    ctx.fillStyle = "white";
    ctx.fillRect(taxiX.current + 5, CANVAS_HEIGHT - TAXI_SIZE - 25, 30, 10);

    animationFrameId.current = requestAnimationFrame(gameLoop);
  };

  // 키보드 컨트롤
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
    <AdaptiveDiv type="center">
      <Title icon="taxi" isHeader>
        장애물 피하기
      </Title>
      <GameContainer>
        <ScoreBoard>점수: {score}</ScoreBoard>
        <div style={{ position: "relative" }}>
          <Canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
          {!gameStarted && !gameOver && (
            <GameOverModal>
              <h2>장애물 피하기 게임</h2>
              <p>장애물을 피하고 점수를 획득하세요!</p>
              <RestartButton onClick={startGame}>게임 시작</RestartButton>
            </GameOverModal>
          )}
          {gameOver && (
            <GameOverModal>
              <h2>게임 종료</h2>
              <p>최종 점수: {score}</p>
              <RestartButton onClick={startGame}>다시하기</RestartButton>
            </GameOverModal>
          )}
        </div>
        <Controls>
          <Button
            onPointerDown={handleLeftDown}
            onPointerUp={handleLeftUp}
            onPointerLeave={handleLeftUp}
          >
            ◀
          </Button>
          <Button
            onPointerDown={handleRightDown}
            onPointerUp={handleRightUp}
            onPointerLeave={handleRightUp}
          >
            ▶
          </Button>
        </Controls>
      </GameContainer>
    </AdaptiveDiv>
  );
};

export default TaxiDodgeGame;
