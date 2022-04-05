const expressAsyncHandler = require("express-async-handler");
const Message = require("../models/Message");
const Chat = require("../models/Chat");
const User = require("../models/User");

const sendMessage = expressAsyncHandler(async (req, res) => {
    const { content, chatId } = req.body;
    if (!content || !chatId) {
        console.log("Incorrect content or chatId")
        return res.status(400)
    }

    var newMessage = {
        sender: req.user._id,
        content: content,
        chatId: chatId
    }

    try {
        var message = await Message.create(newMessage);

        message = await message.populate("sender", "name avatar");
        message = await message.populate("chat");
        message = await User.populate(message, {
            path: "chat.users",
            select: "name avatar phone"
        })

        await Chat.findByIdAndUpdate(req.body.chatId, {
            latestMessage: message,
        })

        res.json(message);

    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }

})

const allMessages = expressAsyncHandler(async (req, res) => {

})

module.exports = { sendMessage, allMessages }