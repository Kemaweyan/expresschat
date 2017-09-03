const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const session = require("express-session");
const morgan = require("morgan");
const fs = require("fs");

const dirs = [
    './uploads',
    'public/images/avatars',
    'public/images/avatars/32',
    'public/images/avatars/48',
    'public/images/avatars/100'
];

function mkdir(dir) {
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
}

dirs.map((dir) => {
    return mkdir(dir);
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/expresschat', {useMongoClient: true});

const User = require("./models/user");

const auth = require("./routes/auth");
const chats = require("./routes/chats");
const users = require("./routes/users");

const app = express();

app.use(morgan("dev"));
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

app.use(express.static(path.join(__dirname, 'public')));

app.use("/", auth);
app.use("/", chats);
app.use("/", users);

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((err, req, res, next) => {
    res.status(err.status || 500).send({error: err.message});
});

const port = 3000;

app.listen(port, () => {
  console.log('Server is running on port ' + port);
});
