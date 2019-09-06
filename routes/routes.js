const express = require("express");
const router = express.Router();

router.get("/to_do_and_events", (req, res) => {
  res.send("GET WORKS!!!");
});

module.exports = router;
