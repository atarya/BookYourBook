const mongoose = require("mongoose");

const user = mongoose.Schema(
    {
        // user_id: unique > required > ObjectId > random / auto
        // phone: string > required > unique > "10 digits"
        // password: string > required > "standard pattern"(need to define)
        // otp_verified: boolean > required > default false
        // full_name: string > required > "first name last name"
        // avatar: string > required > default "URL" > cloudinary uploaded url
        // dob: date > required > "DD/MM/YYYY" > between 13 - 100 years old on the day of signup
        // gender: string > male | female | others
        // current_society: ObjectId > ref: societies
        // users_invite_code: string > unique > random / auto > 5 characters
        // reference_code: string > ref: users
    },
    { timestamps: true }
);

const User = mongoose.model("User", user);

module.exports = User;