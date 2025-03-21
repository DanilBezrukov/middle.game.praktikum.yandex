import { NextFunction, Request, Response } from "express";
import { yandexServiceApi } from "../api/yandexServiceApi";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: unknown;
    }
  }
}
export const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  const cookie = Object.entries(req.cookies)
    .map(([key, val]) => `${key}=${val}`)
    .join(";");

  const user = await yandexServiceApi({ cookie });
  if (!user) {
    res.status(404).json({
      reason: "У вас нет доступа",
    });

    return;
  }

  req.user = user;
  next();
};
