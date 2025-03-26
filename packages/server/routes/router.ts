import { Router } from "express";
import { ENDPOINTS } from "../endpoints";
import { TopicController } from "../controllers/forum/TopicController";
import { CommentController } from "../controllers/forum/CommentController";
import { ThemeController } from "../controllers/ThemeController";
import { topicReactionController } from "../controllers/forum/ReactionController";
import { isAuth } from "../middlewares/isAuth";

const router = Router();

router.get(ENDPOINTS.TOPIC, isAuth, TopicController.get);
router.get(`${ENDPOINTS.TOPIC}/:id`, isAuth, TopicController.getTopicById);
router.post(ENDPOINTS.TOPIC, isAuth, TopicController.create);

router.get(ENDPOINTS.COMMENT, isAuth, CommentController.get);
router.post(ENDPOINTS.COMMENT, isAuth, CommentController.create);

router.post(ENDPOINTS.REACTION, isAuth, topicReactionController.toggleReaction);
router.get(ENDPOINTS.REACTION_DICTIONARY, isAuth, topicReactionController.getReactionDictionary);

router.get(`${ENDPOINTS.THEME}/:userId`, isAuth, ThemeController.get);
router.post(`${ENDPOINTS.THEME}/:userId`, isAuth, ThemeController.update);

export { router };
