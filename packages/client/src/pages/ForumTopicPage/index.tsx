import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Box, Avatar, Divider, TextField } from "@mui/material";
import { UiLayout } from "@/components/ui/UiLayout";
import { UiPaper } from "@/components/ui/UiPaper";
import { UiButton } from "@/components/ui/UiButton";
import { UiFormattingToolbar } from "@/components/ui/UiFormattingToolbar";
import { paths } from "@/app/constants/paths";
import { useNavigate } from "react-router-dom";
import { useActions, useAppSelector } from "@/hooks";
import { selectProfileInfo } from "@/store/selectors/profileSelectors";
import { withAuthGuard } from "@/app/providers/router/withAuthGuard";
import {
  useCreateCommentMutation,
  useCreateReactionMutation,
  useGetTopicByIdQuery,
} from "@/api/forumApi";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import UserReactions from "@/components/UserReactions";

export const ForumTopicPage = withAuthGuard(() => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isSuccess, isError } = useGetTopicByIdQuery(id);
  const topicData = useSelector((state: RootState) => state.forum.topicData);
  const profile = useAppSelector(selectProfileInfo);
  const { setTopicData } = useActions();
  const [createComment] = useCreateCommentMutation();
  const [createReaction] = useCreateReactionMutation();

  const navigate = useNavigate();

  const [newComment, setNewComment] = useState("");
  const [formatting, setFormatting] = useState({ bold: false, italic: false, underline: false });

  const applyFormatting = (text: string) => {
    let formattedText = text;
    if (formatting.bold) formattedText = `<b>${formattedText}</b>`;
    if (formatting.italic) formattedText = `<i>${formattedText}</i>`;
    if (formatting.underline) formattedText = `<u>${formattedText}</u>`;
    return formattedText;
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    const formattedComment = applyFormatting(newComment.trim());

    await createComment({
      text: formattedComment,
      authorName: profile.first_name + (profile.second_name || ""),
      topicId: topicData.id,
    }).then(({ data }) => {
      data && setTopicData(data);
      setNewComment("");
    });
  };

  const onClickReaction = (reactionId: number, elementId: number, typeReaction: string) => {
    createReaction({
      targetType: typeReaction,
      targetId: elementId,
      reactionId: reactionId,
      currentTopicId: topicData.id,
    }).then(res => setTopicData(res.data));
  };

  useEffect(() => {
    if (isError) {
      navigate(paths.forum);
    }

    if (isSuccess) {
      setTopicData(data);
    }
  }, [isLoading, isError]);

  return (
    <>
      <UiLayout>
        <Container maxWidth="md">
          <UiPaper
            sx={{
              py: 4,
              minHeight: "700px",
            }}>
            <Typography hidden={isSuccess} textAlign={"center"}>
              Загрузка...
            </Typography>

            <Box hidden={isLoading}>
              <Typography
                variant="h4"
                component="h1"
                sx={{ mb: 3, fontWeight: "bold", textAlign: "center" }}>
                Тема #{id}: {topicData?.title}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 3,
                  gap: 2,
                }}>
                <Avatar src={""} alt={topicData?.authorName} />
                <Typography variant="h6" fontWeight="bold">
                  {topicData?.authorName}
                </Typography>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {topicData?.description}
                </Typography>
              </Box>
              <UserReactions
                reactions={topicData ? topicData.reactions : []}
                onClick={id => onClickReaction(id, topicData.id, "topic")}
              />

              <Divider sx={{ borderColor: "gray", mb: 4 }} />

              <Box
                sx={{
                  "maxHeight": "800px",
                  "overflowY": "auto",
                  "pr": 2,
                  "wordWrap": "break-word",
                  "overflowWrap": "break-word",
                  "&::-webkit-scrollbar": {
                    width: "8px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    borderRadius: "4px",
                  },
                  "&::-webkit-scrollbar-thumb:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                  },
                }}>
                <Box maxHeight={"250px"}>
                  {topicData.comments?.map((comment, index) => (
                    <Box
                      key={comment.id}
                      sx={{ mb: index === topicData.comments.length - 1 ? 0 : 3 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 2,
                          mb: 2,
                        }}>
                        <Avatar src={""} alt={comment.authorName} />
                        <Box>
                          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                            {comment.authorName}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: "gray", display: "block", mb: 1 }}>
                            {Intl.DateTimeFormat("ru", {
                              month: "long",
                              day: "2-digit",
                              year: "numeric",
                            }).format(new Date(comment.createdAt))}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              wordWrap: "break-word",
                              overflowWrap: "break-word",
                              whiteSpace: "pre-wrap",
                              maxWidth: "600px",
                            }}
                            dangerouslySetInnerHTML={{ __html: comment.text }}
                          />
                        </Box>
                      </Box>
                      <UserReactions
                        reactions={comment.reactions as any}
                        onClick={id => onClickReaction(id, comment.id, "comment")}
                      />
                      {index !== topicData.comments.length - 1 && (
                        <Divider sx={{ borderColor: "gray" }} />
                      )}
                    </Box>
                  ))}
                </Box>
              </Box>

              <Box sx={{ mt: 3 }}>
                <UiFormattingToolbar formatting={formatting} setFormatting={setFormatting} />{" "}
                <TextField
                  fullWidth
                  placeholder="Оставить сообщение"
                  multiline
                  rows={4}
                  variant="outlined"
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  sx={{
                    "mb": 2,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      borderColor: "gray",
                      backgroundColor: "transparent",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "gray",
                    },
                  }}
                />
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <UiButton
                    sx={{
                      width: "300px",
                      height: "48px",
                      marginLeft: "auto",
                    }}
                    onClick={handleAddComment}>
                    Оставить сообщение
                  </UiButton>
                </Box>
                <UiButton
                  sx={{
                    marginTop: 3,
                    alignSelf: "center",
                    height: "50px",
                  }}
                  onClick={() => navigate(paths.forum)}>
                  Назад
                </UiButton>
              </Box>
            </Box>
          </UiPaper>
        </Container>
      </UiLayout>
    </>
  );
});
