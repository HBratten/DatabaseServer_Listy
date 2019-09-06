const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const port = 5252;
app.listen(port, () => console.log(`Server is running on PORT: ${port}.`));
