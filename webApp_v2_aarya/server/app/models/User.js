const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const user = mongoose.Schema(
    {
        // user_id: unique > required > ObjectId > random / auto
        // phone: string > required > unique > "10 digits"
        phone: {
            type: String,
            required: [true, "Phone number is required"],
            unique: [true, "Phone number is already registered"],
            trim: true,
            validate: { // Must be a 10 digit number with no spaces, and greater than 0999999999
                validator: function (v) {
                    return /^\d{10}$/.test(v);
                },
                message: "Please enter a valid number"
            }
        },
        interests: {
            type: [String],
            required: [true, "Please select interests"],
            minlength: [5, "Please select at least 5 interests"],
        },
        // password: string > required > "standard pattern"(need to define)
        // TODO: need to define a standard pattern for password
        password: {
            type: String,
            required: [true, "Password is required"],
            // Regex validation for reference:
            // validate: { // Between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter
            //     validator: function (v) {
            //         return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(v);
            //     },
            //     message: "Should be 6-20 characters long, including at least one numeric digit, one uppercase, and one lowercase letter"
            // }
        },
        // otp_verified: boolean > required > default false
        otp_verified: {
            type: Boolean,
            required: [true, "OTP verification is required"],
            default: false
        },
        // full_name: string > required > "first name last name"
        name: {
            type: String,
            required: true,
            validate: {
                validator: function (v) {
                    return /^[a-zA-Z ]+$/.test(v);
                },
                message: "Please enter a valid name"
            }
        },
        // save location of user, and update it everytime the user logs in
        // loc: {
        //     type: { type: String },
        //     coordinates: [],
        // },
        // avatar: string > required > default "URL" > cloudinary uploaded url
        avatar: {
            type: String,
            required: true,
            default: "https://res.cloudinary.com/nupmry/image/upload/v1647986877/bookyourbook/defaults/default_profile_oksztv.jpg"
        },
        // dob: date > required > "DD/MM/YYYY" > between 13 - 100 years old on the day of signup
        // TODO: need validations for dob
        dob: {
            type: Date,
            required: [true, "Date of birth is required"],
        },
        // gender: string > male | female | others
        gender: {
            type: String,
            required: [true, "Gender is required"],
            // validate: {
            //     validator: function (v) {
            //         return (v == "male" || v == "female" || v == "other")
            //     },
            //     message: "male | female | other"
            // }
        },
        // current_society: ObjectId > ref: societies
        // current_society: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "Society"
        // },

        reference_user: { // in the front end the referer's phone number will be given and the user_id will be fetched and added here
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Reference user is required"],
        },
    },
    { timestamps: true }
);

user.index({ "loc": "2dsphere" });

user.pre('save', async function (next) {
    try {
        if (this.isNew) {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(this.password, salt)
            this.password = hashedPassword
        }
        next()
    } catch (error) {
        next(error)
    }
})

user.methods.isValidPassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);

    return compare;
}

const User = mongoose.model("User", user);

module.exports = User;