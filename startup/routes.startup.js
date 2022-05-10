const cors = require("cors");
const express = require("express");
// routes
const authRoutes = require("../routes/auth.route");
const memoryRoutes = require("../routes/memory.route");
const { NODE_ENV, ORIGIN } = require("../config");

module.exports = function (app) {
  app.use(express.json());
  app.use(
    cors({
      credentials: true,
      origin: ORIGIN,
      optionsSuccessStatus: 200,
    })
  );
  //   morgan
  if (NODE_ENV === "development") {
    const morgan = require("morgan");
    app.use(morgan("dev"));
  }
  app.get("/", (req, res) => {
    res.status(200).json({
      type: "success",
      message: "server is up and running",
      data: null,
    });
  });
  app.use("/api/auth", authRoutes);
  app.use("/api/memory", memoryRoutes);
};
