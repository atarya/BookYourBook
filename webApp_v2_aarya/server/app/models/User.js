const mongoose = require("mongoose");

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
        // password: string > required > "standard pattern"(need to define)
        password: {
            type: String,
            required: [true, "Password is required"],
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
        // avatar: string > required > default "URL" > cloudinary uploaded url
        avatar: {
            type: String,
            required: true,
            default: "https://res.cloudinary.com/nupmry/image/upload/v1647986877/bookyourbook/defaults/default_profile_oksztv.jpg"
        },
        // dob: date > required > "DD/MM/YYYY" > between 13 - 100 years old on the day of signup
        dob: {
            type: Date,
            required: [true, "Date of birth is required"],
            // validation will be done on the client end
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
        current_society: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Society"
        },
        // users_invite_code: string > unique > random / auto > exact 5 characters
        users_invite_code: { // new user's invite code, will be auto generated and saved
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        // reference_code: string > ref: users
        reference_code: {
            type: Strmongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Reference code is required"],
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", user);

module.exports = User;