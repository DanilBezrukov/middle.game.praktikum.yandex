import { AllowNull, Column, DataType, Model, Table } from "sequelize-typescript";

@Table
export class CommentModels extends Model<CommentModels> {
  @AllowNull(false)
  @Column({
    type: DataType.TEXT,
  })
  text!: string;

  // @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  author!: string;
}
