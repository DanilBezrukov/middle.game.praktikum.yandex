import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { TopicModels } from "./TopicModels";
import { CommentReactionModel } from "./CommentReactionModel";

interface ICommentAttributes {
  id?: number;
  text: string;
  authorName: string;
  topicId: number;
}

@Table
export class CommentModels extends Model<ICommentAttributes> {
  @AllowNull(false)
  @Column({
    type: DataType.TEXT,
  })
  text!: string;

  @AllowNull(false)
  @ForeignKey(() => TopicModels)
  @Column({ type: DataType.INTEGER, onDelete: "CASCADE" })
  topicId!: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  authorName!: string;

  @BelongsTo(() => TopicModels)
  topic!: TopicModels;

  @HasMany(() => CommentReactionModel, "commentId")
  reactions!: CommentReactionModel;
}
