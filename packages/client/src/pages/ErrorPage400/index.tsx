import React from "react";
import { paths } from "@/app/constants/paths";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { UiButton } from "@/components/ui/UiButton";
import { UiLayout } from "@/components/ui/UiLayout";
import { UiPaper } from "@/components/ui/UiPaper";
import errorIcon from "@/assets/error404hamster.png";

export const ErrorPage400: React.FC = () => {
  const navigate = useNavigate();

  return (
    <UiLayout>
      <UiPaper
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: 750,
          maxWidth: "100%",
          borderRadius: 3,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
        }}>
        <Box
          sx={{
            position: "relative",
            width: "60%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
          }}>
          <img
            src={errorIcon}
            alt="Error 400"
            style={{
              position: "absolute",
              left: 0,
              height: "100px",
              marginRight: "15px",
            }}
          />
          <Typography
            variant="h1"
            sx={{
              fontSize: "4rem",
              fontWeight: "bold",
            }}>
            404
          </Typography>
        </Box>
        <Typography
          variant="h4"
          sx={{
            fontSize: "32px",
            fontWeight: "bold",
          }}>
          Ошибка!
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontSize: "18px",
            marginBottom: 3,
          }}>
          Кажется, такой страницы нет...
        </Typography>
        <UiButton
          sx={{
            width: 400,
            height: 55,
            marginTop: "50px",
          }}
          onClick={() => navigate(paths.homePage)}>
          Вернуться
        </UiButton>
      </UiPaper>
    </UiLayout>
  );
};
