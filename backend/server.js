require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB =
  require("./config/db");

const requestLogger =
  require("./middleware/requestLogger");

const errorHandler =
  require("./middleware/errorHandler");

const authRoutes =
  require("./routes/authRoutes");

const trainerRoutes =
  require("./routes/trainerRoutes");

const bookingRoutes =
  require("./routes/bookingRoutes");

const app = express();

connectDB();

app.use(cors());

app.use(express.json());

app.use(requestLogger);

app.use(
  "/api/v1/auth",
  authRoutes
);

app.use(
  "/api/v1/trainers",
  trainerRoutes
);

app.use(
  "/api/v1/bookings",
  bookingRoutes
);

app.get("/", (req, res) => {
  res.json({
    message:
      "FitZone API is running"
  });
});

app.use(errorHandler);

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});