import {
  AllowNull,
  Column,
  Model,
  PrimaryKey,
  Table,
  DataType,
  HasMany,
} from "sequelize-typescript";
import { TopicReactionModel } from "./TopicReactionModel";

@Table({
  timestamps: false,
})
export class UserReactionModel extends Model<UserReactionModel> {
  @PrimaryKey
  @Column(DataType.STRING)
  name!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  emoji!: string;

  @HasMany(() => TopicReactionModel, "reaction_name")
  topicReactions!: TopicReactionModel[];
}
