import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { TopicModels } from "./TopicModels";
import { ReactionTypeModel } from "./ReactionTypeModel";

export type CommentReactionModelType = {
  commentId: number;
  reactionTypeId: number;
};

@Table({
  timestamps: false,
})
export class CommentReactionModel extends Model<CommentReactionModelType> {
  @ForeignKey(() => TopicModels)
  @Column(DataType.INTEGER)
  commentId!: number;

  @ForeignKey(() => ReactionTypeModel)
  @Column(DataType.INTEGER)
  reactionTypeId!: number;

  @BelongsTo(() => TopicModels)
  comments!: TopicModels;

  @BelongsTo(() => ReactionTypeModel)
  reactionType!: ReactionTypeModel;
}
