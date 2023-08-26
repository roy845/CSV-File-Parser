const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes");

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(routes);

const PORT = process.env.PORT || 8800;

app.listen(PORT, () => console.log(`Server Started on ${PORT}`));
