import express from "express";
import { ENDPOINTS } from "../endpoints";

const router = express.Router();

export default router.get(ENDPOINTS.FORM, (_, res) => {
  res.send("Hello from forum");
});
