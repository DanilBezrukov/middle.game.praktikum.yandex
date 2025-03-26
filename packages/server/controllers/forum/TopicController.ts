import type { Request, Response } from "express";
import { NextFunction } from "express";
import { TopicModels } from "../../models/forum/TopicModels";
import { CommentModels } from "../../models/forum/CommentModels";
import { Sequelize } from "sequelize-typescript";

export class TopicController {
  public static async get(_: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const topics = await TopicModels.findAll({
        order: [["id", "DESC"]],
        attributes: {
          include: [[Sequelize.fn("COUNT", Sequelize.col("comments.id")), "commentCount"]],
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

  public static async getTopicById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params || {};

    const currentTopic = await TopicModels.findOne({
      where: { id },
      include: [
        {
          association: "reactions",
          include: [
            {
              association: "reactionType",
            },
          ],
        },
        {
          association: "comments",
          include: [
            {
              association: "reactions",
              include: [{ association: "reactionType" }],
            },
          ],
        },
      ],
      order: [["comments", "id", "DESC"]],
    });

    if (!currentTopic) {
      res.status(404).send("Topic not found");

      return;
    }

    try {
      res.send(currentTopic);
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

      await TopicModels.create({
        title,
        description,
        authorName,
      });

      const topics = await TopicModels.findAll({
        order: [["id", "DESC"]],
        attributes: {
          include: [[Sequelize.fn("COUNT", Sequelize.col("comments.id")), "commentCount"]],
        },
        include: [
          {
            model: CommentModels,
            attributes: [],
          },
        ],
        group: ["TopicModels.id"],
      });

      res.status(201).json(topics);
    } catch (error) {
      next(error);
    }
  }
}
