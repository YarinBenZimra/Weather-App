import express from "express";
import axios from "axios";
import logger from "../loggers.js";

const router = express.Router();
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

if (!WEATHER_API_KEY) {
  logger.error("WEATHER_API_KEY is undefined in weather.js");
} else {
  logger.info("WEATHER_API_KEY loaded successfully in weather.js:");
}
const dateParser = (date, isReverse = false) => {
  if (!(date instanceof Date)) {
    const error = "Invalid date value passed to dateParser";
    logger.error(error);
    throw new Error(error);
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return isReverse ? `${year}/${month}/${day}` : `${day}/${month}/${year}`;
};
const relevantHoursForNow = async (forcastTodayTomorrow, city) => {
  const todayHours = forcastTodayTomorrow[0].hour;
  const currentHour = Math.floor(Date.now() / 1000);
  let currentHourindex = -1;
  for (let i = 0; i < todayHours.length - 1; i++) {
    if (
      currentHour >= todayHours[i].time_epoch &&
      currentHour < todayHours[i + 1].time_epoch
    ) {
      currentHourindex = i;
      break;
    }
  }
  if (currentHourindex === -1) {
    currentHourindex = 23;
  }
  const roundedHour = String(currentHourindex).padStart(2, "0");
  if (currentHourindex >= 3 && currentHourindex < 23) {
    logger.debug(
      `Handling current day hours: hour is ${roundedHour}:00 - FUNCTION [handelToday]`
    );
    return handelToday(todayHours, currentHourindex);
  } else if (currentHourindex === 23) {
    logger.debug(
      `Handling current day hours: hour is 23:00 - FUNCTION [handelTodayAndTomorrow]`
    );
    return handelTodayAndTomorrow(todayHours, forcastTodayTomorrow);
  } else if (currentHourindex < 3) {
    logger.debug(
      `Handling current day hours: hour is ${roundedHour}:00 - FUNCTION [handelYesterdayAndToday]`
    );
    return await handelYesterdayAndToday(city, todayHours, currentHourindex);
  }
  logger.error(`Error in current hour: hour is ${roundedHour}:00`);
  return [];
};
const getYesterdayDate = () => {
  const today = new Date();
  today.setDate(today.getDate() - 1);
  return dateParser(today, true);
};
const handelToday = (todayHours, currentHourindex) => {
  const relevantHours = todayHours.slice(
    currentHourindex - 3,
    currentHourindex + 2
  );
  return mapRelevantHoursObj(relevantHours);
};
const handelYesterdayAndToday = async (city, todayHours, currentHourindex) => {
  try {
    const response = await axios.get(
      `http://api.weatherapi.com/v1/forecast.json`,
      {
        params: {
          key: WEATHER_API_KEY,
          q: city,
          dt: getYesterdayDate(),
        },
      }
    );
    const yesterday = response.data;
    const yesterdayRelevant = yesterday.forecast.forecastday[0].hour.slice(
      24 - (3 - currentHourindex),
      24
    );
    const todayRelevant = todayHours.slice(0, currentHourindex + 2);
    const relevantHours = [...yesterdayRelevant, ...todayRelevant];
    return mapRelevantHoursObj(relevantHours);
  } catch (e) {
    logger.error("Error fetching history weather data:", e);
    return [];
  }
};
const handelTodayAndTomorrow = (todayHours, forcastTodayTomorrow) => {
  const todayRelevant = todayHours.slice(20, 24);
  const tomorrowRelevant = forcastTodayTomorrow[1].hour.slice(0, 1);
  const relevantHours = [...todayRelevant, ...tomorrowRelevant];
  return mapRelevantHoursObj(relevantHours);
};
const mapRelevantHoursObj = (relevantHours) => {
  return relevantHours.map((hour, index) => ({
    id: index + 1,
    hour: hour.time.split(" ")[1],
    temp: parseInt(hour.temp_c),
  }));
};
const handelSuccess = async (data, city) => {
  const weatherDetails = {
    cityName: data.location.name,
    countryName: data.location.country,
    date: dateParser(new Date(data.location.localtime.split(" ")[0])),
    hour: data.location.localtime.split(" ")[1],
    temp: parseInt(data.current.temp_c),
    description: data.current.condition.text,
    phd: [
      {
        id: 1,
        name: "precipitation",
        value: parseInt(data.current.precip_mm),
        unit: "mm",
      },
      {
        id: 2,
        name: "humidity",
        value: parseInt(data.current.humidity),
        unit: "%",
      },
      {
        id: 3,
        name: "wind",
        value: parseInt(data.current.wind_kph),
        unit: "km/h",
      },
    ],
    nextHours: await relevantHoursForNow(data.forecast.forecastday, city),
    latitude: data.location.lat.toFixed(2),
    longitude: data.location.lon.toFixed(2),
    accurateDate: dateParser(new Date(data.current.last_updated.split(" ")[0])),
    accurateHour: data.current.last_updated.split(" ")[1],
  };
  return weatherDetails;
};
router.get("/:city", async (req, res) => {
  const city = req.params.city;
  logger.info(`Fetching weather data for city: "${city}"`);
  try {
    const response = await axios.get(
      `http://api.weatherapi.com/v1/forecast.json`,
      {
        params: {
          key: WEATHER_API_KEY,
          q: city,
          days: 2,
          aqi: "no",
          alerts: "no",
        },
      }
    );
    if (response.status == 200) {
      const returnedCity = response.data.location.name;
      logger.info(
        `Successfully fetched weather data for city: "${returnedCity}"`
      );
      const weatherDetails = await handelSuccess(response.data, returnedCity);
      res.status(200).json(weatherDetails);
    }
  } catch (error) {
    if (error.status == 400) {
      logger.warn(
        `Error fetching weather data for city: "${city}": ${error.response.data.error.message}`
      );

      res.status(400).send({ error: "City not found" });
    } else {
      logger.error(
        `Error fetching weather data for city: "${city}": ${error.response.data.error.message}`
      );
      res.status(500).send({ error: `Internal Server Error` });
    }
  }
});

router.use("*", (req, res) => {
  logger.warn(`Endpoint not found in api/weather: [${req.method} ${req.url}]`);
  res.status(404).json({ error: "Weather endpoint not found" });
});

export default router;
