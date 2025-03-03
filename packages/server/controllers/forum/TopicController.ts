import { NextFunction } from "express";
import { TopicModels } from "../../models/forum/TopicModels";
import type { Request, Response } from "express";
import { CommentModels } from "../../models/forum/CommentModels";
import { Sequelize } from "sequelize-typescript";

export class TopicController {
  public static async get(_: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const topics = await TopicModels.findAll({
        attributes: {
          include: [[Sequelize.fn("COUNT", Sequelize.col("comments.id")), "count"]],
        },
        include: [
          {
            model: CommentModels,
            attributes: [],
          },
        ],
        group: ["TopicModels.id"],
      });
      res.json(topics);
    } catch (error) {
      next(error);
    }
  }

  public static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { title, description, authorName } = req.body || {};
      if (!title || !authorName) {
        res.status(400).send("Bad Request");
      }

      // @ts-ignore
      const topics = await TopicModels.create({
        title,
        description,
        authorName,
      });

      res.status(201).json(topics);
    } catch (error) {
      next(error);
    }
  }
}
