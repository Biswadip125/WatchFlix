const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res, next) => {
  try {
    if (req.cookies.token === "") {
      return res.status(401).json({
        message: "please login",
        success: false,
      });
    }
    try {
      let data = jwt.verify(req.cookies.token, process.env.JWT_KEY);
      req.user = data;
      next();
    } catch (err) {
      return res.status(501).json({
        message: "Something went wrong",
        success: false,
      });
    }
  } catch (err) {
    return res.status(501).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

module.exports = isLoggedIn;
