const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports.register = async (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body;

    //validation
    if (!name) return res.status(400).send('Name is required');
    if (!password || password.length < 6)
        return res
            .status(400)
            .send("Password is required and must be at least 6 characters long");
    let userExist = await User.findOne({ email }).exec();
    if (userExist) return res.status(400).send('Email is taken')

    // register
    const user = new User(req.body)
    try {
        await user.save()
        console.log('USER CREATED', user);
        return res.json({ ok: true });
    } catch (err) {
        console.log('CREATE USER FAILED', err)
        return res.status(400).send('Error. Try again.')
    }
}

module.exports.login = async (req, res) => {
    // console.log(req.body);
    const { email, password } = req.body
    try {
        // check if user with that email already exists
        let user = await User.findOne({ email }).exec();
        console.log("USER EXISTS", user);
        if (!user) res.status(400).send('User with that email not found');
        // compare Password
        user.comparePassword(password, (err, match) => {
            // console.log("COMPARE PASSWORD IN LOGIN ERROR", err);
            if (!match || err) return res.status(400).send("Wrong password");
            // console.log("GENERATE A TOKEN THEN SEND AS RESPONSE TO CLIENT");
            let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '7d'
            });
            res.json({
                token, user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    created_at: user.createdAt,
                    updated_at: user.updatedAt,
                }
            });
        });
    } catch (e) {
        console.log("LOGIN ERROR", e);
        res.status(400).send("Sign in failed");
    }
}