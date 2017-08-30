const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");
const Schema = mongoose.Schema;

const User = require("./user");

const Chat = new Schema({
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: User,
            required: true,
            index: true
        }
    ],
    unreadBy: {
        type: Schema.Types.ObjectId,
        ref: User
    }
});

Chat.plugin(findOrCreate);

Chat.methods.getJSON = function (userId) {
    let buddyId;
    let unread = (this.unreadBy == userId);

    for (id of this.members) {
        if (id != userId) {
            buddyId = id;
            break;
        }
    }

    return {
        id: this._id,
        members: this.members,
        unread: unread,
        buddyId: buddyId
    };
};

module.exports = mongoose.model('chats', Chat);
