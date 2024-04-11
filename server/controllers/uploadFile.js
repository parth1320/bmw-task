const fs = require("fs");
const csvParser = require("csv-parser");
const Capacity = require("../models/Capacity");
const Cycle = require("../models/Cycle");
const Data = require("../models/Data");

const uploadFile = async (req, res) => {
  try {
    // Truncate the table before inserting new data
    await Data.destroy({ truncate: true });
    let rowCount = 0;

    fs.createReadStream(req.file.path)
      .pipe(csvParser())
      .on("data", async (data) => {
        rowCount++;

        const firstRow = Object.keys(data);

        await Data.create(data);
      })
      .on("end", () => {
        res
          .status(200)
          .json({ message: "File uploaded successfully", rowCount });

        fs.unlink(req.file.path, (err) => {
          if (err) {
            console.error("Error deleting file:", err);
          }
        });
      });
  } catch (err) {
    console.error("Error uploading file:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = uploadFile;
