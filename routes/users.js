const express = require("express");

const User = require("../models/user");

const router = express.Router();

router.get('/search', (req, res, next) => {
    const sanitized = req.query.q.replace(/\W/g, "");
    const query = new RegExp(sanitized, "i");

    let promise = User.find({
        $or: [
            {username: query},
            {firstname: query},
            {lastname: query}
        ]
    }).where("_id").ne(req.user._id).exec();

    promise.then((users) => {
        res.send({
            query: sanitized,
            buddies: users.map((user) => {
                return user.getJSON();
            })
        });
    },
    (err) => {
        next(err);
    });
});

module.exports = router;
