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
    // hash password only if user is changing the password or registering for the first time
    // make sure to use "this" otherwise each time user.save() is executed, password
    // will get auto updated and you can't login with original password
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
});

userSchema.methods.comparePassword = function (password, next) {
    bcrypt.compare(password, this.password, function (err, match) {
        if (err) {
            console.log("COMPARE PASSWORD ERR", err);
            return next(err, false);
        }
        // if no err, we get null
        console.log("MATCH PASSWORD", match);
        return next(null, match);  // true
    })
}


module.exports = mongoose.model("User", userSchema);