const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const User = mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    email: String,
    avatar: String
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', User);
