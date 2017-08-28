const express = require("express");
const passport = require('passport');
const User = require("../models/user");

const router = express.Router();

let getUserData = (user) => {
    return {
        id: user._id,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        avatar: user.avatar
    };
};

let getUserRequest = (data) => {
    return {
        username: data.username,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        avatar: data.avatar
    };
};

router.get('/login', (req, res) => {
    if (req.user) {
        res.send(getUserData(req.user));
    } else {
        res.status(401).send({error: req.flash('error')});
    }
});

router.post('/login', passport.authenticate('local', {failureRedirect: '/login', failureFlash: true}), (req, res) => {
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/login');
    });
});

router.post('/logout', (req, res) => {
    // get a logout request
});

router.post('/register', (req, res) => {
    let data = {};

    if (req.body.username && req.body.password && req.body.firstname &&
        req.body.lastname && /\w+@\w+/.test(req.body.email)) {

        data = getUserRequest(req.body);
    } else {
        return res.status(400).send({error: "Bad request"});
    }

    User.register(new User(data), req.body.password, (err, user) => {
        if (err) {
          return res.status(400).send({error: err.message});
        }

        passport.authenticate('local')(req, res, () => {
            req.session.save((err) => {
                if (err) {
                    return res.status(400).send({error: err.message});
                }
                res.redirect('/login');
            });
        });
    });
});

module.exports = router;
