const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const passportLocalMongoose = require("passport-local-mongoose");
const fs = require("fs");

const User = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
        validate: {
            validator: (v) => {
                return /^[\w\.-]+@[\w\.-]+$/.test(v);
            },
            message: '{VALUE} is not a valid email'
        }
    },
    avatar: String
});

User.plugin(uniqueValidator, {message: "The email address {VALUE} is already in use"});
User.plugin(passportLocalMongoose);

User.statics.createFromJSON = function (data) {
    return new this({
        username: data.username,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        avatar: data.avatar
    });
};

User.methods.getJSON = function () {
    return {
        id: this._id,
        username: this.username,
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        avatar: this.avatar
    };
};

User.methods.setAvatar = function (filename) {
    if (this.avatar) {
        fs.unlink("public/images/avatars/32/" + this.avatar, (err) => {});
        fs.unlink("public/images/avatars/48/" + this.avatar, (err) => {});
        fs.unlink("public/images/avatars/100/" + this.avatar, (err) => {});
    }
    this.avatar = filename;
};

module.exports = mongoose.model('users', User);
