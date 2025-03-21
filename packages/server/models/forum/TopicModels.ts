import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  HasMany,
} from "sequelize-typescript";
import { CommentModels } from "./CommentModels";
import { TopicReactionModel } from "./TopicReactionModel";

interface ITopicAttributes {
  title: string;
  description: string;
  authorName: string;
}

@Table
export class TopicModels extends Model<ITopicAttributes> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  override id: number | undefined;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  title!: string;

  @Column({
    type: DataType.TEXT,
  })
  description!: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  authorName!: string;

  @HasMany(() => CommentModels, { onDelete: "CASCADE" })
  comments!: CommentModels[];

  @HasMany(() => TopicReactionModel, "topic_id")
  reactions!: TopicReactionModel[];
}
