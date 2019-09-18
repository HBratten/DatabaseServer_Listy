const express = require("express");
const eventRouter = express.Router();
const pool = require("../connection/connection");

function selectAllEvents(req, res) {
  pool
    .query(
      `
  select * from event where event_date${
    req.query.gt === "true" ? ">" : "="
  }$1::date order by event_date;`,
      [req.query.date]
    )
    .then(result => {
      res.send(result.rows);
    });
}

eventRouter.get("/event", selectAllEvents);

eventRouter.post("/event", (req, res) => {
  const {
    event_name,
    event_address,
    event_date,
    event_notes,
    starting_address,
    starting_city,
    starting_state,
    starting_zip,
    event_city,
    event_state,
    event_zip,
    event_end_time,
    event_start_time
  } = req.body;
  // above is destructuring and assigning them to variable names

  pool
    .query(
      `insert into event 
      (event_name, event_address, event_date, event_notes, starting_address, starting_city, starting_state, starting_zip, event_city, event_state, event_zip, event_end_time, event_start_time) 
      values 
      ('${event_name}', '${event_address}', '${event_date}', '${event_notes}', '${starting_address}', '${starting_city}', '${starting_state}', ${starting_zip}, '${event_city}', '${event_state}', ${event_zip}, '${event_end_time}', '${event_start_time}')`
    )
    .then(() => {
      selectAllEvents(req, res);
    })
    .catch(e => res.json(e));
});

eventRouter.put("/event/:id", (req, res) => {
  pool
    .query(
      "update event set event_name=$1::text, event_address=$2::text, event_date=$3::date, event_notes=$4::text, starting_address=$5::text, starting_city=$6::text, starting_state=$7::text, starting_zip=$8::int, event_city=$9::text, event_state=$10::text, event_zip=$11::int, event_end_time=$12::time, event_start_time=$13::time where id=$14::int",
      [
        req.body.event_name,
        req.body.event_address,
        req.body.event_date,
        req.body.event_notes,
        req.body.starting_address,
        req.body.starting_city,
        req.body.starting_state,
        req.body.starting_zip,
        req.body.event_city,
        req.body.event_state,
        req.body.event_zip,
        req.body.event_end_time,
        req.body.event_start_time,
        req.params.id
      ]
    )
    .then(() => {
      selectAllEvents(req, res);
    }).catch(e => console.log(e));
});

eventRouter.delete("/event/:id", (req, res) => {
  pool.query("delete from event where id=$1::int", [req.params.id]).then(() => {
    selectAllEvents(req, res);
  });
});

module.exports = eventRouter;
