import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { CommentModels } from "./CommentModels";

@Table
export class ReplyModels extends Model<ReplyModels> {
  @AllowNull(false)
  @Column({
    type: DataType.TEXT,
  })
  text!: string;

  @AllowNull(false)
  @ForeignKey(() => CommentModels)
  @Column({ type: DataType.INTEGER, onDelete: "CASCADE" })
  commentId!: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  authorName!: string;

  @BelongsTo(() => CommentModels)
  comment!: CommentModels;
}
