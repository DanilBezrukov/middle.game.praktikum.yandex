import { RefObject, useEffect, useState } from "react";

export const useFullscreen = ({ refElement }: { refElement: RefObject<HTMLElement> }) => {
  const [isOpenFullScreen, setIsOpenFullscreen] = useState<boolean>(false);

  const isInFullscreen = () => !!document.fullscreenElement;
  const requestFullscreen = async (element: HTMLElement) => {
    if (element.requestFullscreen) {
      await element.requestFullscreen();
    }
  };

  const exitFullScreen = async () => {
    if (document.exitFullscreen) {
      await document.exitFullscreen();
    }
  };
  const toggleFullScreen = async () => {
    if (refElement.current === null || !document.fullscreenEnabled) return;

    if (isInFullscreen()) {
      await exitFullScreen();
    } else {
      await requestFullscreen(refElement.current);
    }
  };

  useEffect(() => {
    const handleKeyF = async (e: KeyboardEvent) => {
      if (e.key.codePointAt(0) === 102 || e.key.codePointAt(0) === 1072) {
        await toggleFullScreen();
      }
    };
    const handleOpenFullscreen = () => {
      setIsOpenFullscreen(isInFullscreen());
    };

    document.addEventListener("fullscreenchange", handleOpenFullscreen);
    window.addEventListener("keydown", handleKeyF);

    return () => {
      document.removeEventListener("fullscreenchange", handleOpenFullscreen);
      window.removeEventListener("keydown", handleKeyF);
    };
  }, []);

  return {
    toggleFullScreen,
    isOpenFullScreen,
  };
};
