const { imageKit } = require("../config/imageKitConfig.js");
const userModel = require("../models/user.model.js");
const { generateToken } = require("../utils/generateToken.js");

module.exports.editDetails = async (req, res) => {
  const { fullname, email } = req.body;

  if (!fullname || !email) {
    return res.status(400).json({
      message: "Invalid data",
      success: false,
    });
  }

  try {
    let pictureUrl = null;
    if (req.file) {
      console.log(req.file);
      const uploadedImage = await imageKit.upload({
        file: req.file.buffer,
        fileName: req.file.originalname,
        folder: "/Profile_pics",
      });

      pictureUrl = uploadedImage.url;
    }

    const updatedUser = await userModel.findOneAndUpdate(
      { _id: req.user.userId },
      { fullname, email, ...(pictureUrl && { picture: pictureUrl }) },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    const token = generateToken(updatedUser);
    return res.cookie("token", token).status(201).json({
      message: "User details Update Successfully",
      success: true,
      updatedUser,
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: "Something went wrong",
      success: false,
    });
  }
};
