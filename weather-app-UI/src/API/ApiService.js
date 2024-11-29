import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/weather";

export const fetchWeatherData = async (city) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${city}`, {
      timeout: 5000,
    });
    return { success: true, status: 200, data: response.data };
  } catch (error) {
    if (error.code === "ERR_NETWORK") {
      // Time out
      console.error("Request timed out:", error.message);
      return { success: false, status: 500, error: "Request timed out" };
    }
    console.error("Error fetching weather data:", error.message);
    return { success: false, status: error.status, error: error.error };
  }
};
