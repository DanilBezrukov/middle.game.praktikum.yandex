import { NextFunction } from "express";
import { ThemeModel } from "../models/ThemeModel";
import type { Request, Response } from "express";

export class ThemeController {
  public static async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId } = req.params;
      const theme = await ThemeModel.findOne({ where: { userId } });

      if (!theme) {
        res.status(404).json({ message: "Theme not found" });
        return;
      }

      res.json(theme);
    } catch (error) {
      next(error);
    }
  }

  public static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId } = req.params;
      const { theme } = req.body || {};

      if (!theme) {
        res.status(400).send("Bad Request");
        return;
      }

      const [updated] = await ThemeModel.update({ theme }, { where: { userId } });

      if (!updated) {
        res.status(404).json({ message: "Theme not found" });
        return;
      }

      res.status(200).json({ message: "Theme updated successfully" });
    } catch (error) {
      next(error);
    }
  }
}
