const express = require("express");
const eventRouter = express.Router();
const pool = require("../connection/connection");

function selectAllEvents(req, res) {
  pool.query("select * from event").then(result => {
    res.send(result.rows);
  });
}

eventRouter.get("/event", selectAllEvents);

eventRouter.post("/event", (req, res) => {
  pool
    .query(
      "insert into event (event_name, event_address, event_time, event_date, event_notes) values ($1::text, $2::text, $3::time, $4::date, $5::text)",
      [
        req.body.event_name,
        req.body.event_address,
        req.body.event_time,
        req.body.event_date,
        req.body.event_notes
      ]
    )
    .then(() => {
      selectAllEvents(req, res);
    });
});

eventRouter.put("/event/:id", (req, res) => {
  pool
    .query(
      "update event set event_name=$1::text, event_address=$2::text, event_time=$3::time, event_date=$4::date, event_notes=$5::text where id=$6::int",
      [
        req.body.event_name,
        req.body.event_address,
        req.body.event_time,
        req.body.event_date,
        req.body.event_notes,
        req.params.id
      ]
    )
    .then(() => {
      selectAllEvents(req, res);
    });
});

eventRouter.delete("/event/:id", (req, res) => {
  pool.query("delete from event where id=$1::int", [req.params.id]).then(() => {
    selectAllEvents(req, res);
  });
});

module.exports = eventRouter;
