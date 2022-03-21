const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    review: { type: String },
    review_video: {
        data: Buffer,
        contentType: String
    }
}, { timestamps: true });


const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;