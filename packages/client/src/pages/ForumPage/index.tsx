import React, { useState } from "react";
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
  IconButton,
} from "@mui/material";
import { UiButton } from "@/components/ui/UiButton";
import { UiLayout } from "@/components/ui/UiLayout";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import { UiPaper } from "@/components/ui/UiPaper";
import { paths } from "@/app/constants/paths";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/store";
import { IProfile } from "@/types/profile.interface";

interface Topic {
  id: number;
  title: string;
  description: string;
  author: string;
  messages: number;
  date: string;
}

interface CreateTopicModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (newTopic: Omit<Topic, "id" | "messages" | "date">) => void;
}

const CreateTopicModal: React.FC<CreateTopicModalProps> = ({ open, onClose, onCreate }) => {
  const selectProfileInfo = (state: RootState) => state.profile.user as IProfile;
  const profile = useAppSelector(selectProfileInfo);

  const [formatting, setFormatting] = useState({ bold: false, italic: false, underline: false });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = () => {
    if (title.trim() && description.trim()) {
      onCreate({ title, description, author: profile.first_name });
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
                borderRadius: "12px",
                borderColor: "gray",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "gray",
              },
            }}
          />
          <Box sx={{ mt: 3 }}>
            <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
              <IconButton
                onClick={() => setFormatting(prev => ({ ...prev, bold: !prev.bold }))}
                color={formatting.bold ? "primary" : "default"}>
                <FormatBoldIcon />
              </IconButton>
              <IconButton
                onClick={() => setFormatting(prev => ({ ...prev, italic: !prev.italic }))}
                color={formatting.italic ? "primary" : "default"}>
                <FormatItalicIcon />
              </IconButton>
              <IconButton
                onClick={() => setFormatting(prev => ({ ...prev, underline: !prev.underline }))}
                color={formatting.underline ? "primary" : "default"}>
                <FormatUnderlinedIcon />
              </IconButton>
            </Box>
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
                  borderColor: "gray",
                  backgroundColor: "transparent",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "gray",
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

export function ForumPage() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [topics, setTopics] = useState<Topic[]>([
    {
      id: 1,
      title: "Обсуждение стратегии",
      author: "Игрок1",
      messages: 15,
      date: "2025-01-20",
      description: "",
    },
    {
      id: 2,
      title: "Ошибки и баги",
      author: "Игрок2",
      messages: 8,
      date: "2025-01-18",
      description: "",
    },
    {
      id: 3,
      title: "Турниры и соревнования",
      author: "Игрок3",
      messages: 12,
      date: "2025-01-19",
      description: "",
    },
    {
      id: 4,
      title: "Лучшие результаты",
      author: "Игрок4",
      messages: 20,
      date: "2025-01-17",
      description: "",
    },
  ]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleCreateTopic = (newTopic: Omit<Topic, "id" | "messages" | "date">) => {
    const date = new Date().toISOString().split("T")[0];
    const id = topics.length ? Math.max(...topics.map(t => t.id)) + 1 : 1;

    setTopics(prev => [...prev, { id, ...newTopic, messages: 0, date }]);
  };

  const handleTopicClick = (id: number) => {
    navigate(`${paths.forum}/${id}`);
  };

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
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mb: 2,
            }}>
            <TextField
              placeholder="Поиск..."
              variant="outlined"
              size="small"
              sx={{
                "width": "300px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  backgroundColor: "transparent",
                  borderColor: "gray",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "gray",
                },
              }}
            />
          </Box>
          <TableContainer
            component={Paper}
            sx={{
              "backgroundColor": "transparent",
              "border": "1px solid black",
              "maxHeight": 500,
              "overflow": "auto",
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
            <Table>
              <TableHead>
                <TableRow sx={{ borderBottom: "1px solid black" }}>
                  <TableCell sx={{ fontWeight: "bold" }}>Заголовок</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Автор</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="right">
                    Сообщений
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Дата</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {topics.map(topic => (
                  <TableRow key={topic.id} hover>
                    <TableCell
                      sx={{ cursor: "pointer", color: "blue" }}
                      onClick={() => handleTopicClick(topic.id)}>
                      {topic.title}
                    </TableCell>
                    <TableCell>{topic.author}</TableCell>
                    <TableCell align="right">{topic.messages}</TableCell>
                    <TableCell>{topic.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
}
