const express = require("express");
const router = express.Router();
const pool = require("../connection/connection");

function selectAllList(req, res) {
  pool.query("select * from to_do_and_events").then(result => {
    res.send(result.rows);
  });
}

router.get("/to_do_and_events", selectAllList);

router.post("/to_do_and_events", (req, res) => {
  pool
    .query(
      "insert into to_do_and_events (to_do_item, to_do_date, to_do_priority, event_name, event_address, event_time, event_date) values ($1::text, $2::date, $3::text, $4::text, $5::text, $6::time, $7::date)",
      [
        req.body.to_do_item,
        req.body.to_do_date,
        req.body.to_do_priority,
        req.body.event_name,
        req.body.event_address,
        req.body.event_time,
        req.body.event_date
      ]
    )
    .then(() => {
      selectAllList(req, res);
    });
});

router.put("/to_do_and_events/:id", (req, res) => {
  pool
    .query(
      "update to_do_and_events set to_do_item=$1::text, to_do_date=$2::date, to_do_priority=$3::text, event_name=$4::text, event_address=$5::text, event_time=$6::time, event_date=$7::date where id=$8::int",
      [
        req.body.to_do_item,
        req.body.to_do_date,
        req.body.to_do_priority,
        req.body.event_name,
        req.body.event_address,
        req.body.event_time,
        req.body.event_date,
        req.params.id
      ]
    )
    .then(() => {
      selectAllList(req, res);
    });
});

router.delete("/to_do_and_events/:id", (req, res) => {
  pool
    .query("delete from to_do_and_events where id=$1::int", [req.params.id])
    .then(() => {
      selectAllList(req, res);
    });
});

module.exports = router;
