const mongoose = require("mongoose");
const config = require("config");

mongoose
  .connect(`${process.env.MONGODB_URI}/OttMernApp`)
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongoose.connection;
