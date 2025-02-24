import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Box, Avatar, Divider, TextField } from "@mui/material";
import { UiLayout } from "@/components/ui/UiLayout";
import { UiPaper } from "@/components/ui/UiPaper";
import { UiButton } from "@/components/ui/UiButton";
import { UiFormattingToolbar } from "@/components/ui/UiFormattingToolbar";
import { paths } from "@/app/constants/paths";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/hooks";
import { selectProfileInfo } from "@/store/selectors/profileSelectors";
import { withAuthGuard } from "@/app/providers/router/withAuthGuard";

const topicData = {
  title: "Как пройти Flappy Bird?",
  creator: {
    avatar: "https://via.placeholder.com/50",
    name: "Вупсень",
  },
  description: "Поделитесь вашими секретами прохождения Flappy Bird!",
};

export const ForumTopicPage = withAuthGuard(() => {
  const profile = useAppSelector(selectProfileInfo);

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [comments, setComments] = useState([
    {
      id: 1,
      avatar: "https://via.placeholder.com/50",
      name: "Жендос3012",
      date: "20 января 2025",
      message: "Бу испугался не бойся я друг я тебя не обижу",
    },
    {
      id: 2,
      avatar: "https://via.placeholder.com/50",
      name: "Пупсень",
      date: "21 января 2025",
      message: "ГОООООООООООООООООООООООООООООЛ",
    },
  ]);

  const [newComment, setNewComment] = useState("");
  const [formatting, setFormatting] = useState({ bold: false, italic: false, underline: false });

  const applyFormatting = (text: string) => {
    let formattedText = text;
    if (formatting.bold) formattedText = `<b>${formattedText}</b>`;
    if (formatting.italic) formattedText = `<i>${formattedText}</i>`;
    if (formatting.underline) formattedText = `<u>${formattedText}</u>`;
    return formattedText;
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const formattedComment = applyFormatting(newComment.trim());
    const newCommentData = {
      id: comments.length + 1,
      avatar: "https://via.placeholder.com/50",
      name: profile.first_name,
      date: new Date().toLocaleDateString(),
      message: formattedComment,
    };
    setComments(prev => [...prev, newCommentData]);
    setNewComment("");
  };

  return (
    <>
      <UiLayout>
        <Container maxWidth="md">
          <UiPaper
            sx={{
              py: 4,
            }}>
            <Typography
              variant="h4"
              component="h1"
              sx={{ mb: 3, fontWeight: "bold", textAlign: "center" }}>
              Тема #{id}: {topicData.title}
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 3,
                gap: 2,
              }}>
              <Avatar src={topicData.creator.avatar} alt={topicData.creator.name} />
              <Typography variant="h6" fontWeight="bold">
                {topicData.creator.name}
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {topicData.description}
              </Typography>
            </Box>

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
              {comments.map((comment, index) => (
                <Box key={comment.id} sx={{ mb: index === comments.length - 1 ? 0 : 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 2,
                      mb: 2,
                    }}>
                    <Avatar src={comment.avatar} alt={comment.name} />
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        {comment.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "gray", display: "block", mb: 1 }}>
                        {comment.date}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          wordWrap: "break-word",
                          overflowWrap: "break-word",
                          whiteSpace: "pre-wrap",
                          maxWidth: "600px",
                        }}
                        dangerouslySetInnerHTML={{ __html: comment.message }}
                      />
                    </Box>
                  </Box>
                  {index !== comments.length - 1 && <Divider sx={{ borderColor: "gray" }} />}
                </Box>
              ))}
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
          </UiPaper>
        </Container>
      </UiLayout>
    </>
  );
});
