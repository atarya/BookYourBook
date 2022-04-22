// Imports User model
const User = require('../models/User');

// Login is being handled by the passport passport middleware so this function is intentionally left blank for future use
const loginUser = async (req, res) => {
    // Check req.body, FIXME: password not encrypted till here
    res.json({
        message: 'SignIn successful',
        token: req.body.token
    });
}

// I could only create new user with phone number and password, and then update the user with all details
// which is not ideal, but I couldn't figure out how to do it with passport
const registerUser = async (req, res) => {
    const { phone, password, otp_verified, name, dob, gender, current_society, reference_user } = req.body
    try {
        const checkUser = await User.findOne({ phone })
        const checkReferenceUser = await User.findOne({ phone: reference_user })

        if (checkReferenceUser) { // Check if reference user exists
            if (!checkUser) {
                const user = await User.create({
                    phone,
                    password,
                    otp_verified, // TODO: On the client end here we again need to do an OTP verification
                    name,
                    // TODO: check DOB range on the client side
                    dob: new Date(dob), // Sample of format received in the request: "01/04/1993" FIXME: make it more precise
                    gender,
                    current_society,
                    reference_user: checkReferenceUser._id
                })
                // TODO: filter response to exclude sensitive info like passwords
                res.json({
                    message: 'Signup successful',
                    request: user
                });
            } else {
                // Duplicate user check
                res.status(400).json({ message: "User already exists." })
            }
        } else {
            res.status(400).json({ message: "Reference user not found" })
        }
    } catch (error) {
        res.json(error)
    }
}

const getUser = async (req, res) => {
    try {
        // user._id provided in params
        const user = await User.findById(req.params.id)
        // TODO: filter response to exclude sensitive info like passwords
        user ? res.json(user) : res.json({ message: "User not found" })
    } catch (error) {
        console.log(error)
    }
}

const getAllUsers = async (req, res) => {
    try {
        // FIXME: Add check to only allow admin to access this
        const users = await User.find()
        users ? res.json(users) : res.json({ message: "No users found" })
    } catch (error) {
        console.log(error)
    }
}

const updateUser = async (req, res) => {
    // Only the following fields can be updated
    // TODO: On the client end here we again need to do an OTP verification
    const {
        phone,
        password,
        avatar,
        current_society,
    } = req.body

    try {
        // user._id provided in params
        const user = await User.findByIdAndUpdate(req.params.id, { // TODO: Seek confirmation on the client side
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
        // user._id provided in params
        const user = await User.findByIdAndDelete(req.params.id) // TODO: Seek confirmation on the client side
        user ? res.json(user) : res.json({ message: "User not found" })
    } catch (error) {
        console.log(error)
    }
}

module.exports = { registerUser, getUser, getAllUsers, updateUser, deleteUser, loginUser }