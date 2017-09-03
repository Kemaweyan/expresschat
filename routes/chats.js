const express = require("express");

const Chat = require("../models/chat");
const Post = require("../models/post");
const User = require("../models/user");

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

router.post('/chats/:buddyId', (req, res, next) => {
    let chatIdPromise = new Promise((resolve, reject) => {
        let findPromise = Chat.findOrCreate({
            $and: [
                {members: req.user._id},
                {members: req.params.buddyId}
            ]
        });

        findPromise.then((result) => {
            let newChat = result.doc;

            if (result.created) {
                newChat.members = [
                    req.user._id,
                    req.params.buddyId
                ];
            }
            newChat.unreadBy = req.params.buddyId;
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

router.get('/chats/:buddyId/:skip*?', (req, res, next) => {
    let chatPromise = Chat.findOne({
        $and: [
            {members: req.user._id},
            {members: req.params.buddyId}
        ]
    }).populate('members').exec();

    chatPromise.then((chat) => {
        if (!chat) {
            let buddyPromise = User.findById(req.params.buddyId).exec();

            return buddyPromise.then((buddy) => {
                res.send({
                    posts: [],
                    chat: {
                        buddy: buddy.getJSON()
                    }
                });
            },
            (err) => {
                err.status = 404;
                next(err);
            });
        }

        chat.markRead(req.user._id);

        let query = Post.find({chat: chat._id});

        if (req.params.skip) {
            query = query.skip(req.params.skip);
        }

        query = query.sort("-date").limit(20);

        let postsPromise = query.exec();

        postsPromise.then((posts) => {
            res.send({
                chat: chat.getJSON(req.user._id),
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
