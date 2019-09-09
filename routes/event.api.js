const express = require("express");
const eventRouter = express.Router();
const pool = require("../connection/connection");

function selectAllList(req, res) {
  pool.query("select * from event").then(result => {
    res.send(result.rows);
  });
}

eventRouter.get("/event", selectAllList);

// eventRouter.post("/event", (req, res) => {
//   pool
//     .query(
//       "insert into event (event_item, event_date, event_priority, event_notes) values ($1::text, $2::date, $3::text, $4::text)",
//       [
//         req.body.event_item,
//         req.body.event_date,
//         req.body.event_priority,
//         req.body.event_notes
//       ]
//     )
//     .then(() => {
//       selectAllList(req, res);
//     });
// });

// eventRouter.put("/event/:id", (req, res) => {
//   pool
//     .query(
//       "update event set event_item=$1::text, event_date=$2::date, event_priority=$3::text, event_notes=$4::text where id=$5::int",
//       [
//         req.body.event_item,
//         req.body.event_date,
//         req.body.event_priority,
//         req.body.event_notes,
//         req.params.id
//       ]
//     )
//     .then(() => {
//       selectAllList(req, res);
//     });
// });

// eventRouter.delete("/event/:id", (req, res) => {
//   pool.query("delete from event where id=$1::int", [req.params.id]).then(() => {
//     selectAllList(req, res);
//   });
// });

module.exports = eventRouter;
