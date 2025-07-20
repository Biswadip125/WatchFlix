const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controller/authController");

const isLoggedIn = require("../middlewares/isLoggedIn.js");
const { editDetails } = require("../controller/editController.js");
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", (req, res) => {
  res.send("hello this default page");
});

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", isLoggedIn, logoutUser);

router.post("/edit", isLoggedIn, upload.single("file"), editDetails);

router.post("/addtowatchlist", isLoggedIn, async (req, res) => {
  try {
    const { id } = req.body;
    const { contentType } = req.body;
    if (!id) {
      return res.status(401).json({
        success: "false",
        message: "id is required",
      });
    }
    const user = await userModel.findOne({ email: req.user.email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }
    user.watchlist.push({ id, contentType });
    await user.save();
    return res.status(201).json({
      success: true,
      message: `${contentType} added to watchlist`,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(401).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
});

router.post("/deletefromwatchlist", isLoggedIn, async (req, res) => {
  try {
    const { id } = req.body;
    const { contentType } = req.body;

    if (!id) {
      return res.status(401).json({
        success: "false",
        message: "id is required",
      });
    }
    const user = await userModel.findOne({ email: req.user.email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const index = user.watchlist.findIndex(
      (item) => item.id === id && item.contentType === contentType
    );
    if (index > -1) {
      user.watchlist.splice(index, 1);
      await user.save();
      return res.status(201).json({
        success: true,
        message: `${contentType} removed from Watchlist`,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: `${contentType} not Found in Watchlist`,
      });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(401).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
});

router.get("/watchlist", isLoggedIn, async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.user.email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not Found",
      });
    }
    const watchlist = user.watchlist;
    return res.status(200).json({
      success: true,
      message: "data successfully fetched",
      watchlist,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(501).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
});

module.exports = router;
