const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    if (!fullname || !email || !password) {
      return res.status(401).json({
        message: "Invalid data",
        success: false,
      });
    }
    let user = await userModel.findOne({ email });
    if (user) {
      return res
        .status(401)
        .json({ message: "User already exists", success: "false" });
    }
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) return res.send(err.message);
        let user = await userModel.create({
          fullname,
          email,
          password: hash,
        });
        let token = generateToken(user);
        res.cookie("token", token);
        return res
          .status(201)
          .json({ message: "Registration successful", success: true });
      });
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        message: "Invalid data",
        success: false,
      });
    }
    let user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "You don't have any account",
        success: false,
      });
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(501).json({
          message: "Something went worng",
          success: false,
        });
      }
      if (!result) {
        return res.status(501).json({
          message: "something went wrong",
          success: false,
        });
      }
      let token = generateToken(user);
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 15 * 24 * 60 * 60 * 1000,
      });
      res.status(201).json({
        message: `Welcome Back ${user.fullname}`,
        user,
        success: true,
      });
    });
  } catch (err) {
    return res.status(501).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

module.exports.logoutUser = (req, res) => {
  try {
    return res
      .cookie("token", "", {
        expiresIn: new Date(Date.now()),
        httpOnly: true,
      })
      .status(201)
      .json({
        message: "Successfully logged Out",
        success: true,
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};
