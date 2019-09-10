const express = require("express");
const weatherRouter = express.Router();
const axios = require("axios");

weatherRouter.get("/weather", (req, res) => {
    const { zip } = req.query;
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&APPID=497f7f87f95db03697266084d1926586`
      )
      .then(response => {
        res.send(response.data);
      });
  });

module.exports = weatherRouter;