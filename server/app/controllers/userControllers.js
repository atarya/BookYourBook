const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const generateToken = require('../../config/generateToken');

const registerUser = asyncHandler(async (req, res) => {
    const { name, phone, password, dob, avatar, gender } = req.body

    if (!name || !phone || !password || !gender || !dob) {
        res.status(400);
        throw new Error("Please enter all details!");
    }

    const userExists = await User.findOne({ phone });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists!");
    }

    const user = await User.create({
        name,
        phone,
        password,
        dob,
        avatar,
        gender
    })

    if (user) {
        res.status(200).json({
            _id: user._id,
            phone: user.phone,
            name: user.name,
            avatar: user.avatar,
            token: generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error("Failed to create user!");
    }
})

const authUser = asyncHandler(async (req, res) => {
    const { phone, password } = req.body;

    const user = await User.findOne({ phone });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            phone: user.phone,
            name: user.name,
            avatar: user.avatar,
            token: generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error("Invalid credentials!");
    }
})

module.exports = { registerUser, authUser }