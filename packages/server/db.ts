import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { TopicModels } from "./models/forum/TopicModels";
import { CommentModels } from "./models/forum/CommentModels";
import { ReplyModels } from "./models/forum/ReplyModels";

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT, POSTGRES_HOST } = process.env;

const options: SequelizeOptions = {
  models: [TopicModels, CommentModels, ReplyModels],
  dialect: "postgres",
  database: POSTGRES_DB,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  port: Number(POSTGRES_PORT) || 5432,
  host: POSTGRES_HOST,
};

const db = new Sequelize(options);

export { db };
