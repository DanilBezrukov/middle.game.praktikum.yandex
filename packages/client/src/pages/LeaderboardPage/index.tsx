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
import { withAuthGuard } from "@/app/providers/router/withAuthGuard";
import { useGetLeaderboardQuery } from "@/api/leaderboardApi";
import { Leader } from "@/store/slices/leaderboard.slice";

type LeaderData = {
  id: number;
  name: string;
  ppBirdScore: number;
};

type LeaderboardResponse = {
  data: LeaderData;
};

export const LeaderboardPage = withAuthGuard(() => {
  const { data = [] } = useGetLeaderboardQuery({
    ratingFieldName: "ppBirdScore",
    cursor: 0,
    limit: 50,
  });

  const leaders: LeaderData[] = data.map((entry: LeaderboardResponse) => ({
    id: entry.data.id,
    name: entry.data.name,
    ppBirdScore: entry.data.ppBirdScore,
  }));

  const { setLeaders } = useActions();
  const navigate = useNavigate();
  const [order, setOrder] = React.useState<"asc" | "desc">("desc");
  const [sortField, setSortField] = React.useState<"name" | "ppBirdScore">("ppBirdScore");

  const handleSort = (field: "name" | "ppBirdScore") => {
    const isAsc = sortField === field && order === "asc";
    const sortedLeaders: Leader[] = data.map((entry: LeaderData) => ({
      id: entry.id,
      name: entry.name,
      points: entry.ppBirdScore, // преобразуем ppBirdScore в points
    }));

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
              "&::-webkit-scrollbar": { width: "8px" },
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
                      active={sortField === "ppBirdScore"}
                      direction={order}
                      onClick={() => handleSort("ppBirdScore")}>
                      Баллы
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaders.map((leader: LeaderData) => (
                  <TableRow key={leader.id} sx={{ borderBottom: "1px solid black" }}>
                    <TableCell>{leader.name}</TableCell>
                    <TableCell align="right">{leader.ppBirdScore}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <UiButton
            sx={{ marginTop: 3, alignSelf: "center", height: "50px" }}
            onClick={() => navigate(paths.homePage)}>
            Назад
          </UiButton>
        </UiPaper>
      </Container>
    </UiLayout>
  );
});
