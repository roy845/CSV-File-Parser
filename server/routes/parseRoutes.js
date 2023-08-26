const express = require("express");
const { parseCsvFileController } = require("../controllers/parseController");
const upload = require("../services/upload");
const { errorHandler } = require("../middlewares/errorMiddleware");

const router = express.Router();

//parseFile || METHOD POST
router.post(
  "/parseFile",
  upload.single("file"),
  errorHandler,
  parseCsvFileController
);

module.exports = router;
