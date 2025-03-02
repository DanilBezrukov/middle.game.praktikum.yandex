import { Router } from "express";
import { ENDPOINTS } from "../endpoints";
import { ThemeController } from "../controllers/ThemeController";

const themeRouter = Router();

themeRouter.get(ENDPOINTS.THEME, ThemeController.get);
themeRouter.post(ENDPOINTS.THEME, ThemeController.update);

export { themeRouter };
