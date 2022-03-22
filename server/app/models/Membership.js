const mongoose = require("mongoose");

const membership = mongoose.Schema(
    {
        // membership_id: unique > required > ObjectId > random / auto
        // user_id: ObjectId > ref: users
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        // membership_date: date > required > "DD/MM/YYYY"
        membership_date: { type: Date, required: true },
        // expiry: date > required > "DD/MM/YYYY" > (for now) membership_date +1 year if transaction_details[0] is successful
        expiry: { type: Date, required: true },
        // transaction_details: array > [
        //                                 {
        //                                     transaction_id: string > required > unique > random / auto
        //                                     amount: number > required > "amount in INR"
        //                                     status: string > required > "success" | "failed"
        //                                     reference_code: string > required > "generated from stripe"
        //                                 }
        //                             ]
        transaction_details: [{
            transaction_id: { type: mongoose.Schema.Types.ObjectId, required: true },
            amount: { type: Number, required: true },
            status: { type: String, required: true },
            reference_code: { type: String, required: true },
        }]
    },
    { timestamps: true }
);

const Membership = mongoose.model("Membership", membership);

module.exports = Membership;