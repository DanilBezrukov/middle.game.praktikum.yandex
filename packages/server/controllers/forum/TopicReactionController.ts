import { Request, Response } from "express";
import { TopicReactionModel } from "../../models/forum/TopicReactionModel";
import { UserReactionModel } from "../../models/forum/UserReactionModel";
import { CreationAttributes } from "sequelize";

class TopicReactionController {
  async toggleReaction(req: Request, res: Response) {
    // eslint-disable-next-line camelcase
    const { topic_id } = req.params;
    const topicId = parseInt(topic_id, 10);
    // eslint-disable-next-line camelcase
    const { reaction_name } = req.body;
    // eslint-disable-next-line camelcase
    if (!topic_id) {
      res.status(400).send("Bad request");
      return;
    }

    const userId = res.locals.user.id;

    try {
      // Убираем реакцию с поста
      // eslint-disable-next-line camelcase
      if (!reaction_name) {
        TopicReactionModel.destroy({
          where: {
            // eslint-disable-next-line camelcase
            user_id: userId,
            // eslint-disable-next-line camelcase
            topic_id,
          },
        });
        res.send("Deleted");
        return;
      }

      const [reaction] = await TopicReactionModel.findOrCreate({
        where: {
          // eslint-disable-next-line camelcase
          user_id: userId,
          // eslint-disable-next-line camelcase
          topic_id: topicId,
        },
        defaults: {
          // eslint-disable-next-line camelcase
          user_id: userId,
          // eslint-disable-next-line camelcase
          topic_id: topicId,
          // eslint-disable-next-line camelcase
          reaction_name,
        } as CreationAttributes<TopicReactionModel>,
      });
      // eslint-disable-next-line camelcase
      reaction.update({ reaction_name });
      res.send("Updated");
    } catch (e) {
      res.status(500).send(e);
    }
  }

  async getReactionDictionary(_: Request, res: Response) {
    try {
      const userReactionDictionary = await UserReactionModel.findAll();
      res.send(userReactionDictionary);
    } catch (e) {
      res.status(500).send(e);
    }
  }
}

const topicReactionController = new TopicReactionController();

export { topicReactionController };
