const mongoose = require("mongoose");

const user = mongoose.Schema(
    {
        // user_id: unique > required > ObjectId > random / auto
        // phone: string > required > unique > "10 digits"
        phone: { type: String, required: true, unique: true, trim: true },
        // password: string > required > "standard pattern"(need to define)
        password: { type: String, required: true },
        // otp_verified: boolean > required > default false
        otp_verified: { type: Boolean, required: true, default: false },
        // full_name: string > required > "first name last name"
        name: { type: String, required: true },
        // avatar: string > required > default "URL" > cloudinary uploaded url
        avatar: { type: String, required: true, default: "https://res.cloudinary.com/nupmry/image/upload/v1647986877/bookyourbook/defaults/default_profile_oksztv.jpg" },
        // dob: date > required > "DD/MM/YYYY" > between 13 - 100 years old on the day of signup
        dob: { type: Date, required: true },
        // gender: string > male | female | others
        gender: { type: String, required: true },
        // current_society: ObjectId > ref: societies
        current_society: { type: mongoose.Schema.Types.ObjectId, ref: "Society" },
        // users_invite_code: string > unique > random / auto > 5 characters
        users_invite_code: { type: String, required: true, unique: true, trim: true },
        // reference_code: string > ref: users
        reference_code: { type: String, ref: "User" },
    },
    { timestamps: true }
);

const User = mongoose.model("User", user);

module.exports = User;