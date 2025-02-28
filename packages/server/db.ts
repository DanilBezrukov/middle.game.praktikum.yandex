import { Sequelize } from "sequelize";
import { SequelizeOptions } from "sequelize-typescript";
const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT, POSTGRES_HOST } = process.env;

const options: SequelizeOptions = {
  dialect: "postgres",
  database: POSTGRES_DB,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  port: Number(POSTGRES_PORT) || 5432,
  host: POSTGRES_HOST,
};

const db = new Sequelize(options);

export { db };
