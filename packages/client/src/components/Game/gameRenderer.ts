import { IBird, IObstacle } from "@/components/Game/type";

export function drawBird(
  ctx: CanvasRenderingContext2D,
  bird: IBird,
  birdImage: HTMLImageElement,
): void {
  ctx.drawImage(birdImage, bird.x, bird.y, bird.width + 20, bird.height + 20);
}

export function drawObstacle(
  ctx: CanvasRenderingContext2D,
  obstacle: IObstacle,
  treeImage: HTMLImageElement,
  width: number,
  canvasHeight: number,
): void {
  const heightTop = obstacle.top;
  const heightBottom = canvasHeight - obstacle.bottom;

  ctx.save();
  ctx.translate(obstacle.x + width / 2, heightTop);
  ctx.rotate(Math.PI);

  ctx.drawImage(treeImage, -width / 2, 0, width, heightTop);
  ctx.restore();

  ctx.drawImage(treeImage, obstacle.x, obstacle.bottom, width, heightBottom);
}

export function drawScore(ctx: CanvasRenderingContext2D, canvasWidth: number, score: number): void {
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.fillText(`Счет: ${score}`, canvasWidth / 2 - 15, 30);
}

export function drawLevel(
  ctx: CanvasRenderingContext2D,
  canvasWidth: number,
  level: number,
  nextLevel: number,
): void {
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.fillText(`Уровень: ${level}`, canvasWidth / 2 - 15, 70);
  ctx.fillText(`Следующий уровень после: ${nextLevel}`, canvasWidth / 2 - 15, 110);
}

export function drawBackground(
  ctx: CanvasRenderingContext2D,
  backgroundImage: HTMLImageElement,
  width: number,
  height: number,
  x = 0,
  y = 0,
): void {
  ctx.drawImage(backgroundImage, x, y, width, height);
}

export function drawInitialText(ctx: CanvasRenderingContext2D) {
  ctx.font = "40px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Начать?", ctx.canvas.width / 2, ctx.canvas.height / 3);
}

export function drawPauseEffect(ctx: CanvasRenderingContext2D) {
  ctx.rect(0, 0, 900, 600);
  ctx.fillStyle = "rgba(225, 225, 225, 0.5)";
  ctx.fill();

  ctx.font = "40px Arial";
  ctx.textAlign = "center";
  ctx.fillStyle = "black";
  ctx.fillText("Пауза", ctx.canvas.width / 2, ctx.canvas.height / 3);
}
