const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = require("./user");

const Chat = new Schema({
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: User,
            required: true,
            index: true,
            unique: true
        }
    ],
    unreadBy: {
        type: Schema.Types.ObjectId,
        ref: User
    }
});

Chat.methods.getJSON = function (user_id) {
    let buddy_id;
    let unread = (this.unreadBy == user_id);

    for (id of this.members) {
        if (id != user_id) {
            buddy_id = id;
            break;
        }
    }

    return {
        id: this._id,
        members: this.members,
        unread: unread,
        buddy_id: buddy_id
    };
};

module.exports = mongoose.model('chats', Chat);
