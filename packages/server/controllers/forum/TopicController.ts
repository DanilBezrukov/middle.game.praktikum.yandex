import { NextFunction } from "express";
import { TopicModels } from "../../models/forum/TopicModels";
import type { Request, Response } from "express";

export class TopicController {
  public static async get(_: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const topics = await TopicModels.findAll();
      res.json(topics);
    } catch (error) {
      next(error);
    }
  }

  public static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { title, description, authorId, count } = req.body || {};
      if (!title) {
        res.status(400).send("Bad Request");
      }

      // @ts-ignore
      const topics = await TopicModels.create({
        title,
        description,
        authorId,
        count,
      });

      res.status(201).json(topics);
    } catch (error) {
      next(error);
    }
  }
}
