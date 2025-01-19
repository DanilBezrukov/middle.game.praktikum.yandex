import { GameStartedScreen } from "@/components/GameStartedScreen";
import { GameOverScreen } from "@/components/GameOverScreen";
import { Game } from "@/components/Game/Game";
import { useCallback, useState } from "react";

const gameScreens = {
  START: "START",
  GAME: "GAME",
  END: "END",
} as const;

type TGameScreen = keyof typeof gameScreens;

export function GameScreen() {
  const [gameScreen, setGameScreen] = useState<TGameScreen>(gameScreens.START);
  const [score, setScore] = useState<number>(0);

  const startGame = useCallback(() => setGameScreen(gameScreens.GAME), []);

  const endGame = useCallback((score: number) => {
    setGameScreen(gameScreens.END);
    setScore(score);
  }, []);

  const screen = {
    START: <GameStartedScreen setGameScreen={startGame} />,
    GAME: <Game endGame={endGame} />,
    END: <GameOverScreen score={score} setGameScreen={startGame} />,
  };
  return screen[gameScreen];
}
