const express = require("express");
const router = express.Router();
const pool = require("../connection/connection");

router.get("/to_do_and_events", (req, res) => {
  res.send("GET WORKS!!!");
});

router.post("/to_do_and_events", (req, res) => {
  res.send("POST WORKS!!!");
});

router.put("/to_do_and_events/:id", (req, res) => {
  res.send("PUT WORKS!!!");
});

router.delete("/to_do_and_events/1", (req, res) => {
  res.send("DELETE WORKS!!!");
});

module.exports = router;
