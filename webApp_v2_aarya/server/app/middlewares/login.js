const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: "../../../.env" });
const JWT_SECRET = process.env.JWT_SECRET;

const passportLogin = async (req, res, next) => {
    passport.authenticate(
        'login',
        async (err, user, info) => {
            try {
                if (err || !user) {
                    const error = new Error('An error occurred.');
                    return next(error);
                }
                req.login(
                    user,
                    { session: false },
                    async (error) => {
                        if (error) return next(error);
                        const body = { _id: user._id, phone: user.phone };
                        const token = jwt.sign({ user: body }, JWT_SECRET, { expiresIn: '1d' });
                        console.log(req.body);
                        req.body = { ...req.body, token };
                        next()
                    }
                );
            } catch (error) {
                return next(error);
            }
        }
    )(req, res, next);
}

module.exports = { passportLogin };