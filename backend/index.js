const express = require("express");
const mysql = require("mysql");
const multer = require("multer");
const fs = require("fs");
const csvParser = require("csv-parser");

const app = express();
const port = 3000;

const dbconfig = {
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "bmw",
};

const pool = mysql.createPool(dbconfig);

const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("csvfile"), (req, res) => {
  const stream = fs.createReadStream(req.file.path);

  stream
    .pipe(csvParser())
    .on("data", (data) => {
      const query = `INSERT INTO capacity (cycle_number, time, current, voltage) VALUES ?`;
      const values = [Object.values(data)];
      pool.getConnection((err, connection) => {
        if (err) {
          console.log("Error getting MySQL connection:", err);
        }

        connection.query(query, [values], (error, results, fields) => {
          if (error) {
            console.log("Error inserting data: ", error);
          } else {
            console.log("Data inserted successfully");
          }
        });
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

// const express = require("express");
// const multer = require("multer");
// const csv = require("csv-parser");
// const fs = require("fs");
// const mysql = require("mysql");

// const app = express();
// const port = 3000;

// const upload = multer({ dest: "uploads/" });

// const dbConfig = {
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "bmw",
// };

// const pool = mysql.createPool(dbConfig);

// app.post("/upload", upload.single("file"), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: "No file uploaded" });
//   }

//   const filePath = req.file.path;
//   const results = [];

//   fs.createReadStream(filePath)
//     .pipe(csv())
//     .on("data", (data) => results.push(data))
//     .on("end", () => {
//       fs.unlinkSync(filePath);

//       const query =
//         "INSERT INTO capacity (cycle_number, time, current, voltage) VALUES ?";

//       pool.getConnection((err, connection) => {
//         if (err) {
//           console.error("Error getting MySQL connection:", err);
//           return res.status(500).json({ error: "Database error" });
//         }

//         const values = results.map((result) => Object.values(result));

//         connection.query(query, [values], (err, results, fields) => {
//           if (err) {
//             console.error("Error executing SQL query:", err);
//             return res.status(500).json({ error: "Error inserting data" });
//           } else {
//             console.log("Data inserted successfully");
//             res.status(200).json({ message: "Data inserted successfully" });
//           }
//         });
//       });
//     });
// });

// // console.log("uploaded CSV data: ", results);

// // res.json({
// //   message: "CSV file uploaded and processed successfully",
// //   data: results,
// // });

// app.listen(port, () => {
//   console.log(`Server is listening on port ${port} `);
// });
