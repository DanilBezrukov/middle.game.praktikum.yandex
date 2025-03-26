import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ApiTopicListType = {
  id: number;
  title: string;
  description: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
  commentCount: string;
};

export type ReactionType = {
  id: number;
  name: string;
  emoji: string;
};

export type ApiResponceTopicReactionType = {
  id: number;
  topicId: number;
  reactionTypeId: number;
  reactionType: ReactionType;
};

export type ApiResponceCommentReactionType = {
  id: number;
  commentId: number;
  reactionTypeId: number;
  reactionType: ReactionType;
};

export type ApiResponceCommentType = {
  id: number;
  text: string;
  topicId: number;
  authorName: string;
  createdAt: string;
  updatedAt: string;
  reactions: ApiResponceCommentReactionType;
};

export type ApiTopicType = Omit<ApiTopicListType, "commentCount"> & {
  reactions: ApiResponceTopicReactionType[];
  comments: ApiResponceCommentType[];
};

export type NewTopicType = {
  title: string;
  description: string;
  authorName: string;
};

export type NewCommentType = {
  text: string;
  authorName: string;
  topicId: string | number;
};

const initialState: { topics: ApiTopicListType[]; topicData: ApiTopicType } = {
  topics: [],
  topicData: {} as ApiTopicType,
};

const forumSlice = createSlice({
  name: "forum",
  initialState,
  reducers: {
    setTopicList(state, action: PayloadAction<ApiTopicListType[]>) {
      state.topics = action.payload;
    },
    setTopicData(state, action: PayloadAction<ApiTopicType>) {
      state.topicData = action.payload;
    },
  },
});

export const forumActions = forumSlice.actions;
export const forumReducer = forumSlice.reducer;
