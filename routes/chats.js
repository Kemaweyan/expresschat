const express = require("express");

const Chat = require("../models/chat");
const Post = require("../models/post");

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

router.post('/chats', (req, res, next) => {
    if (!req.user) {
        let err = new Error("Not authorized");
        err.status = 401;
        return next(err);
    }

    let chatIdPromise = new Promise((resolve, reject) => {
        if (req.body.chatId) {
            return resolve(req.body.chatId);
        }

        let findPromise = Chat.findOrCreate({
            $and: [
                {members: req.user._id},
                {members: req.body.buddyId}
            ]
        });

        findPromise.then((result) => {
            let newChat = result.doc;

            if (result.created) {
                newChat.members = [
                    req.user._id,
                    req.body.buddyId
                ];
                newChat.save();
            }

            resolve(newChat._id);
        },
        (err) => {
            reject(err);
        });
    });

    chatIdPromise.then((chatId) => {
        let date = new Date(Date.now());

        let data = {
            chatId: chatId,
            authorId: req.user._id,
            text: req.body.text,
            date: date.toJSON()
        };

        let post = Post.createPost(data);

        post.save((err) => {
            if (err) {
                return next(err);
            }

            res.send(post.getJSON());
        });
    },
    (err) => {
        return next(err);
    });
});

router.get('/chats/:chatId', (req, res, next) => {
    
});

module.exports = router;
