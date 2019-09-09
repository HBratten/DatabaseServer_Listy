const express = require("express");
const cors = require("cors");
const app = express();
const toDoRouter = require("./routes/todo.api");
const eventRouter = require("./routes/event.api");
const mapRouter = require("./routes/map");

app.use(cors());
app.use(express.json());
app.use("/", toDoRouter);
app.use("/", eventRouter);
app.use("/", mapRouter);

const port = 5252;
app.listen(port, () => console.log(`Server is running on PORT: ${port}.`));
