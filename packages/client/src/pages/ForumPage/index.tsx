import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Box,
  Modal,
} from "@mui/material";
import { UiButton } from "@/components/ui/UiButton";
import { UiLayout } from "@/components/ui/UiLayout";
import { UiFormattingToolbar } from "@/components/ui/UiFormattingToolbar";
import { UiPaper } from "@/components/ui/UiPaper";
import { paths } from "@/app/constants/paths";
import { useNavigate } from "react-router-dom";
import { useActions, useAppSelector } from "@/hooks";
import { selectProfileInfo } from "@/store/selectors/profileSelectors";
import { NewTopicType, RootState } from "@/store";
import { withAuthGuard } from "@/app/providers/router/withAuthGuard";
import { useSelector } from "react-redux";
import { useCreateTopicMutation, useGetTopicListQuery } from "@/api/forumApi";

type CreateTopicModalProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (newTopic: NewTopicType) => void;
};

const CreateTopicModal: React.FC<CreateTopicModalProps> = ({ open, onClose, onCreate }) => {
  const profile = useAppSelector(selectProfileInfo);
  const theme = useSelector((state: RootState) => state.theme.theme);
  const tableTextColor = theme === "light" ? "#000" : "#FFE993";
  const tableBorderColor = theme === "light" ? "#000" : "#555";

  const [formatting, setFormatting] = useState({ bold: false, italic: false, underline: false });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = () => {
    if (title.trim() && description.trim()) {
      onCreate({
        title: title.trim(),
        description: description.trim(),
        authorName: profile.first_name + (profile.second_name || ""),
      });
      setTitle("");
      setDescription("");
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 700,
          p: 4,
        }}>
        <UiPaper>
          <Typography
            variant="h5"
            component="h2"
            sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}>
            Создать тему
          </Typography>
          <TextField
            fullWidth
            placeholder="Заголовок"
            variant="outlined"
            size="small"
            value={title}
            onChange={e => setTitle(e.target.value)}
            sx={{
              "mb": 2,
              "& .MuiOutlinedInput-root": {
                color: tableTextColor,
                borderRadius: "12px",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: tableBorderColor,
              },
            }}
          />
          <Box sx={{ mt: 3 }}>
            <UiFormattingToolbar formatting={formatting} setFormatting={setFormatting} />
            <TextField
              fullWidth
              placeholder="Описание"
              multiline
              rows={4}
              variant="outlined"
              value={description}
              onChange={e => setDescription(e.target.value)}
              sx={{
                "mb": 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  color: tableTextColor,
                  borderColor: tableBorderColor,
                  backgroundColor: "transparent",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: tableBorderColor,
                },
              }}
            />
          </Box>
          <UiButton fullWidth onClick={handleCreate}>
            Создать тему
          </UiButton>
        </UiPaper>
      </Box>
    </Modal>
  );
};

export const ForumPage = withAuthGuard(() => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const theme = useSelector((state: RootState) => state.theme.theme);
  const topics = useSelector((state: RootState) => state.forum.topics);
  const { setTopicList } = useActions();
  const { data: topicsApi = [], isLoading, isSuccess } = useGetTopicListQuery({});
  const [createNewTopic] = useCreateTopicMutation();

  const tableTextColor = theme === "light" ? "#000" : "#FFE993";
  const tableBorderColor = theme === "light" ? "#ccc" : "#555";
  const tableLinkColor = theme === "light" ? "#1976d2" : "#FFCC56";

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleCreateTopic = (newTopic: NewTopicType) => {
    createNewTopic(newTopic).then(res => setTopicList(res.data));
  };

  const handleTopicClick = (id: number) => {
    navigate(`${paths.forum}/${id}`);
  };

  useEffect(() => {
    if (isSuccess) {
      setTopicList(topicsApi);
    }
  }, [isLoading]);

  return (
    <UiLayout>
      <Container maxWidth="md">
        <UiPaper>
          <Typography
            variant="h4"
            component="h1"
            sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}>
            Форум
          </Typography>
          {/*<Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>*/}
          {/*  <TextField*/}
          {/*    placeholder="Поиск..."*/}
          {/*    variant="outlined"*/}
          {/*    size="small"*/}
          {/*    sx={{*/}
          {/*      "width": "300px",*/}
          {/*      "& .MuiOutlinedInput-root": {*/}
          {/*        borderRadius: "12px",*/}
          {/*        backgroundColor: "transparent",*/}
          {/*        borderColor: tableBorderColor,*/}
          {/*        color: tableTextColor,*/}
          {/*      },*/}
          {/*      "& .MuiOutlinedInput-notchedOutline": {*/}
          {/*        borderColor: tableBorderColor,*/}
          {/*      },*/}
          {/*    }}*/}
          {/*  />*/}
          {/*</Box>*/}
          <TableContainer
            component={Paper}
            sx={{
              backgroundColor: "transparent",
              border: `1px solid ${tableBorderColor}`,
              maxHeight: 500,
              overflow: "auto",
            }}>
            <Table>
              <TableHead>
                <TableRow sx={{ borderBottom: `1px solid ${tableBorderColor}` }}>
                  <TableCell sx={{ fontWeight: "bold", color: tableTextColor }}>
                    Заголовок
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: tableTextColor }}>Автор</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: tableTextColor }} align="right">
                    Сообщений
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: tableTextColor }}>Дата</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {topics.length === 0 && !isLoading && (
                  <TableRow>
                    <TableCell>Таблица пустая...</TableCell>
                  </TableRow>
                )}
                {topics.map(topic => (
                  <TableRow key={topic.id} hover>
                    <TableCell
                      sx={{ cursor: "pointer", color: tableLinkColor }}
                      onClick={() => handleTopicClick(topic.id)}>
                      {topic.title}
                    </TableCell>
                    <TableCell sx={{ color: tableTextColor }}>{topic.authorName}</TableCell>
                    <TableCell sx={{ color: tableTextColor }} align="right">
                      {topic.commentCount}
                    </TableCell>
                    <TableCell sx={{ color: tableTextColor }}>
                      {Intl.DateTimeFormat("ru", {
                        month: "long",
                        day: "2-digit",
                        year: "numeric",
                      }).format(new Date(topic.createdAt))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography mt={"20px"} hidden={!isLoading} textAlign={"center"}>
            Загрузка...
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <UiButton
              sx={{
                width: 300,
                height: 48,
              }}
              onClick={handleOpenModal}>
              Создать тему
            </UiButton>
          </Box>
          <UiButton
            sx={{
              marginTop: 3,
              alignSelf: "center",
              height: "50px",
            }}
            onClick={() => navigate(paths.homePage)}>
            Назад
          </UiButton>
        </UiPaper>
      </Container>
      <CreateTopicModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onCreate={handleCreateTopic}
      />
    </UiLayout>
  );
});
