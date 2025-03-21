import { Router } from "express";
import { ENDPOINTS } from "../endpoints";
import { TopicController } from "../controllers/forum/TopicController";
import { CommentController } from "../controllers/forum/CommentController";
import { ReplyController } from "../controllers/forum/ReplyController";
import { topicReactionController } from "../controllers/forum/TopicReactionController";
import { ThemeController } from "../controllers/ThemeController";
import { isAuth } from "../middlewares/isAuth";

const router = Router();

router.get(ENDPOINTS.TOPIC, isAuth, TopicController.get);
router.post(ENDPOINTS.TOPIC, isAuth, TopicController.create);

router.get(ENDPOINTS.COMMENT, isAuth, CommentController.get);
router.post(ENDPOINTS.COMMENT, isAuth, CommentController.create);

router.get(ENDPOINTS.REPLY, isAuth, ReplyController.get);
router.post(ENDPOINTS.REPLY, isAuth, ReplyController.create);

router.get(ENDPOINTS.TOPIC_REACTION, isAuth, topicReactionController.getReactionDictionary);
router.post(ENDPOINTS.TOPIC_REACTION, isAuth, topicReactionController.toggleReaction);

router.get(`${ENDPOINTS.THEME}/:userId`, ThemeController.get);
router.post(`${ENDPOINTS.THEME}/:userId`, ThemeController.update);

export { router };
