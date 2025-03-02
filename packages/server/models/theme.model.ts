import { db } from "../db";
import { DataType } from "sequelize-typescript";

export const ThemeModel = db.define("ThemeModel", {
  type: {
    type: DataType.TEXT,
  },
});
