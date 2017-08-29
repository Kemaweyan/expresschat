const express = require("express");
const passport = require('passport');

const User = require("../models/user");

const router = express.Router();

router.get('/login', (req, res) => {
    if (req.user) {
        res.send(req.user.getJSON());
    } else {
        res.status(401).send({error: req.flash('error')});
    }
});

router.post('/login', passport.authenticate('local', {failureRedirect: '/login', failureFlash: true}), (req, res, next) => {
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/login');
    });
});

router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/login');
    });
});

router.post('/register', (req, res) => {
    User.register(User.createFromJSON(req.body), req.body.password, (err, user, next) => {
        if (err) {
          return res.status(400).send({error: err.message});
        }

        passport.authenticate('local')(req, res, () => {
            req.session.save((err) => {
                if (err) {
                    return next(err);
                }
                res.redirect('/login');
            });
        });
    });
});

module.exports = router;
