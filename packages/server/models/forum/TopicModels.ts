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
import { TopicReactionModel } from "./TopicReactionModel";

@Table
export class TopicModels extends Model<TopicModels> {
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
    type: DataType.INTEGER,
  })
  authorId!: number;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  count = 0;

  @HasMany(() => TopicReactionModel, "topic_id")
  reactions!: TopicReactionModel[];
}
