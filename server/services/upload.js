const multer = require("multer");
const fs = require("fs");

// Ensure the 'uploads' directory exists
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${uploadDir}/`);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const csvFileFilter = (req, file, cb) => {
  if (file.mimetype !== "text/csv") {
    return cb(new Error("Only CSV files are allowed!"), false);
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: csvFileFilter,
});

module.exports = upload;
