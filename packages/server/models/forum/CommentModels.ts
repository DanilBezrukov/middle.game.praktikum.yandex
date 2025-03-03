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

@Table
export class CommentModels extends Model<CommentModels> {
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
