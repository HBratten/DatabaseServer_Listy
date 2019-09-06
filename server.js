const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./routes/routes");

app.use(cors());
app.use(express.json());
app.use("/", router);

const port = 5252;
app.listen(port, () => console.log(`Server is running on PORT: ${port}.`));
