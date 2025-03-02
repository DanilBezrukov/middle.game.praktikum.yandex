import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  ForeignKey,
  BelongsTo,
  Index,
} from "sequelize-typescript";
import { UserModel } from "./UserModel";

@Table
export class ThemeModel extends Model<ThemeModel> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  override id: number | undefined;

  @AllowNull(false)
  @ForeignKey(() => UserModel)
  @Index
  @Column(DataType.INTEGER)
  userId!: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    defaultValue: "light",
  })
  theme!: string;

  @BelongsTo(() => UserModel)
  user!: UserModel;
}
