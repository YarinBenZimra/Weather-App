import React, { useState } from "react";
import styles from "./HomePage.module.css";
import MainSearchBox from "../../Components/MainSearchBox/MainSearchBox";
import WeatherCard from "../../Components/WeatherCard/WeatherCard";
import NotFoundCard from "../../Components/NotFoundCard/NotFoundCard";
import { dummyWeatherDetails } from "../../API/dummyData.js";
import { fetchWeatherData } from "../../API/ApiService.js";
function HomePage() {
  const [status, setStatus] = useState();
  const [weatherDetails, setWeatherDetails] = useState(null);
  const handleSearch = async (city) => {
    const result = await fetchWeatherData(city);
    if (result.success) {
      setWeatherDetails(result.data);
      setStatus(200);
    } else if (result.status !== 500) {
      setWeatherDetails(null);
      setStatus(result.status);
    }
    if (result.status === 500) {
      setWeatherDetails(null);
      setStatus(500);
    }
  };
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
        {status && status === 200 && (
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
          {status && status === 200 && (
            <WeatherCard weatherDetails={weatherDetails} />
          )}
          {status && status !== 500 && status !== 200 && <NotFoundCard />}
          {status && status === 500 && (
            <WeatherCard weatherDetails={dummyWeatherDetails} />
          )}
        </div>
      </div>
    </div>
  );
}
export default HomePage;
