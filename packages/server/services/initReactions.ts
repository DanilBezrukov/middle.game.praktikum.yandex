import { ReactionTypeModel } from "../models/forum/ReactionTypeModel";

export function initReactions() {
  return ReactionTypeModel.bulkCreate([
    {
      name: "Нравится",
      emoji: "👍",
    },
    {
      name: "Интересно",
      emoji: "👀",
    },
    {
      name: "Вау!",
      emoji: "🤯",
    },
    {
      name: "Не нравится",
      emoji: "👎",
    },
    {
      name: "Плохо",
      emoji: "🤮",
    },
  ] as any[]);
}
