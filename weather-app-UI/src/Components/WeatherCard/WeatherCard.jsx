import styles from "./WeatherCard.module.css";
export default function WeatherCard({ weatherDetails }) {
  return (
    <div className={styles.card}>
      <div className={styles.cityCountryDate}>
        <p className={styles.cityName}>{weatherDetails.cityName}</p>
        <p className={styles.countryName}>{weatherDetails.countryName}</p>
        <div className={styles.dataAndHour}>
          <p className={styles.date}>{weatherDetails.date} at</p>
          <p className={styles.hour}>{weatherDetails.hour}</p>
        </div>
      </div>
      <div className={styles.tempAndDesc}>
        <p className={styles.temp}>{weatherDetails.temp}°</p>
        <p className={styles.description}>{weatherDetails.description}</p>
      </div>
      <div className={styles.phw}>
        {weatherDetails.phd.map((item) => {
          return (
            <div key={item.id} className={styles.phwColumn}>
              <p className={styles.labelPHW}>{item.name}</p>
              <p className={styles.valuePHW}>
                {item.value} {item.unit}
              </p>
            </div>
          );
        })}
      </div>
      <div className={styles.nextHours}>
        {weatherDetails.nextHours.map((item) => {
          return (
            <div key={item.id} className={styles.hourAndTemp}>
              <p className={styles.nextHour}>{item.hour}</p>
              <p className={styles.nextTemp}>{item.temp}°</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
