import { NextFunction } from "express";
import { ThemeModel } from "../models/ThemeModel";
import type { Request, Response } from "express";

export class ThemeController {
  public static async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = Number(req.params.userId);
      if (isNaN(userId)) {
        res.status(400).json({ message: "Invalid userId" });
        return;
      }

      let theme = await ThemeModel.findOne({ where: { userId } });

      if (!theme) {
        theme = await ThemeController.create(userId);
        if (!theme) {
          res.status(500).json({ message: "Failed to create default theme" });
          return;
        }
      }

      res.json(theme);
    } catch (error) {
      next(error);
    }
  }

  public static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = Number(req.params.userId);
      if (isNaN(userId)) {
        res.status(400).json({ message: "Invalid userId" });
        return;
      }

      const { theme } = req.body || {};

      if (!theme || (theme !== "light" && theme !== "dark")) {
        res.status(400).json({ message: "Bad Request: theme must be 'light' or 'dark'" });
        return;
      }

      const [updated] = await ThemeModel.update({ theme }, { where: { userId } });

      if (!updated) {
        const newTheme = await ThemeController.create(userId, theme);
        if (!newTheme) {
          res.status(500).json({ message: "Failed to create theme" });
          return;
        }
        res.status(201).json({ message: "Theme created successfully", data: newTheme });
        return;
      }

      res.status(200).json({ message: "Theme updated successfully" });
    } catch (error) {
      next(error);
    }
  }

  private static async create(userId: number, theme = "light"): Promise<ThemeModel | null> {
    try {
      const newTheme = await ThemeModel.create({ userId, theme } as ThemeModel);
      return newTheme;
    } catch (error) {
      console.error("Error creating theme:", error);
      return null;
    }
  }
}
