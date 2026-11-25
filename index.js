const express = require("express")
const cors = require("cors")
require("dotenv").config()
const app = express()
app.use(express.json())
app.use(cors())

const mongoose = require("mongoose")
const connection = mongoose.connect(process.env.DB_HOST);

connection
  .then(() => {
    app.listen(process.env.PORT, function () {
      console.log(`Server running. Use our API on port: ${process.env.PORT}`);
    });
  })
  .catch(err =>
    console.log(`Server not running. Error message: ${err.message}`),
  );