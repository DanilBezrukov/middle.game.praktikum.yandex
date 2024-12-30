import React from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import errorIcon from "@/assets/error404hamster.png";
import backgroundImage from "@/assets/background.png";
import styles from "./ErrorPage.module.css";

export const ErrorPage400: React.FC = () => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#f5f5f5",
      backgroundImage: `url(${backgroundImage})`,
      textAlign: "center",
      padding: 3,
    }}>
    <Paper
      sx={{
        padding: "70px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 750,
        maxWidth: "100%",
        overflow: "auto",
        borderRadius: 3,
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
      }}
      elevation={1}>
      <div className={styles.content}>
        <img src={errorIcon} className={styles.image} alt="Error 404" />
        <Typography
          className={styles.heading}
          variant="h1"
          sx={{ fontSize: "4rem", fontWeight: "bold" }}>
          404
        </Typography>
      </div>
      <Typography variant="h4" sx={{ fontSize: "32px", fontWeight: "bold" }}>
        Ошибка!
      </Typography>
      <Typography variant="h6" sx={{ fontSize: "18px", marginBottom: 3 }}>
        Кажется, такой страницы нет...
      </Typography>
      <Button
        variant="contained"
        type="submit"
        sx={{
          width: 400,
          height: 55,
          backgroundColor: "#FFE600",
          color: "#000",
          borderRadius: 3,
          marginTop: "30px",
          typography: {
            fontSize: "17px",
            fontWeight: "bold",
          },
        }}>
        Вернуться
      </Button>
    </Paper>
  </Box>
);
