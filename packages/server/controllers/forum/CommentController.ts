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
      const { text, authorName, topicId } = req.body || {};
      if (!text || !authorName || !topicId) {
        res.status(400).send("Bad Request");
      }
      // @ts-ignore
      const comment = await CommentModels.create({
        text,
        authorName,
        topicId,
      });

      res.status(201).json(comment);
    } catch (error) {
      next(error);
    }
  }
}
