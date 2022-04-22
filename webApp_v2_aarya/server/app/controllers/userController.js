const User = require('../models/User');

const createUser = async (req, res) => {

    const {
        phone,
        password,
        otp_verified,
        name,
        avatar,
        dob,
        gender,
        current_society,
        reference_user
    } = req.body

    try {
        const check_user = await User.findOne({ phone })
        if (!check_user) {
            const user = new User({
                phone,
                password,
                otp_verified,
                name,
                avatar,
                dob,
                gender,
                current_society,
                reference_user
            });
            user.save()
        } else {
            res.json({ message: "Phone number already registered" })
        }

    } catch (error) {
        console.log(error)
    }
}

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        user ? res.json(user) : res.json({ message: "User not found" })
    } catch (error) {
        console.log(error)
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        users ? res.json(users) : res.json({ message: "No users found" })
    } catch (error) {
        console.log(error)
    }
}

const updateUser = async (req, res) => {
    const {
        phone,
        password,
        avatar,
        current_society,
    } = req.body

    try {
        const user = await User.findByIdAndUpdate(req.params.id, {
            phone,
            password,
            avatar,
            current_society
        })
        user ? res.json(user) : res.json({ message: "User not found" })
    } catch (error) {
        console.log(error)
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        user ? res.json(user) : res.json({ message: "User not found" })
    } catch (error) {
        console.log(error)
    }
}

module.exports = { createUser, getUser, getAllUsers, updateUser, deleteUser }