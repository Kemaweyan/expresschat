const express = require("express");

const router = express.Router();

router.get('/login', (req, res) => {
    // get a login form
});

router.post('/login', (req, res) => {
    // process a login form
});

router.post('/logout', (req, res) => {
    // get a logout request
});

router.get('/register', (req, res) => {
    // get a registration form
});

router.post('/register', (req, res) => {
    // process a registration form
});

module.exports = router;
