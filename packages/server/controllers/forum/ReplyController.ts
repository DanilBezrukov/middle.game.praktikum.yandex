import type { Request, Response } from "express";
import { NextFunction } from "express";
import { ReplyModels } from "../../models/forum/ReplyModels";

export class ReplyController {
  public static async get(_: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const comment = await ReplyModels.findAll();
      res.json(comment);
    } catch (error) {
      next(error);
    }
  }

  public static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { text, authorName } = req.body || {};
      if (!text || !authorName) {
        res.status(400).send("Bad Request");
      }

      const comment = await ReplyModels.create({
        text,
        authorName,
      });

      res.status(201).json(comment);
    } catch (error) {
      next(error);
    }
  }
}
