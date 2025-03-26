import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/api/baseApi";
import { ApiTopicListType, ApiTopicType, NewCommentType, ReactionType } from "@/store";

export const forumApi = createApi({
  reducerPath: "forumApi",
  baseQuery: axiosBaseQuery({ serverEndpoint: "/owner-server" }),
  tagTypes: ["TopicList", "TopicData"],
  endpoints: builder => ({
    getTopicList: builder.query<ApiTopicListType[], unknown>({
      query: () => ({
        method: "GET",
        url: "/topic",
        withCredentials: true,
      }),
      providesTags: ["TopicList"],
    }),
    getTopicById: builder.query<ApiTopicType, string | number | unknown>({
      query: id => ({
        method: "GET",
        url: `/topic/${id}`,
      }),
      providesTags: ["TopicData"],
    }),
    getReactionsDictionary: builder.query<ReactionType[], unknown>({
      query: () => ({
        method: "GET",
        url: `/reaction-dictionary`,
      }),
    }),
    createReaction: builder.mutation({
      query: data => ({
        method: "POST",
        url: "/reaction",
        data,
      }),
      invalidatesTags: ["TopicData"],
    }),
    createTopic: builder.mutation({
      query: data => ({
        method: "POST",
        url: "/topic",
        withCredentials: true,
        data,
      }),
      invalidatesTags: ["TopicList"],
    }),
    createComment: builder.mutation<ApiTopicType, NewCommentType>({
      query: data => ({
        method: "POST",
        url: "/comment",
        data,
      }),
      invalidatesTags: ["TopicList", "TopicData"],
    }),
  }),
});

export const {
  useGetTopicListQuery,
  useCreateTopicMutation,
  useGetTopicByIdQuery,
  useCreateCommentMutation,
  useGetReactionsDictionaryQuery,
  useCreateReactionMutation,
} = forumApi;
