import {
  AllowNull,
  Column,
  Model,
  PrimaryKey,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { TopicModels } from "./TopicModels";
import { UserReactionModel } from "./UserReactionModel";

@Table({
  timestamps: false,
})
export class TopicReactionModel extends Model<TopicReactionModel> {
  @PrimaryKey
  @Column(DataType.INTEGER)
  // eslint-disable-next-line camelcase
  user_id!: number;

  @PrimaryKey
  @ForeignKey(() => TopicModels)
  @Column(DataType.INTEGER)
  // eslint-disable-next-line camelcase
  topic_id!: number;

  @BelongsTo(() => TopicModels, "topic_id")
  topic!: TopicModels;

  @AllowNull(false)
  @ForeignKey(() => UserReactionModel)
  @Column(DataType.STRING)
  // eslint-disable-next-line camelcase
  reaction_name!: string;

  @BelongsTo(() => UserReactionModel, "reaction_name")
  userReaction!: UserReactionModel;
}
