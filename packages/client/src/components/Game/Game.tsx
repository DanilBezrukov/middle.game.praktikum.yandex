import { useCallback, useEffect, useRef } from "react";
import { uploadImg } from "@/app/utils/upload-img";
import { IBird, IObstacle, TBirds } from "@/components/Game/type";
import {
  drawBird,
  drawInitialText,
  drawLevel,
  drawObstacle,
  drawPauseEffect,
  drawScore,
} from "@/components/Game/gameRenderer";
import {
  addObstacle,
  checkCollision,
  moveObstacle,
  removeObstacle,
} from "@/components/Game/obstacle";
import { birdConfig, gameImages, settingObstacle } from "@/components/Game/gameConstants";
import { getScore } from "@/components/Game/gameLogic";
import { birdJump, updateBirdPosition } from "@/components/Game/bird";
import "./Game.scss";
import backgroundGameImgPath from "@/assets/background-game.png";
import obstacleImgPath from "@/assets/obstacle-to-game.png";
import { birdSkins } from "@/components/Game/birdSkins";
import useSound from "@/hooks/useSound";
import windsSound from "@/assets/sounds/wing-flap-1-6434_a3LUleD4.mp3";
import { useLazyGetLeaderboardQuery, useSubmitLeaderboardMutation } from "@/api/leaderboardApi";
import { useActions, useAppSelector } from "@/hooks";
import { selectProfileInfo } from "@/store/selectors/profileSelectors";

type GameOptionsType = {
  initialBird?: TBirds;
};

export const birdTypes = {
  YELLOW: "YELLOW",
  GREEN: "GREEN",
  RED: "RED",
} as const;

export function Game({
  endGame,
  options = {},
}: {
  endGame: (score: number) => void;
  options: GameOptionsType;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | undefined | null>(null);
  const { play: windSound } = useSound({ url: windsSound, volume: 1 });

  const profile = useAppSelector(selectProfileInfo);
  const [submitLeaderboard] = useSubmitLeaderboardMutation();
  const [getLeaders] = useLazyGetLeaderboardQuery();
  const { setLeaders } = useActions();

  let initBirdData: IBird;
  let bird: IBird;
  let obstacles: IObstacle[] = [];
  let score = 0;
  let gameOver = false;
  let gameStarted = false;
  let pause = false;
  let level = 1;
  let scoreToNextLevel = 20;
  let lastFrameTime = 0;
  const { backgroundImage, birdWingsDown, birdWingsUp, treeImage } = gameImages;
  let isFlutterWings = true;

  const handleClick = useCallback(() => {
    if (!gameStarted) {
      gameStarted = true;
      lastFrameTime = performance.now();
      requestAnimationFrame(animate);
    } else {
      isFlutterWings = !isFlutterWings;
      birdJump(bird);
    }
    windSound();
  }, []);

  const handleGameOver = async (score: number) => {
    endGame(score);
    await submitLeaderboard({
      data: { name: profile.first_name, ppBirdScore: score },
      ratingFieldName: "ppBirdScore",
      teamName: "pixelPioneers",
    });

    const { data: leaders } = await getLeaders({
      ratingFieldName: "ppBirdScore",
      cursor: 0,
      limit: 50,
    });

    setLeaders(leaders);
    if (Notification.permission === "granted") {
      new Notification("Поздравляем!", {
        body: `Вы набрали ${score} очков!`,
      });
    }
  };

  function changeSpeed(start: number) {
    if (score === scoreToNextLevel && level <= 5) {
      level++;
      scoreToNextLevel += 20;
    }
    return start - level * 100;
  }

  function animate(timestamp: number) {
    const deltaTime = timestamp - lastFrameTime;
    lastFrameTime = timestamp;
    const scale = deltaTime / changeSpeed(1100);

    if (pause && ctxRef.current) {
      drawPauseEffect(ctxRef.current);
      return;
    }

    updateGame(scale);

    if (!gameOver) {
      requestAnimationFrame(animate);
    }
  }

  function updateGame(scale: number) {
    if (!ctxRef.current) return;
    const ctx = ctxRef.current;
    const { width, height } = ctx.canvas;

    ctx.clearRect(0, 0, width, height);

    updateBirdPosition(bird, scale);
    drawBird(ctx, bird, isFlutterWings ? birdWingsDown : birdWingsUp);
    addObstacle(obstacles, width, height);

    for (let i = 0; i < obstacles.length; i++) {
      const obstacle = obstacles[i];

      moveObstacle(obstacle, scale);
      drawObstacle(ctx, obstacle, treeImage, settingObstacle.width, height);

      if (checkCollision(bird, obstacle, height)) {
        gameOver = true;
        handleGameOver(score);
      }

      score = getScore(bird, obstacle, score);
    }

    removeObstacle(obstacles, width);
    drawScore(ctx, width, score);
    drawLevel(ctx, width, level, scoreToNextLevel);
  }

  function startGame() {
    if (!ctxRef.current) return;

    bird = { ...initBirdData };
    obstacles = [];
    score = 0;
    gameOver = false;
    gameStarted = false;

    showReadyScreen(ctxRef.current);
  }

  function showReadyScreen(ctx: CanvasRenderingContext2D) {
    drawInitialText(ctx);
    drawBird(ctx, bird, isFlutterWings ? birdWingsDown : birdWingsUp);
  }

  function handlerPause(e: KeyboardEvent) {
    if (!gameStarted) return;
    const isPauseKey = e.key.codePointAt(0) === 112 || e.key.codePointAt(0) === 1079;
    if (isPauseKey && !pause) {
      pause = true;
    } else if (isPauseKey && pause) {
      pause = false;
      lastFrameTime = performance.now();
      requestAnimationFrame(animate);
    }
  }

  useEffect(() => {
    ctxRef.current = canvasRef.current?.getContext("2d");
    if (canvasRef.current) {
      initBirdData = {
        ...birdConfig,
        x: 100,
        y: canvasRef.current.height / 3,
        velocity: 0,
        lift: -(canvasRef.current.height / 2),
      };
    }

    window.addEventListener("keydown", handlerPause);

    const { initialBird = birdTypes.GREEN } = options;

    Promise.all([
      uploadImg(backgroundGameImgPath, backgroundImage),
      uploadImg(birdSkins[initialBird].down, birdWingsDown),
      uploadImg(birdSkins[initialBird].up, birdWingsUp),
      uploadImg(obstacleImgPath, treeImage),
    ]).then(() => {
      startGame();
    });

    return () => window.removeEventListener("keydown", handlerPause);
  }, []);

  return (
    <canvas
      onClick={handleClick}
      ref={canvasRef}
      width="900px"
      height="600px"
      id="canvas-game"></canvas>
  );
}
