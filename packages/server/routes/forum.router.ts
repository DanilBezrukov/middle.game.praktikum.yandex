import { Router } from "express";
import { ENDPOINTS } from "../endpoints";
import { TopicController } from "../controllers/forum/TopicController";
import { CommentController } from "../controllers/forum/CommentController";
import { ReplyController } from "../controllers/forum/ReplyController";
import { topicReactionController } from "../controllers/forum/TopicReactionController";

const forumRouter = Router();

forumRouter.get(ENDPOINTS.TOPIC, TopicController.get);
forumRouter.post(ENDPOINTS.TOPIC, TopicController.create);

forumRouter.get(ENDPOINTS.COMMENT, CommentController.get);
forumRouter.post(ENDPOINTS.COMMENT, CommentController.create);

forumRouter.get(ENDPOINTS.REPLY, ReplyController.get);
forumRouter.post(ENDPOINTS.REPLY, ReplyController.create);

forumRouter.get(ENDPOINTS.TOPIC_REACTION, topicReactionController.getReactionDictionary);
forumRouter.post(ENDPOINTS.TOPIC_REACTION, topicReactionController.toggleReaction);

export { forumRouter };
