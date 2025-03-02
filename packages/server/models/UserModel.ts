/* eslint-disable camelcase */
import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  HasOne,
  Unique,
} from "sequelize-typescript";
import { ThemeModel } from "./ThemeModel";

@Table
export class UserModel extends Model<UserModel> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  override id: number | undefined;

  @AllowNull(false)
  @Column(DataType.STRING)
  first_name!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  second_name!: string;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  login!: string;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  email!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  password!: string;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  phone!: string;

  @HasOne(() => ThemeModel)
  theme!: ThemeModel;
}
