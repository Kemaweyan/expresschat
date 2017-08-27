const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

const auth = require("./routes/auth");

const app = express();

app.use(bodyParser.json());
app.use("/", auth);
app.use(passport.initialize());
app.use(flash());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost/expresschat', {useMongoClient: true});

const port = 3000;

app.listen(port, () => {
  console.log('Server is running on port ' + port);
});
