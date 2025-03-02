import { UserReactionModel } from "../models/forum/UserReactionModel";

export function initReactions() {
  return UserReactionModel.bulkCreate([
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
