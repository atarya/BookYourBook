const asyncHandler = require("express-async-handler")
const Chat = require("../models/Chat")
const User = require("../models/User")

const accessChat = asyncHandler(async (req, res) => {
    const { userId } = req.body

    if (!userId) {
        res.status(400);
        throw new Error("UserId param not sent!");
    }

    var isChat = await Chat.find({
        isGroupChat: false,
        $and:
            [
                { users: { $elemMatch: { $eq: req.user._id } } },
                { users: { $elemMatch: { $eq: userId } } },
            ]
    })
        .populate("users", "-password")
        .populate("latestMessage");

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name, avatar, phone"
    });

    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {

        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId],
        }

        try {

            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({ _id: createdChat._id })
                .populate("users", "-password")

            res.status(200).send(FullChat);

        } catch (error) {

            res.status(400);

            throw new Error(error.message);

        }
    }
})

const fetchChats = asyncHandler(async (req, res) => {
    try {
        Chat.find({
            users: { $elemMatch: { $eq: req.user._id } }
        })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ "updatedAt": -1 })
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "latestMessage.sender",
                    select: "name, avatar, phone"
                })
                res.status(200).send(results);
            })

    } catch (error) { console.log(error) }
})

const createGroupChat = asyncHandler(async (req, res) => {
    if (!req.body.users || !req.body.name) {
        res.status(400);
        throw new Error("Fill all fields!");
    }
})

const renameGroup = asyncHandler(async (req, res) => {

})

const removeFromGroup = asyncHandler(async (req, res) => {

})

const addToGroup = asyncHandler(async (req, res) => {

})

module.exports = { accessChat, fetchChats, createGroupChat, renameGroup, removeFromGroup, addToGroup }