import React from "react";
import { useActions, useAppSelector } from "@/hooks";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { UiButton } from "@/components/ui/UiButton";
import { UiLayout } from "@/components/ui/UiLayout";
import { UiPaper } from "@/components/ui/UiPaper";
import { paths } from "@/app/constants/paths";
import { useTheme } from "@/context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { withAuthGuard } from "@/app/providers/router/withAuthGuard";
import { LeaderboardResponse, LeaderData } from "@/store/slices/leaderboard.slice";

export const LeaderboardPage = withAuthGuard(() => {
  const { tableTextColor, tableBorderColor } = useTheme();

  const data = useAppSelector(state => state.leaderboard.leaders);

  const leaders: LeaderData[] = data.map((entry, id) => ({
    id,
    name: entry.data.name,
    ppBirdScore: entry.data.ppBirdScore,
  }));

  const { setLeaders } = useActions();
  const navigate = useNavigate();
  const [order, setOrder] = React.useState<"asc" | "desc">("desc");
  const [sortField, setSortField] = React.useState<"name" | "ppBirdScore">("ppBirdScore");

  const handleSort = (field: "name" | "ppBirdScore") => {
    const isAsc = sortField === field && order === "asc";

    const sortedLeaders: LeaderboardResponse[] = leaders
      .sort((a, b) => {
        const valueA = a[field];
        const valueB = b[field];

        if (typeof valueA === "number" && typeof valueB === "number") {
          return isAsc ? valueB - valueA : valueA - valueB;
        }

        if (typeof valueA === "string" && typeof valueB === "string") {
          const comparison = valueA.localeCompare(valueB, undefined, { sensitivity: "base" });
          return isAsc ? comparison : -comparison;
        }

        return 0;
      })
      .map((entry: LeaderData, id) => ({
        data: {
          id,
          name: entry.name,
          ppBirdScore: entry.ppBirdScore,
        },
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
              "border": `1px solid ${tableBorderColor}`,
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
                <TableRow sx={{ borderBottom: `1px solid ${tableBorderColor}` }}>
                  <TableCell sx={{ fontWeight: "bold", color: tableTextColor }}>
                    <TableSortLabel active={false} direction="asc">
                      Имя
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: tableTextColor }} align="right">
                    <TableSortLabel active={false} direction="asc">
                      Баллы
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaders.map((leader: LeaderData) => (
                  <TableRow key={leader.id} sx={{ borderBottom: `1px solid ${tableBorderColor}` }}>
                    <TableCell sx={{ color: tableTextColor }}>{leader.name}</TableCell>
                    <TableCell sx={{ color: tableTextColor }} align="right">
                      {leader.ppBirdScore}
                    </TableCell>
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
