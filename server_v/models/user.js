const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;


const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    email: {
        type: String,
        trim: true,
        required: 'Email is required',
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 25,
    },
    stripe_account_id: "",
    stripe_seller: {},
    stripeSessions: {},
}, { timestamps: true }
);

userSchema.pre('save', function (next) {
    let user = this;
    if (user.isModified('password')) {
        return bcrypt.hash(user.password, 12, function (err, hash) {
            if (err) {
                console.log('BCRYPT ERROR:', err);
                return next(err);
            }
            user.password = hash;
            return next();
        });
    } else {
        return next();
    }
})


module.exports = mongoose.model("User", userSchema);