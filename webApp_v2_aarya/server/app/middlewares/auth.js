// passport and its strategies
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/User');

require('dotenv').config({ path: "../../../.env" });
const JWT_SECRET = process.env.JWT_SECRET;


passport.use(
    new JWTstrategy(
        {
            secretOrKey: JWT_SECRET,
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
        },
        async (token, done) => {
            try {
                console.log(token.user)
                return done(null, token.user);
            } catch (error) {
                done(error);
            }
        }
    )
);

passport.use(
    'signup',
    new localStrategy(
        {
            usernameField: 'phone',
            passwordField: 'password'
        },
        async (phone, password, done) => {
            try {
                return done(null, dummy = {});
            } catch (error) {
                done(error);
            }
        }
    )
);

passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'phone',
            passwordField: 'password'
        },
        async (phone, password, done) => {
            try {
                const user = await User.findOne({ phone });
                if (!user) {
                    return done(null, false, { message: 'User not found' });
                }
                const validate = await user.isValidPassword(password);
                if (!validate) {
                    return done(null, false, { message: 'Wrong Password' });
                }
                return done(null, user, { message: 'Logged in Successfully' });
            } catch (error) {
                return done(error);
            }
        }
    )
);