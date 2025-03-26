import {
  AllowNull,
  Column,
  Model,
  PrimaryKey,
  Table,
  DataType,
  AutoIncrement,
  HasMany,
} from "sequelize-typescript";
import { TopicReactionModel } from "./TopicReactionModel";
import { CommentReactionModel } from "./CommentReactionModel";

@Table({
  timestamps: false,
})
export class ReactionTypeModel extends Model<ReactionTypeModel> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  override id!: number;

  @Column(DataType.STRING)
  name!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  emoji!: string;

  @HasMany(() => TopicReactionModel, "reactionTypeId")
  topicReaction!: TopicReactionModel[];

  @HasMany(() => CommentReactionModel, "commentId")
  commentReaction!: CommentReactionModel;
}
