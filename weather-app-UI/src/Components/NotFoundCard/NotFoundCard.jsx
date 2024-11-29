import React from "react";
import styles from "../NotFoundCard/NotFoundCard.module.css";
import city from "../../../src/assets/card/city.png";
import space from "../../../src/assets/card/space.png";

export default function NotFoundCard() {
  return (
    <div className={styles.notFound}>
      <h1>City Not Found</h1>
      <div className={styles.images}>
        <img className={styles.logo} src={space} alt="not found" />
        <img className={styles.logo} src={city} alt="not found" />
      </div>
      <p>Oops! The city you're looking for doesn't found.</p>
    </div>
  );
}
