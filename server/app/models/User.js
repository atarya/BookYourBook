const mongoose = require("mongoose");

const user = mongoose.Schema(
    {
        // user_id: unique > required > ObjectId > random / auto
        // phone: string > required > unique > "10 digits"
        phone: { type: String, required: true, unique: true, trim: true },
        // password: string > required > "standard pattern"(need to define)
        password: { type: String, required: true },
        // full_name: string > required > "first name last name"
        name: { type: String, required: true },
        // avatar: string > required > default "URL" > cloudinary uploaded url
        avatar: { type: String, required: true, default: "https://res.cloudinary.com/nupmry/image/upload/v1647986877/bookyourbook/defaults/default_profile_oksztv.jpg" },
    },
    { timestamps: true }
);

const User = mongoose.model("User", user);

module.exports = User;