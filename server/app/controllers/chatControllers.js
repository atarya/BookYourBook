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

    var users = JSON.parse(req.body.users);

    if (users.length < 2) {
        res.status(400);
        res.send("You must select at least 2 users!");
    }

    users.push(req.user);

    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            isGroupChat: true,
            users: users,
            groupAdmin: req.user,
        })

        const FullChat = await Chat.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")

        res.status(200).send(FullChat);

    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
})


const renameGroup = asyncHandler(async (req, res) => {
    const { chatId, chatName } = req.body;
    const updatedChat = await Chat.findByIdAndUpdate(chatId, { chatName }, { new: true })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")

    if (!updatedChat) {
        res.status(400);
        throw new Error("Chat not found!");
    } else {
        res.json(updatedChat);
    }
})

const addToGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;

    const added = await Chat.findByIdAndUpdate(chatId, { $push: { users: userId } }, { new: true })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")

    if (!added) {
        res.status(400);
        throw new Error("Chat not found!");
    } else {
        res.json(added);
    }
})

const removeFromGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;

    const removed = await Chat.findByIdAndUpdate(chatId, { $pull: { users: userId } }, { new: true })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")

    if (!removed) {
        res.status(400);
        throw new Error("Chat not found!");
    } else {
        res.json(removed);
    }
})

module.exports = { accessChat, fetchChats, createGroupChat, renameGroup, removeFromGroup, addToGroup }