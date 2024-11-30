import "./config.js";
import express from "express";
import cors from "cors";
import weatherRoutes from "./routes/weather.js";
import logger from "./loggers.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  logger.info(
    `Incoming request | resource: ${req.url.split("?")[0]} | HTTP Verb ${
      req.method
    }`
  );
  next();
});
app.use("/api/weather", weatherRoutes);

app.use("*", (req, res) => {
  logger.warn(`Endpoint not found: [${req.method} ${req.url}]`);
  res
    .status(404)
    .json({ error: `Endpoint not found: [${req.method} ${req.url}]` });
});

app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});
