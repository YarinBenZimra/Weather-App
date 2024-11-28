import React, { useState } from "react";
import styles from "./HomePage.module.css";
import MainSearchBox from "../../Components/MainSearchBox/MainSearchBox";
import WeatherCard from "../../Components/WeatherCard/WeatherCard";
import { weatherDetails } from "../../API/dummyData.js";
function HomePage() {
  const [isValidData, setIsValidData] = useState(true);
  const handleSearch = (city) => {
    console.log("Searching for weather in:", city);
    // Later, we will fetch weather data from the backend here
  };
  console.log(weatherDetails);
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.logoContainer}>
          <a href="/">
            <img
              className={styles.logo}
              src="/logos/logo.svg"
              alt="fintek digital"
            />
          </a>
        </div>
        <div className={styles.headlineAndSearch}>
          <h1 className={styles.headline}>
            Use our weather app to see the weather around the world
          </h1>
          <div className={styles.searchContainer}>
            <MainSearchBox onSearch={handleSearch} />
          </div>
        </div>
        {isValidData && (
          <div className={styles.weatherDetailsLeft}>
            <div className={styles.latAndlg}>
              <p className={styles.detailsTxt}>
                latitude {weatherDetails.latitude}
              </p>
              <p className={styles.detailsTxt}>
                longitude {weatherDetails.longitude}
              </p>
            </div>
            <p className={styles.detailsTxt}>
              accurate to {weatherDetails.accurateDate} at{" "}
              {weatherDetails.accurateHour}
            </p>
          </div>
        )}
      </div>
      <div className={styles.right}>
        <div className={styles.cardContainer}>
          <WeatherCard weatherDetails={weatherDetails} />
        </div>
      </div>
    </div>
  );
}
export default HomePage;
