const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    { email: user.email, userId: user._id },
    process.env.JWT_KEY,
    { expiresIn: "1d" },
    { httpOnly: true }
  );
};

module.exports.generateToken = generateToken;
