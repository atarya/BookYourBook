const mongoose = require("mongoose");

const membership = mongoose.Schema(
    {
        // membership_id: unique > required > ObjectId > random / auto
        // user_id: ObjectId > ref: users
        // membership_date: date > required > "DD/MM/YYYY"
        // expiry: date > required > "DD/MM/YYYY" > (for now) membership_date +1 year if transaction_details[0] is successful
        // transaction_details: array > [
        //                                 {
        //                                     transaction_id: string > required > unique > random / auto
        //                                     amount: number > required > "amount in INR"
        //                                     status: string > required > "success" | "failed"
        //                                     reference_code: string > required > "generated from stripe"
        //                                 }
        //                             ]
    },
    { timestamps: true }
);

const Membership = mongoose.model("Membership", membership);

module.exports = Membership;