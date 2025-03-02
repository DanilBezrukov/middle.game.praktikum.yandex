import type { Request, Response } from "express";
import { NextFunction } from "express";
import { CommentModels } from "../../models/forum/CommentModels";

export class CommentController {
  public static async get(_: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const comment = await CommentModels.findAll();
      res.json(comment);
    } catch (error) {
      next(error);
    }
  }

  public static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { text } = req.body || {};
      if (!text) {
        res.status(400).send("Bad Request");
      }
      // @ts-ignore
      const comment = await CommentModels.create({
        text,
      });

      res.status(201).json(comment);
    } catch (error) {
      next(error);
    }
  }
}
