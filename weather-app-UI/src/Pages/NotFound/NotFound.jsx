import React from "react";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <div className={styles.notFound}>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <a href="/" className={styles.homeLink}>
        Go Back Home
      </a>
    </div>
  );
}
