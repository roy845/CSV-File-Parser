const fs = require("fs");
const Papa = require("papaparse");

const parseCsvFileController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const filePath = req.file.path;

    fs.readFile(filePath, "utf8", (err, fileContent) => {
      if (err) {
        return res.status(500).send("Error reading file.");
      }

      const parsedData = Papa.parse(fileContent, { header: true });

      res.json(parsedData.data);
    });
  } catch (error) {
    return res
      .status(500)
      .send({ error, message: "Only CSV files are allowed!" });
  }
};

module.exports = {
  parseCsvFileController,
};
