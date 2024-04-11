const Data = require("../models/Data");

const getAllData = async (req, res) => {
  try {
    const allData = await Data.findAll();
    res.status(200).json(allData);
  } catch (error) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = getAllData;
