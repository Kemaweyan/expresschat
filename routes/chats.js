const express = require("express");

const Chat = require("../models/chat");
const Post = require("../models/post");

const router = express.Router();

router.get('/chats', (req, res, next) => {
    Chat.find({members: req.user._id})
        .populate('members')
        .then((docs) => {
            res.send(docs.map((chat) => {
                return chat.getJSON(req.user._id);
            }));
        },
        (err) => {
            next(err);
        });
});

router.post('/chats', (req, res, next) => {
    let chatIdPromise = new Promise((resolve, reject) => {
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
            }
            newChat.unreadBy = req.body.buddyId;
            newChat.save();

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

router.get('/chats/:chatId/:skip*?', (req, res, next) => {
    let chatPromise = Chat.findById(req.params.chatId).where({
        members: req.user._id
    }).populate('members').exec();

    chatPromise.then((chat) => {
        if (!chat) {
            let err = new Error("Forbidden");
            err.status = 403;
            return next(err);
        }

        chat.markRead(req.user._id);

        let query = Post.find({chat: req.params.chatId});

        if (req.params.skip) {
            query = query.skip(req.params.skip);
        }

        query = query.sort("-date").limit(20);

        let postsPromise = query.exec();

        postsPromise.then((posts) => {
            res.send({
                chat: chat.getJSON(),
                posts: posts.map((post) => {
                    return post.getJSON();
                })
            });
        }, (err) => {
            return next(err);
        });
    }, (err) => {
        return next(err);
    });
});

module.exports = router;
