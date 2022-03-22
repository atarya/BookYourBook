const mongoose = require("mongoose");

const book = mongoose.Schema(
    {
        // book_id: unique > required > ObjectId > random / auto
        // book_title: string > required > "book name"
        // book_author: string > required > "author name"
        // cover: string > required > default "URL" > cloudinary uploaded url
        // owner: ObjectId > ref: users
        // genre: array > required > selected from an existing list
        // description: string > required > "book description"
        // isbn: string > required > "13 digits"
        // available: boolean > required > default true
        // reviews: array of objects > [{
        //                                 holder: ObjectId > ref users
        //                                 rating: number(1 - 5)
        //                                 review: string with character limit
        //                             ]}
    },
    { timestamps: true }
);

const Book = mongoose.model("Book", book);

module.exports = Book;