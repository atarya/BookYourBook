const mongoose = require("mongoose");

const exchange = mongoose.Schema(
    {
        // exchange_id: unique > required > ObjectId > random / auto
        // book_id: ObjectId > ref: books
        book_id: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
        // borrower: ObjectId > ref: users
        borrower: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        // lender: ObjectId > ref: users
        lender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        // status: string > requested(default) | accepted | rejected
        status: { type: String, default: "requested" }, // requested | approved | rejected | returned
        // borrow_date: date > required > "DD/MM/YYYY" > default "some old date", this is changed after status changes to accepted
        borrow_date: { type: Date, required: true, default: new Date("01/01/1900") },
        // return_date: date > required > "DD/MM/YYYY" > (for now) borrow_date + 10 days
        return_date: { type: Date, required: true, default: new Date("01/01/1900") },
        // reviewed: boolean > required > default false
        reviewed: { type: Boolean, required: true, default: false },
    },
    { timestamps: true }
);

const Exchange = mongoose.model("Exchange", exchange);

module.exports = Exchange;