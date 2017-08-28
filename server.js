const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const session = require("express-session");

const auth = require("./routes/auth");

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(flash());
app.use(passport.session());

app.use("/", auth);

app.use(express.static(path.join(__dirname, 'public')));

const User = require("./models/user");
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/expresschat', {useMongoClient: true});

const port = 3000;

app.listen(port, () => {
  console.log('Server is running on port ' + port);
});
