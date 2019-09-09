const express = require("express");
const mapRouter = express.Router();
const axios = require("axios");

mapRouter.get("/map", (req, res) => {
  const { origins, destinations } = req.query;
  axios
    .get(
      `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origins}&destinations=${destinations}&key=AIzaSyCSreLuncbla65v6Bn2bOIMi6ajS4-18Os`
    )
    .then(response => {
      res.send(response.data);
    });
});

module.exports = mapRouter;
