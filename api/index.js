const express = require("express");
require("dotenv").config();
//express application
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const router = express.Router();
const cors = require("cors");

const userRoutes = require("./routes/user");

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(cookieParser());

// Applying middleware
app.use(
  cors({
    // Set the allowed origin for CORS requests
    origin: process.env.CORS_ORIGIN,
    credentials: true
  })
);

app.get("/", async (req, res) => {
  res.status(200).json({ message: "Welcome To Crypto Watcher Api" });
});

app.use("/api/user", userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to db and listen on port ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
