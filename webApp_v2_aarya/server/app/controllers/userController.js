// Imports User model
const User = require('../models/User');
const Membership = require('../models/Membership');


// Login is being handled by the passport passport middleware so this function is intentionally left blank for future use
const loginUser = async (req, res) => {
    // Check req.body, FIXME: password not encrypted till here
    res.json({
        message: 'SignIn successful',
        user: await User.findById(req.user._id, { password: 0 }),
        token: req.body.token
    });
}

// I could only create new user with phone number and password, and then update the user with all details
// which is not ideal, but I couldn't figure out how to do it with passport
const registerUser = async (req, res) => {
    const { phone, password, interests, otp_verified, avatar, name, dob, gender, current_society, reference_user } = req.body
    try {
        const checkUser = await User.findOne({ phone })
        const checkReferenceUser = await User.findOne({ phone: reference_user })

        if (checkReferenceUser) { // Check if reference user exists
            if (!checkUser) {
                const user = await User.create({
                    phone,
                    password,
                    avatar,
                    otp_verified, // TODO: On the client end here we again need to do an OTP verification
                    name,
                    // TODO: check DOB range on the client side
                    dob: new Date(dob), // Sample of format received in the request: "01/04/1993" FIXME: make it more precise
                    gender,
                    interests,
                    current_society,
                    reference_user: checkReferenceUser._id
                })

                await Membership.create({
                    user: user._id,
                    expiry_date: await new Date(new Date().setDate(new Date().getDate() + 7)),
                    transaction_details: ["Trial"]
                })

                res.json({
                    message: 'Signup successful',
                    user: await User.findById(user._id, { password: 0 }),
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
        if (req.user._id == req.params.id) {
            const user = await User.findById(req.user._id, { password: 0 })
            user ? res.json(user) : res.json({ message: "Invalid User" })
        } else {
            // TODO: filter response to exclude sensitive info like passwords DONE
            const user = await User.findById(req.params.id, { password: 0, otp_verified: 0, interests: 0, dob: 0, gender: 0, current_society: 0, reference_user: 0 })
            user ? res.json(user) : res.json({ message: "Invalid User" })
        }
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
        const user = await User.findByIdAndUpdate(req.user._id, { // TODO: Seek confirmation on the client side
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
        const user = await User.findByIdAndDelete(req.user._id) // TODO: Seek confirmation on the client side
        user ? res.json(user) : res.json({ message: "User not found" })
    } catch (error) {
        console.log(error)
    }
}

module.exports = { registerUser, getUser, getAllUsers, updateUser, deleteUser, loginUser }