import { Router } from "express";
import { ENDPOINTS } from "../endpoints";
import { TopicController } from "../controllers/forum/TopicController";
import { CommentController } from "../controllers/forum/CommentController";
import { ReplyController } from "../controllers/forum/ReplyController";
import { topicReactionController } from "../controllers/forum/TopicReactionController";
import { ThemeController } from "../controllers/ThemeController";

const router = Router();

router.get(ENDPOINTS.TOPIC, TopicController.get);
router.post(ENDPOINTS.TOPIC, TopicController.create);

router.get(ENDPOINTS.COMMENT, CommentController.get);
router.post(ENDPOINTS.COMMENT, CommentController.create);

router.get(ENDPOINTS.REPLY, ReplyController.get);
router.post(ENDPOINTS.REPLY, ReplyController.create);

router.get(ENDPOINTS.TOPIC_REACTION, topicReactionController.getReactionDictionary);
router.post(ENDPOINTS.TOPIC_REACTION, topicReactionController.toggleReaction);

router.get(`${ENDPOINTS.THEME}/:userId`, ThemeController.get);
router.post(`${ENDPOINTS.THEME}/:userId`, ThemeController.update);

export { router };
