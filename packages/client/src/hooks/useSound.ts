const useSound = ({ url, volume, loop }: { url: string; volume?: number; loop?: boolean }) => {
  const audio = new Audio(url);
  audio.volume = volume || 1;
  audio.loop = loop || false;
  audio.controls = true;

  const play = () => audio.play();
  const stop = () => audio.pause();
  const toggle = async () => {
    if (!audio.paused) {
      stop();
    } else {
      await play();
    }
  };
  const mute = () => (audio.muted = true);

  return {
    ctx: audio,
    play,
    stop,
    toggle,
    mute,
  };
};

export default useSound;
