const mongoose = require("mongoose")

const reviewSchema = mongoose.schema({
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
    borrower: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    rating: { type: Number, required: true },
    review: { type: String, required: true },
    exchange_id: { type: mongoose.Schema.Types.ObjectId, ref: "Exchange" }
})

const Review = mongoose.model("Review", reviewSchema)
module.exports = Review