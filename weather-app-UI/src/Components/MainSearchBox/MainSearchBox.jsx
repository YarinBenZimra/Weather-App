import { useState } from "react";
import styles from "./MainSearchBox.module.css";
import errorIcon from "../../assets/searchBox/error.png";
export default function MainSearchBox({ onSearch }) {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCity(e.target.value);
  };
  const validateSerachBox = () => {
    let error = "";
    if (!city.trim() || city.trim().length === 0) {
      error = "City must contains at least one character";
    } else if (!/[a-zA-Z| ]+/.test(city.trim())) {
      error = "City must contains only letters and spaces (e.g. 'New York')";
    }
    return error;
  };
  const handelSumbit = (e) => {
    e.preventDefault();
    const error = validateSerachBox();
    if (error === "") {
      onSearch(city.trim());
      setCity("");
      setError("");
    } else {
      setError(error);
    }
  };
  return (
    <form className={styles.form}>
      <label htmlFor="city">City name</label>
      <div className={styles.searchAndButton}>
        <input
          id="city"
          name="city"
          type="text"
          className={styles.input}
          placeholder="Search for a city"
          value={city}
          onChange={handleChange}
        />
        <button className={styles.button} onClick={handelSumbit}>
          Check
        </button>
      </div>
      {error && (
        <div className={styles.errorMessageAndIcon}>
          <img className={styles.errorIcon} src={errorIcon} alt="error" />
          <p className={styles.errorMessage}>{error}</p>
        </div>
      )}
    </form>
  );
}
