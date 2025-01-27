import React from "react";
import { useActions } from "@/hooks";
import {
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
import { useNavigate } from "react-router-dom";
import { useGetLeaderboardQuery } from "@/api/leaderboardApi";

export function LeaderboardPage() {
  const { data: leaders = [] } = useGetLeaderboardQuery();
  const { setLeaders } = useActions();
  const navigate = useNavigate();
  const [order, setOrder] = React.useState<"asc" | "desc">("desc");
  const [sortField, setSortField] = React.useState<"name" | "points">("points");

  const handleSort = (field: "name" | "points") => {
    const isAsc = sortField === field && order === "asc";
    const sortedLeaders = [...leaders].sort((a, b) => {
      if (field === "name") {
        return isAsc ? a.name.localeCompare(b.name, "ru") : b.name.localeCompare(a.name, "ru");
      }
      return isAsc ? a.points - b.points : b.points - a.points;
    });

    setLeaders(sortedLeaders);
    setOrder(isAsc ? "desc" : "asc");
    setSortField(field);
  };

  return (
    <UiLayout>
      <Container maxWidth="md">
        <UiPaper>
          <Typography
            variant="h4"
            component="h1"
            sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}>
            Лидеры
          </Typography>
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
                  <TableCell></TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    <TableSortLabel
                      active={sortField === "name"}
                      direction={order}
                      onClick={() => handleSort("name")}>
                      Имя
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="right">
                    <TableSortLabel
                      active={sortField === "points"}
                      direction={order}
                      onClick={() => handleSort("points")}>
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
              marginTop: 3,
              alignSelf: "center",
              height: "50px",
            }}
            onClick={() => navigate(paths.homePage)}>
            Назад
          </UiButton>
        </UiPaper>
      </Container>
    </UiLayout>
  );
}
