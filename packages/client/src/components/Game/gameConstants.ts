export const settingObstacle = {
  width: 100,
  gap: 250,
  speed: 400,
};

export const birdConfig = {
  width: 60,
  height: 50,
  gravity: 1000,
};

if (import.meta.env.SSR) {
  class Image {}
  // @ts-ignore
  global.Image = Image;
}

export const gameImages = {
  backgroundImage: new Image(),
  birdWingsDown: new Image(),
  birdWingsUp: new Image(),
  treeImage: new Image(),
};
