import { AllowNull, Column, DataType, Model, Table, Index } from "sequelize-typescript";

@Table
export class ThemeModel extends Model<ThemeModel> {
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
