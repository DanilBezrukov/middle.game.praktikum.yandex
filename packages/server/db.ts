import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { TopicModels } from "./models/forum/TopicModels";
import { CommentModels } from "./models/forum/CommentModels";
import { TopicReactionModel } from "./models/forum/TopicReactionModel";
import { ReactionTypeModel } from "./models/forum/ReactionTypeModel";
import { ThemeModel } from "./models/ThemeModel";
import { CommentReactionModel } from "./models/forum/CommentReactionModel";

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT, POSTGRES_HOST } = process.env;

const options: SequelizeOptions = {
  models: [
    TopicModels,
    CommentModels,
    TopicReactionModel,
    ReactionTypeModel,
    CommentReactionModel,
    ThemeModel,
  ],
  dialect: "postgres",
  database: POSTGRES_DB,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  port: Number(POSTGRES_PORT) || 5432,
  host: POSTGRES_HOST,
};

const db = new Sequelize(options);

export { db };
