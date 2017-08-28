const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const passportLocalMongoose = require("passport-local-mongoose");

const User = mongoose.Schema({
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

module.exports = mongoose.model('users', User);
