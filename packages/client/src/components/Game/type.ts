export interface IBird {
  x: number;
  y: number;
  width: number;
  height: number;
  gravity: number;
  lift: number;
  velocity: number;
}

export interface IObstacle {
  x: number;
  top: number;
  bottom: number;
  registeredScore: boolean;
}
