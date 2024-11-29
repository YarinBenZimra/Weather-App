import React from "react";
import styles from "./NotFound.module.css";
import notFound from "../../../src/assets/notFound/notFound.png";
export default function NotFound() {
  return (
    <div className={styles.notFound}>
      <img
        className={styles.logo}
        src="/logos/whiteFintekLogo.png"
        alt="fintek logo"
      />
      <div className={styles.container}>
        <h1>404 - Page Not Found</h1>
        <img src={notFound} alt="Not-Found"></img>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <a href="/" className={styles.homeLink}>
          Go Back Home
        </a>
      </div>
    </div>
  );
}
