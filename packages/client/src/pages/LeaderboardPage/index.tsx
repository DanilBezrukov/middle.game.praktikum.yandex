import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Paper,
  TableSortLabel,
} from "@mui/material";
import { UiButton } from "@/components/ui/UiButton";
import { UiLayout } from "@/components/ui/UiLayout";
import { UiPaper } from "@/components/ui/UiPaper";
import { paths } from "@/app/constants/paths";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const leadersData = [
  { id: 1, name: "Иван Иванов", points: 30, avatar: "https://via.placeholder.com/40" },
  { id: 2, name: "Анна Смирнова", points: 456, avatar: "https://via.placeholder.com/40" },
  { id: 3, name: "Петр Сидоров", points: 3228, avatar: "https://via.placeholder.com/40" },
  { id: 4, name: "Петр Сидоров", points: 33, avatar: "https://via.placeholder.com/40" },
  { id: 5, name: "Петр Сидоров", points: 33, avatar: "https://via.placeholder.com/40" },
  { id: 6, name: "Петр Сидоров", points: 33, avatar: "https://via.placeholder.com/40" },
  { id: 7, name: "Петр Сидоров", points: 33, avatar: "https://via.placeholder.com/40" },
  { id: 8, name: "Петр Сидоров", points: 33, avatar: "https://via.placeholder.com/40" },
];

export function LeaderboardPage() {
  const [leaders, setLeaders] = useState(leadersData);
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const navigate = useNavigate();

  const handleSort = () => {
    const isAsc = order === "asc";
    const sortedLeaders = [...leaders].sort((a, b) =>
      isAsc ? a.points - b.points : b.points - a.points,
    );
    setLeaders(sortedLeaders);
    setOrder(isAsc ? "desc" : "asc");
  };

  return (
    <UiLayout>
      <Container maxWidth="md">
        <UiPaper sx={{ my: 4, textAlign: "center" }}>
          <Typography variant="h4" component="h1" sx={{ mb: 2, fontWeight: "bold" }}>
            Лидеры
          </Typography>
          <TableContainer
            component={Paper}
            sx={{
              backgroundColor: "transparent",
              border: "1px solid black",
              maxHeight: 500,
              overflow: "auto",
            }}>
            <Table>
              <TableHead>
                <TableRow sx={{ borderBottom: "1px solid black" }}>
                  <TableCell></TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Имя</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="right">
                    <TableSortLabel active direction={order} onClick={handleSort}>
                      Баллы
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaders.map(leader => (
                  <TableRow key={leader.id} sx={{ borderBottom: "1px solid black" }}>
                    <TableCell>
                      <Avatar src={leader.avatar} alt={leader.name} />
                    </TableCell>
                    <TableCell>{leader.name}</TableCell>
                    <TableCell align="right">{leader.points}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <UiButton
            sx={{
              marginTop: 2,
              alignSelf: "center",
              height: "50px",
              marginBottom: 4,
            }}
            onClick={() => navigate(paths.homePage)}>
            Назад
          </UiButton>
        </UiPaper>
      </Container>
    </UiLayout>
  );
}
