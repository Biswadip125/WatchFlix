const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("hello");
});

router.get("/browse", isLoggedIn, (req, res) => {
  res.send("this is browse page");
});

module.exports = router;
