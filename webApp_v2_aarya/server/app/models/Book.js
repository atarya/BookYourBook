const mongoose = require('mongoose');

const book = mongoose.Schema({
    // book_id: unique > required > ObjectId > random / auto
    // book_title: string > required > "book name"
    title: { type: String, required: true },
    // book_author: string > required > "author name"
    author: { type: String, required: true },
    // cover: string > required > default "URL" > cloudinary uploaded url
    cover: { type: String, required: true, default: "https://res.cloudinary.com/nupmry/image/upload/v1647985769/bookyourbook/defaults/default_cover_g80llu.jpg" },
    // owner: ObjectId > ref: users
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    // genre: array > required > selected from an existing list
    genre: { type: [String], required: true },
    // description: string > required > "book description"
    description: { type: String, required: true },
    // exchage_count: number > required > default 0
    count: { type: Number, required: true, default: 0 },
    // isbn: string > required > "13 digits"
    isbn: { type: String, required: true },
    // available: boolean > required > default true
    available: { type: Boolean, required: true, default: true },
    // reviews: array of objects > [{
    //                                 holder: ObjectId > ref users
    //                                 rating: number(1 - 5)
    //                                 review: string with character limit
    //                             ]}
    reviews: [{
        holder: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, required: true },
        review: { type: String, required: true }
    }],
    langauge: { type: String, required: true, default: "English" },
},
    { timestamps: true });

const Book = mongoose.model("Book", book);

module.exports = Book;