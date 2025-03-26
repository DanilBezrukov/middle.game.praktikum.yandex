import { Request, Response } from "express";
import { ReactionTypeModel } from "../../models/forum/ReactionTypeModel";
import { TopicModels } from "../../models/forum/TopicModels";
import { TopicReactionModel } from "../../models/forum/TopicReactionModel";
import { CommentModels } from "../../models/forum/CommentModels";
import { CommentReactionModel } from "../../models/forum/CommentReactionModel";
import { ENDPOINTS } from "../../endpoints";

class ReactionController {
  async toggleReaction(req: Request, res: Response) {
    const { targetType, targetId, reactionId, currentTopicId } = req.body;

    if (!Number(reactionId) || !Number(targetId) || !Number(currentTopicId)) {
      res.status(400).send("Bad Request");
      return;
    }

    const reactionType = await ReactionTypeModel.findOne({
      where: { id: reactionId },
    });

    if (!reactionType) {
      res.status(404).send("Not found Reaction");
      return;
    }

    try {
      if (targetType === "topic") {
        const topic = await TopicModels.findOne({
          where: { id: targetId },
        });

        if (topic) {
          await TopicReactionModel.create({
            topicId: targetId,
            reactionTypeId: reactionId,
          });
        }
      }

      if (targetType === "comment") {
        const comment = await CommentModels.findOne({
          where: { id: targetId },
        });

        if (comment) {
          await CommentReactionModel.create({
            commentId: targetId,
            reactionTypeId: reactionId,
          });
        }
      }

      res.status(200).redirect(`/owner-server/${ENDPOINTS.TOPIC}/${currentTopicId}`);
    } catch (e) {
      res.status(500).send(e);
    }
  }

  async getReactionDictionary(_: Request, res: Response) {
    try {
      const userReactionDictionary = await ReactionTypeModel.findAll();
      res.send(userReactionDictionary);
    } catch (e) {
      res.status(500).send(e);
    }
  }
}

const topicReactionController = new ReactionController();

export { topicReactionController };
