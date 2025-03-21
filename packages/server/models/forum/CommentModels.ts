import {
  AllowNull,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { TopicModels } from "./TopicModels";
import { ReplyModels } from "./ReplyModels";

interface ICommentAttributes {
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

  @HasMany(() => ReplyModels, { onDelete: "CASCADE" })
  reply!: ReplyModels[];
}
