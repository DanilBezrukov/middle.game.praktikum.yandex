import { useEffect, useRef } from "react";
import { uploadImg } from "@/app/utils/upload-img";
import { IBird, IObstacle } from "@/components/Game/type";
import { drawBird, drawInitialText, drawObstacle, drawScore } from "@/components/Game/gameRenderer";
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

export function Game({ endGame }: { endGame: (score: number) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | undefined | null>(null);

  let initBirdData: IBird;

  let bird: IBird;
  let obstacles: IObstacle[] = [];
  let score = 0;
  let gameOver = false;
  let gameStarted = false;

  let lastFrameTime = 0;

  const { backgroundImage, birdWingsDown, birdWingsUp, treeImage } = gameImages;

  let isFlutterWings = true;

  const handleClick = () => {
    if (!gameStarted) {
      gameStarted = true;
      lastFrameTime = performance.now();
      requestAnimationFrame(animate);
    } else {
      isFlutterWings = !isFlutterWings;
      birdJump(bird);
    }
  };

  function animate(timestamp: number) {
    const deltaTime = timestamp - lastFrameTime;
    lastFrameTime = timestamp;
    const scale = deltaTime / 1000;

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
        endGame(score);
      }

      score = getScore(bird, obstacle, score);
    }

    removeObstacle(obstacles, width);

    drawScore(ctx, width, score);
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

    Promise.all([
      uploadImg("src/assets/background-game.png", backgroundImage),
      uploadImg("src/assets/bird-wings-down.png", birdWingsDown),
      uploadImg("src/assets/bird-wings-up.png", birdWingsUp),
      uploadImg("src/assets/obstacle-to-game.png", treeImage),
    ]).then(() => {
      startGame();
    });
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
