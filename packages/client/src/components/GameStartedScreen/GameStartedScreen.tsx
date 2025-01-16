export function GameStartedScreen({ setGameScreen }: { setGameScreen: () => void }) {
  return (
    <>
      <button onClick={setGameScreen}>Начать</button>
    </>
  );
}
