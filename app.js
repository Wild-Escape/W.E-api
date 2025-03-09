require("dotenv").config();
require("math-intrinsics");

const express = require("express");

const router = require("./routes/routes");
const mongoose = require("mongoose");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
require("./config/db.config");

app.use(
  cors({
    origin: ["http://localhost:5173"],
    
  })
);

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

app.use(express.urlencoded({ extended: false }));

//app.use(router);

app.use((req, res, next) => {
  next(createError(404, "Route not found"));
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

  const data = {};

  data.message = error.message;
  data.errors = error.errors
    ? Object.keys(error.errors).reduce((errors, key) => {
        return {
          ...errors,
          [key]: error.errors[key].message || error.errors[key],
        };
      }, {})
    : undefined;

  res.status(error.status).json(data);
  next();
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
