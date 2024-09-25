// Framework
// Middleware

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var bcrypt = require("bcryptjs");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var bookRouter = require("./routes/book");
var orderRouter = require("./routes/order");
var basketRouter = require("./routes/basket");
var addressRouter = require("./routes/customerAddress");
var orderDetailRouter = require("./routes/orderDetail");
var creditCardRouter = require("./routes/creditCard");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/book", bookRouter);
app.use("/order", orderRouter);
app.use("/basket", basketRouter);
app.use("/address", addressRouter);
app.use("/orderDetail", orderDetailRouter);
app.use("/creditCard", creditCardRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
