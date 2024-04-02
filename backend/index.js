const express = require("express");
const mysql = require("mysql");
const multer = require("multer");
const fs = require("fs");
const csvParser = require("csv-parser");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "bmw",
});

const upload = multer({ dest: "uploads/" });

// File upload endpoint
app.post("/upload", upload.single("file"), (req, res) => {
  try {
    //Before uploading new table, previous data is deleted
    const truncateQuery = "TRUNCATE TABLE capacity";

    connection.query(truncateQuery, (err) => {
      if (err) {
        console.error("Error truncating table:", err);
        return res.status(500).send({ error: "Internal server error" });
      }
    });

    // Passing and Inserting data in mySQL database

    const columns = [];

    console.log(req.file);

    const stream = fs.createReadStream(req.file.path);

    stream
      .pipe(csvParser())
      .on("headers", (headers) => {
        headers.forEach((header) => {
          columns.push(header);
        });
      })
      .on("data", (row) => {
        // Insert data into MySQL database

        const values = [Object.values(row)];
        const insertQuery = `INSERT INTO capacity (${columns.join(
          ", ",
        )}) VALUES ?`;

        connection.query(insertQuery, [values], (err, results) => {
          if (err) {
            throw err;
          }
          // } else {
          //   console.log("Data insering successfully");
          // }
        });
      })
      .on("end", () => {
        // Close the MySQL connection
        // connection.end();
        // Delete uploaded file after parsing
        fs.unlinkSync(req.file.path);
        // Send response when all data is inserted
        res.status(200).send({ message: "File uploaded successfully" });
        console.log("Data inserted successfully");
      });

    // stream.on("error", (err) => {
    //   console.error("Error processing file: ", err);
    //   res.status(500).send("Error processing file");
    // });
  } catch (error) {
    console.error("Error uploading CSV file:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

// Endpoint for fetching column headers

app.get("/columns", (req, res) => {
  const query = "SHOW COLUMNS FROM capacity";

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching column headers:", err);
      res.status(500).send({ error: "Internal server error" });
      return;
    }

    const columns = results.map((row) => row.Field);
    res.status(200).send({ columns });
  });
});

// Endpoint for fetching data for selected columns

app.get("/data", (req, res) => {
  const selectedColumns = req.query.columns.split(",");

  const query = "SELECT " + selectedColumns.join(",") + "FROM capacity";

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).send({ error: "Internal server error" });
      return;
    }
    const data = results.map((row) => {
      const rowData = {};
      selectedColumns.forEach((column) => {
        rowData[column] = row[column];
      });
      return rowData;
    });
    res.status(200).send({ data });
  });
});

//Endpoint for fetching all-data
app.get("/allData", (req, res) => {
  const query = `SELECT * FROM capacity`;

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error executing SQL query", error);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
