const express = require("express");
const mysql = require("mysql");
const multer = require("multer");
const fs = require("fs");
const csvParser = require("csv-parser");

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "bmw",
});

const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("csvfile"), (req, res) => {
  const stream = fs.createReadStream(req.file.path);

  stream
    .pipe(csvParser())
    .on("data", (data) => {
      const query = `INSERT INTO capacity (cycle_number, time, current, voltage) VALUES ?`;
      const values = [Object.values(data)];

      connection.query(query, [values], (error, results, fields) => {
        if (error) {
          console.error("Error inserting data: ", error);
        } else {
          console.log("Data inserted successfully");
        }
      });
    })
    .on("end", () => {
      // Close the MySQL connection
      connection.end();
      // Send response when all data is inserted
      res.status(200).send("Data inserted successfully");
    });

  stream.on("error", (err) => {
    console.error("Error processing file: ", err);
    res.status(500).send("Error processing file");
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
