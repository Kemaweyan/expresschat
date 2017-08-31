const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = require("./user");
const Chat = require("./chat");

const Post = new Schema({
    chat: {
        type: Schema.Types.ObjectId,
        ref: 'chats',
        required: true,
        index: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

Post.methods.getJSON = function () {
    return {
        id: this._id,
        authorId: this.author,
        text: this.text,
        date: this.date.toJSON()
    };
}

Post.statics.createPost = function (data) {
    return new this({
        chat: data.chatId,
        author: data.authorId,
        text: data.text,
        date: data.date
    });
};

module.exports = mongoose.model('posts', Post);
