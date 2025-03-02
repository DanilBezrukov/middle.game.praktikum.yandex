import { db } from "../db";
import { DataType } from "sequelize-typescript";

export const ForumModel = db.define("ForumModel", {
  title: {
    type: DataType.TEXT,
  },
});
