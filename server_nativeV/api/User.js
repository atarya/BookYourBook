const express = require('express');

const router = express.Router();

// MONGODB user model
const User = require('./../models/User')

// Password Handler
const bcrypt = require('bcrypt');


// signUp
router.post('/signup', () => {
    let { name, email, password, dateOfBirth } = req.body;
    // remove whitespaces
    name = name.trim();
    email = email.trim();
    password = password.trim();
    dateOfBirth = dateOfBirth.trim();


    if (name == '' || email == '' || password == '' || dateOfBirth == '') {
        res.json({
            status: 'FAILED',
            message: 'Empty input fields!'
        });
    } else if (!/^[a-zA-Z ]*$/.test(name)) {
        res.json({
            status: 'FAILED',
            message: 'Invalid name provided',
        })
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(name)) {
        res.json({
            status: 'FAILED',
            message: 'Invalid email provided',
        })
    } else if (!new Date(dateOfBirth).getTime()) {
        res.json({
            status: 'FAILED',
            message: 'Invalid date of birth provided',
        })
    } else if (password.length < 8) {
        res.json({
            status: 'FAILED',
            message: 'password is too short!',
        })
    } else {
        // checking id user already exists
        User.find({ email }).then(result => {
            if (result.length) {
                // A user already exists
                res.json({
                    status: 'FAILED',
                    message: 'User with the provided email already exists'
                })
            } else {
                // Try to create a new user

                // password handling
                const saltRounds = 10;
                bcrypt.hash(password, saltRounds).then(hashedPassword => {
                    const newUser = new User({
                        name,
                        email,
                        password: hashedPassword,
                        dateOfBirth
                    });
                    newUser.save().then(result => {
                        res.json({
                            status: 'SUCCESS',
                            message: "SignUp successful",
                            data: result,
                        })
                            .catch(err => {
                                res.json({
                                    status: "FAILED",
                                    message: "An error occurred while saving the user account!",
                                })
                            })
                    });
                }).catch(err => {
                    res.json({
                        status: "FAILED",
                        message: "An error occurred while while hashing password!",
                    })
                })
            }
        }).catch(err => {
            console.log(err);
            res.json({
                status: 'FAILED',
                message: "An error occurred while checking for existing user!"
            })
        })
    }

})


// signIn
router.post('/signin', () => {

})

module.exports = router;
