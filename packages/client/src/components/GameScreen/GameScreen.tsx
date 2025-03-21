import { GameStartedScreen } from "@/components/GameStartedScreen";
import { GameOverScreen } from "@/components/GameOverScreen";
import { birdTypes, Game } from "@/components/Game/Game";
import { useCallback, useEffect, useState } from "react";
import { GameSettingsScreen } from "@/components/GameSettingsScreen";
import { TBirds } from "@/components/Game/type";
import useSound from "@/hooks/useSound";
import clickSoundPath from "@/assets/sounds/button-click(chosic.com).mp3";
import gameSoundPath from "@/assets/sounds/Run-Amok(chosic.com).mp3";
import gameEndedSoundPath from "@/assets/sounds/animal_bird_duck_quack_003.mp3";

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
  const { play: clickSound } = useSound({ url: clickSoundPath });
  const { toggle: onToggleGameSound, stop: onStopGameSound } = useSound({
    url: gameSoundPath,
    volume: 0.2,
  });
  const { play: onEndSound } = useSound({ url: gameEndedSoundPath });
  const onToggleSound = async (event: KeyboardEvent) => {
    if (event.key.codePointAt(0) === 109 || event.key.codePointAt(0) === 1100) {
      await onToggleGameSound();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", onToggleSound);

    return () => {
      window.removeEventListener("keydown", onToggleSound);
      onStopGameSound();
    };
  }, []);

  const startGame = useCallback(() => {
    setGameScreen(gameScreens.GAME_SETTINGS);
    clickSound();
  }, []);

  const endGame = useCallback((score: number) => {
    onEndSound();
    setGameScreen(gameScreens.END);
    setScore(score);
  }, []);

  const onChooseBird = useCallback((variant: TBirds) => {
    setChosenBird(variant);
    setGameScreen(gameScreens.GAME);
    clickSound();
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
