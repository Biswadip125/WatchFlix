const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");

const indexRouter = require("./routes/indexRouter");
const usersRouter = require("./routes/usersRouter");

require("dotenv").config();

const db = require("./config/mongoose-connection");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "*");
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");

//   next();
// });

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, PUT, POST, DELETE, UPDATE, OPTIONS "
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X_Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization"
  );
  next();
});

// app.use(
//   cors({
//     allowedHeaders: "*",
//     allowMethods: "*",
//     origin: "*",
//   })
// );

app.get("/", (req, res) => {
  res.send("hello");
});
app.use("/api/v1", indexRouter);
app.use("/api/v1/users", usersRouter);

app.listen(process.env.PORT, () => {
  console.log("server is running");
});
