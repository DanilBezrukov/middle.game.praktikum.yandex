import { randomInteger } from "@/app/utils/randomInteger";
import { settingObstacle } from "@/components/Game/gameConstants";
import { IBird, IObstacle } from "@/components/Game/type";

function getObstacle(canvasHeight: number, canvasWidth: number): IObstacle {
  const minHeight = 40;
  const topHeight = randomInteger(100, canvasHeight - minHeight * 5);

  return {
    x: canvasWidth,
    top: topHeight,
    bottom: topHeight + settingObstacle.gap,
    registeredScore: false,
  };
}

export function moveObstacle(obstacle: IObstacle, scale: number): void {
  obstacle.x -= settingObstacle.speed * scale;
}

export function checkCollision(bird: IBird, obstacle: IObstacle, canvasHeight: number): boolean {
  const birdWidth = bird.x + bird.width;
  const obstacleWidth = obstacle.x + settingObstacle.width;

  const collisionOnX = birdWidth >= obstacle.x && bird.x < obstacleWidth;
  const collisionOnY = bird.y <= obstacle.top || bird.y + bird.height >= obstacle.bottom;
  const collisionWithObstacle = collisionOnX && collisionOnY;

  const collisionWithBorders = bird.y <= 0 || bird.y + bird.height >= canvasHeight;
  return collisionWithObstacle || collisionWithBorders;
}

function checkObstacleAdd(
  obstacles: IObstacle[],
  canvasWidth: number,
  spaceBetween: number,
): boolean {
  return obstacles.length === 0 || obstacles[obstacles.length - 1].x < canvasWidth - spaceBetween;
}

function checkObstacleRemove(obstacles: IObstacle[], canvasWidth: number) {
  return obstacles[0].x + canvasWidth + 1 < 0;
}

export function addObstacle(obstacles: IObstacle[], canvasWidth: number, canvasHeight: number) {
  if (checkObstacleAdd(obstacles, canvasWidth, randomInteger(300, 900))) {
    const newObstacle = getObstacle(canvasHeight, canvasWidth);
    obstacles.push(newObstacle);
  }
}

export function removeObstacle(obstacles: IObstacle[], canvasWidth: number) {
  if (checkObstacleRemove(obstacles, canvasWidth)) {
    obstacles.shift();
  }
}
