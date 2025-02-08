require("dotenv").config();

const express = require("express");
const router = require("./routes/routes");
const mongoose = require("mongoose");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const app = express();
console.log("before db config line")
require("./config/db.config");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

app.use(express.urlencoded({ extended: false }));

//app.use(router);

app.use((req, res, next) => {
  next(createError(304, "Route not found"));
});

app.use((error, req, res, next) => {
  console.log(error);

  if (error instanceof mongoose.Error.ValidationError) {
    error = createError(400, error);
  } else if (error instanceof mongoose.Error.CastError) {
    error = createError(400, "Resource not found");
  } else if (error.message.includes("E11000")) {
    error = createError(400, "Resource already exists");
  } else if (error instanceof jwt.JsonWebTokenError) {
    error = createError(401, error);
  } else if (!error.status) {
    error = createError(500);
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
