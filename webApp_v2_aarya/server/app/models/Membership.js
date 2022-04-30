const mongoose = require('mongoose');

const membership = mongoose.Schema({
    // membership_id: unique > required > ObjectId > random / auto
    // user_id: ObjectId > ref: users
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true, required: true },
    // expiry: date > required > "DD/MM/YYYY" > (for now) membership_date +1 year if transaction_details[0] is successful
    expiry_date: { type: Date, required: true },
    // transaction_details: array > [ Razor pay confirmed payment details ]
    transaction_details: {
        type: [],
        required: true,
    }
},
    { timestamps: true }
)

const Membership = mongoose.model("Membership", membership);

module.exports = Membership;