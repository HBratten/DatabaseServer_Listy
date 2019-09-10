const express = require("express");
const toDoRouter = express.Router();
const pool = require("../connection/connection");

function selectAllToDos(req, res) {
  pool
    .query("select * from to_do where to_do_date=$1::date;", [req.query.date])
    .then(result => {
      res.send(result.rows);
    });
}

toDoRouter.get("/to_do", selectAllToDos);

toDoRouter.post("/to_do", (req, res) => {
  pool
    .query(
      "insert into to_do (to_do_item, to_do_date, to_do_priority, to_do_notes) values ($1::text, $2::date, $3::text, $4::text)",
      [
        req.body.to_do_item,
        req.body.to_do_date,
        req.body.to_do_priority,
        req.body.to_do_notes
      ]
    )
    .then(() => {
      selectAllToDos(req, res);
    });
});

toDoRouter.put("/to_do/:id", (req, res) => {
  pool
    .query(
      "update to_do set to_do_item=$1::text, to_do_date=$2::date, to_do_priority=$3::text, to_do_notes=$4::text where id=$5::int",
      [
        req.body.to_do_item,
        req.body.to_do_date,
        req.body.to_do_priority,
        req.body.to_do_notes,
        req.params.id
      ]
    )
    .then(() => {
      selectAllToDos(req, res);
    });
});

toDoRouter.delete("/to_do/:id", (req, res) => {
  pool.query("delete from to_do where id=$1::int", [req.params.id]).then(() => {
    selectAllToDos(req, res);
  });
});

module.exports = toDoRouter;
