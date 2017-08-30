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
    /*if (!req.user) {
        let err = new Error("Not authorized");
        err.status = 401;
        return next(err);
    }*/

    let chatId = req.body.chatId;

    if (!chatId) {
        let data = {
            //authorId: req.user._id,
            authorId: "59a5556822037910117a4fc2",
            buddyId: req.body.buddyId
        };

        let chat = Chat.createChat(data);

        chat.save((err) => {
            if (err) {
                return next(err);
            }

            chatId = chat._id;

            let date = new Date(Date.now());

            let data = {
                chatId: chatId,
                //authorId: req.user._id,
                authorId: "59a5556822037910117a4fc2",
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
        });
    }
});

router.get('/chats/:chatId', (req, res, next) => {
    
});

module.exports = router;
