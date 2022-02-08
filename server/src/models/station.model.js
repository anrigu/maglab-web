const mongoose = require("mongoose");

const Station = mongoose.model(
  "Station",
  new mongoose.Schema({
    lat: Number,
    long: Number,
    users: [{
      user_id: String,
      user_name: String,
      files: [{
        file_url: String,
        pniFilename: String,
        gpsFilename: String
      }]
    }]
  })
);

module.exports = Station;
