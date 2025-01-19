import React from "react";
import { Box, Typography } from "@mui/material";
import { paths } from "@/app/constants/paths";
import { useNavigate } from "react-router-dom";
import { UiButton } from "@/components/ui/UiButton";
import { UiLayout } from "@/components/ui/UiLayout";
import { UiPaper } from "@/components/ui/UiPaper";
import errorIcon from "@/assets/error-bird.png";

export const ErrorPage500: React.FC = () => {
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
          <Typography
            variant="h1"
            sx={{
              fontSize: "4rem",
              fontWeight: "bold",
            }}>
            500
          </Typography>
          <img
            src={errorIcon}
            alt="Error 500"
            style={{
              position: "absolute",
              right: 0,
              height: "100px",
              marginRight: "15px",
            }}
          />
        </Box>
        <Typography
          variant="h4"
          sx={{
            fontSize: "32px",
            fontWeight: "bold",
          }}>
          Что-то пошло не так...
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontSize: "18px",
            marginBottom: 3,
          }}>
          Мы уже в курсе и скоро все починим!
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
