const mongoose = require("mongoose");

const exchange = mongoose.Schema(
    {
        // exchange_id: unique > required > ObjectId > random / auto
        // book_id: ObjectId > ref: books
        // borrower: ObjectId > ref: users
        // status: string > requested(default) | accepted | rejected
        // borrow_date: date > required > "DD/MM/YYYY" > default "some old date", this is changed after status changes to accepted
        // return_date: date > required > "DD/MM/YYYY" > (for now) borrow_date + 10 days
        // returned: boolean > required > default false
    },
    { timestamps: true }
);

const Exchange = mongoose.model("Exchange", exchange);

module.exports = Exchange;