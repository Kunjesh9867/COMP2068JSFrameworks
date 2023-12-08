var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");

const session = require("express-session");

var indexRouter = require("./routes/index");
var onewayRouter = require("./routes/oneway");
var cartRouter = require("./routes/cart");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
    session({
        secret: "s2021pr0j3ctTracker",
        resave: false,
        saveUninitialized: false,
    })
);

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Link passport to the user model
const User = require("./models/user");
passport.use(User.createStrategy());


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use("/", indexRouter);
app.use("/oneway", onewayRouter);
app.use("/cart", cartRouter);

// Use the connect method, and the two handlers to try to connect to the DB
mongoose
    .connect(
        "mongodb+srv://projectTrackerWebApp:Tesla_123@cluster1.dfp2cp6.mongodb.net/",
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then((message) => {
        console.log("Connected successfully!");
    })
    .catch((error) => {
        console.log(`Error while connecting! ${error}`);
    });

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
