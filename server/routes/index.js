const express = require("express");
const parseRoutes = require("./parseRoutes");

const router = express.Router();

router.use("/api/parse", parseRoutes);

module.exports = router;
