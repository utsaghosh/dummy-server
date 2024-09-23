const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const fetchedData = JSON.parse(fs.readFileSync(`${__dirname}/data.json`));

app.get("/data", (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      results: fetchedData.length,
      data: {
        ...fetchedData,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error,
    });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Dummy server running on port ${port}`);
});
