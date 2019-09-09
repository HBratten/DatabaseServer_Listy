const express = require("express");
const cors = require("cors");
const app = express();
const toDoRouter = require("./routes/todo.api");
const eventRouter = require("./routes/event.api");

app.use(cors());
app.use(express.json());
app.use("/", toDoRouter);
app.use("/", eventRouter);

const port = 5252;
app.listen(port, () => console.log(`Server is running on PORT: ${port}.`));
