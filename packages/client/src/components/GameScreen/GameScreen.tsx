import { GameStartedScreen } from "@/components/GameStartedScreen";
import { GameOverScreen } from "@/components/GameOverScreen";
import { birdTypes, Game } from "@/components/Game/Game";
import { useCallback, useState } from "react";
import { GameSettingsScreen } from "@/components/GameSettingsScreen";
import { TBirds } from "@/components/Game/type";

const gameScreens = {
  START: "START",
  GAME: "GAME",
  GAME_SETTINGS: "GAME_SETTINGS",
  END: "END",
} as const;

type TGameScreen = keyof typeof gameScreens;

export function GameScreen({ renderInstruction }: { renderInstruction: () => void }) {
  const [gameScreen, setGameScreen] = useState<TGameScreen>(gameScreens.START);
  const [chosenBird, setChosenBird] = useState<TBirds>(birdTypes.GREEN);
  const [score, setScore] = useState<number>(0);

  const startGame = useCallback(() => setGameScreen(gameScreens.GAME_SETTINGS), []);

  const endGame = useCallback((score: number) => {
    setGameScreen(gameScreens.END);
    setScore(score);
  }, []);

  const onChooseBird = useCallback((variant: TBirds) => {
    setChosenBird(variant);
    setGameScreen(gameScreens.GAME);
  }, []);

  const screen = {
    START: <GameStartedScreen setGameScreen={startGame} />,
    GAME_SETTINGS: <GameSettingsScreen onChooseBird={onChooseBird} />,
    GAME: (
      <Game
        endGame={endGame}
        options={{
          initialBird: chosenBird,
        }}
      />
    ),
    END: <GameOverScreen score={score} setGameScreen={startGame} />,
  };
  return (
    <>
      {screen[gameScreen]}
      {gameScreen !== gameScreens.GAME && renderInstruction()}
    </>
  );
}
