import { IBird, IObstacle } from "@/components/Game/type";
import { settingObstacle } from "@/components/Game/gameConstants";

export function getScore(bird: IBird, obstacle: IObstacle, score: number) {
  const obstacleWidth = obstacle.x + settingObstacle.width;
  if (bird.x > obstacleWidth + 1 && !obstacle.registeredScore) {
    obstacle.registeredScore = true;
    return ++score;
  }
  return score;
}
