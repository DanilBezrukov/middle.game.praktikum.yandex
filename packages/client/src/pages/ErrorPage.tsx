import React from "react";
import { Link } from "react-router-dom";
import errorIcon from "../assets/error404hamster.png";
import styles from "./ErrorPage.module.scss";

const Error400 = () => (
  <div className={styles.container}>
    <div className={styles.content}>
      <img src={errorIcon} alt="Error img" className={styles.image} />
      <h1 className={styles.heading}>404</h1>
    </div>
    <p className={styles.warning}>Ошибка!</p>
    <p className={styles.message}>Кажется, такой страницы нет...</p>
    <Link to="/" className={styles.link}>
      Вернуться
    </Link>
  </div>
);

export default Error400;
