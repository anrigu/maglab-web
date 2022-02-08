const mongoose = require("mongoose");

const File = mongoose.model(
  "File",
  new mongoose.Schema({
    user_id: String,
    user_name: String,
    datetime: Date,
    duration: Number,
    lat: Number,
    long: Number,
    pniFilename: String,
    gpsFilename: String,
    file_url: String
  })
);

module.exports = File;
