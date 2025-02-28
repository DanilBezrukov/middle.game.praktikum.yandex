import express from "express";
import formRoutes from "./forum.router";

const router = express.Router();
export default router.use(formRoutes);
