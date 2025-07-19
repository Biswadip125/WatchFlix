const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    default: "avatar.png",
  },
  watchlist: [
    {
      id: {
        type: Number,
        required: true,
      },
      contentType: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("user", userSchema);
