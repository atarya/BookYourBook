const Book = require('../models/Book');
const Exchange = require('../models/Exchange');
const Membership = require('../models/Membership');
const User = require('../models/User');


const getPopular = async (req, res) => {
    // req.query will have page, count, available: true/false

    // TODO: needs to be written after the exchanges controllers are done

    // 1. get books with average rating above 3.5 | 2. order by books with maximum count of reviews |
    // 3. filter out the books belonging to the logged in user | 4. order by maximum count of exchanges in the last 100 days
    // 5. filter out the books with available: false | 6. limit to the first 100 books | 7. paginate



    // query users by location > get user Ids array >  query docs on the books colllection matching the users >


}

const userList = async (req, res) => {
    const { page, count } = req.query;
    const user = req.query.user ? req.query.user : req.user._id;
    try {
        const books = await Book.find({ owner: user }).limit(count).skip(count * (page - 1));
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// search by title, author, genre, check for 3 req.query; (query = search query, req.user.id = user._id and filter = true/false this would filter only the available books) minus books of logged in user
const getSearch = async (req, res) => {
    // req.query will have page, count, available: true, query, user

    // don't return the books that have owners with expired membership
    // var options = {
    //     location: {
    //         $geoWithin: {
    //             $centerSphere: [[parseFloat(req.query.lat), parseFloat(req.query.long)], 3.11 / 3963.2]
    //         }
    //     }
    // }

    const currentUser = await User.findOne({ _id: req.user._id })
    // console.log(currentUser.location.coordinates)
    var options = { location: { $near: { $maxDistance: 5000, $geometry: { type: "Point", coordinates: currentUser.location.coordinates } } } }
    // console.log(options, req.query)
    const usersNearby = await User.find(options)
    const userIds = await usersNearby.map(user => user._id)
    // console.log(usersNearby, userIds)

    const { page, count } = req.query // Paginated
    const available = req.query.available == "true" ? false : null;
    const keyword = req.query.query ?
        {
            $and:
                [
                    {
                        $or:
                            [
                                { title: { $regex: req.query.query, $options: 'i' } },
                                { author: { $regex: req.query.query, $options: 'i' } },
                                { genre: { $regex: req.query.query, $options: 'i' } },
                                { langauge: { $regex: req.query.query, $options: 'i' } },
                            ]
                    },
                    { owner: { $in: userIds } }
                ]
        } : { owner: { $in: userIds } };

    const books = await Book.find(keyword)
        .find({ owner: { $ne: req.user._id }, available: { $ne: available } })
        .limit(count)
        .skip(count * (page - 1));

    // don't show the books that have owners with expired memberships

    res.send(books);
}

const getSingle = async (req, res) => {
    try {
        const book = await Book.findById(req.params.book_id);
        book ? res.json(book) : res.json({ message: "Book not found" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateSingle = async (req, res) => {
    // only logged in user can edit their own books, but this can't work with the current schema as any user can add reviews so this needs to be done on the client side
    const { review, rating, title, author, cover, genre, langauge, description, isbn } = req.body; // sample review = { holder: "fsare9ucq9034cty82580ym438ntx0438", rating: 5, review: "This is a comment" }
    const { book_id } = req.params;
    const { action, exchange_id } = req.query;

    try {
        console.log("entered")
        const book = await Book.findById(book_id);
        if (!book) {
            res.status(404).json({ message: "Book not found" });
        } else {
            if (action == "details" && req.user._id == book.owner) {
                const book = await Book.findByIdAndUpdate(book_id, {
                    title, author, cover, genre, langauge, description, isbn
                })
                res.json(book);
            } else if (action == "review") {
                const exchange = await Exchange.findById(exchange_id);
                if (!exchange) {
                    res.status(404).json({ message: "Exchange not found" });
                }
                if (exchange.borrower != req.user._id) {
                    res.status(403).json({ message: "You are not the borrower of this exchange" });
                }
                book.exchanges.push({ review, exchange_id, rating, borrower: req.user._id });
                await book.save();
                await Exchange.findByIdAndUpdate(exchange_id, { reviewed: true });
                res.json(book);
            } else {
                res.status(404).json({ message: "Invalid Request" });
            }
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// only logged in user can delete their own books
const deleteSingle = async (req, res) => {
    try {
        const book = await Book.findById(req.params.book_id);
        if (!book) {
            res.status(404).json({ message: "Book not found" });
        } else {
            if (book.owner != req.user._id) {
                res.status(403).json({ message: "You are not authorized to delete this book" });
            } else {
                await Book.findByIdAndDelete(req.params.book_id);
                res.json({ message: "Book deleted", book });
            }
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// owner set to logged in user
const addSingle = async (req, res) => {
    const { title, author, cover, genre, langauge, description, isbn } = req.body;
    try {
        if (!title || !author || !genre || !description || !isbn || !langauge) {
            res.status(400).json({ message: "Please provide all the required fields" });
        } else {
            const book = new Book({
                title,
                author,
                cover,
                owner: req.user._id,
                genre,
                langauge,
                description,
                isbn
            });
            await book.save();
            res.json(book);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getPopular, getSearch, getSingle, updateSingle, deleteSingle, addSingle, userList }