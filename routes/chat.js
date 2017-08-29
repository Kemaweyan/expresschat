const express = require("express");

const Chat = require("../models/chat");

const router = express.Router();

router.get('/chats', (req, res, next) => {
    if (!req.user) {
        let err = new Error("Not authorized");
        err.status = 401;
        return next(err);
    }

    Chat.find({members: req.user._id}, (err, docs) => {
        if (err) {
            next(err);
        }

        let chatList = [];

        for (chat of docs) {
            chatList.push(chat.getJSON(req.user._id));
        }

        res.send(chatList);
    });
});

module.exports = router;
