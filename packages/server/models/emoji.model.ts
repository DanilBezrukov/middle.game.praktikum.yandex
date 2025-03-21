import { db } from "../db";
import { DataType } from "sequelize-typescript";

export const EmojiModel = db.define("EmojiModel", {
  type: {
    type: DataType.TEXT,
  },
});
