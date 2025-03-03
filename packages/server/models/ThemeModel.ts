import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  Index,
} from "sequelize-typescript";

@Table
export class ThemeModel extends Model<ThemeModel> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  override id: number | undefined;

  @AllowNull(false)
  @Index
  @Column(DataType.INTEGER)
  userId!: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    defaultValue: "light",
  })
  theme!: string;
}
