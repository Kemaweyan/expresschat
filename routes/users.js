const express = require("express");

const User = require("../models/user");

const router = express.Router();

router.get('/users/:userId', (req, res, next) => {
    if (!req.user) {
        let err = new Error("Not authorized");
        err.status = 401;
        return next(err);
    }

    User.findById(req.params.userId, (err, user) => {
        if (err) {
            return next(err);
        }

        res.send(user.getJSON());
    });
});

module.exports = router;
