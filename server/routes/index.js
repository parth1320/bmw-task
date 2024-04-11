const express = require("express");
const multer = require("multer");
const uploadFile = require("../controllers/uploadFile");
const getAllData = require("../controllers/getAllData");

const router = express.Router();

const upload = multer({ dest: "uploades/" });

router.post("/upload", upload.single("file"), uploadFile);

router.get("/allData", getAllData);

module.exports = router;
