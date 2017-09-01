const express = require("express");

const User = require("../models/user");

const router = express.Router();

router.get('/search', (req, res, next) => {
    const query = unescape(req.query.q);

    res.send(query);
});

module.exports = router;
