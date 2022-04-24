const Book = require('../models/Book');

const getPopular = async (req, res) => {
    // req.query will have page, count, available: yes/no

    // TODO: needs to be written after the exchanges controllers are done

    // 1. get books with average rating above 3.5 | 2. order by books with maximum count of reviews |
    // 3. filter out the books belonging to the logged in user | 4. order by maximum count of exchanges in the last 100 days
    // 5. filter out the books with available: false | 6. limit to the first 100 books | 7. paginate



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
    // req.query will have page, count, available: yes, query, user
    const { page, count } = req.query // Paginated
    const available = req.query.available == "true" ? false : null;
    const keyword = req.query.query ?
        {
            $or:
                [
                    { title: { $regex: req.query.query, $options: 'i' } },
                    { author: { $regex: req.query.query, $options: 'i' } },
                    { genre: { $regex: req.query.query, $options: 'i' } },
                    { langauge: { $regex: req.query.query, $options: 'i' } },
                ],
        } : {};

    const books = await Book.find(keyword)
        .find({ owner: { $ne: req.user._id }, available: { $ne: available } })
        .limit(count)
        .skip(count * (page - 1));

    res.send(books);
}

const getSingle = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        book ? res.json(book) : res.json({ message: "Book not found" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateSingle = async (req, res) => {
    // only logged in user can edit their own books, but this can't work with the current schema as any user can add reviews so this needs to be done on the client side
    const { available, review } = req.body; // sample review = { holder: "fsare9ucq9034cty82580ym438ntx0438", rating: 5, review: "This is a comment" }
    try {
        // if (req.body.owner != req.user._id) {
        //     res.status(403).json({ message: "You are not authorized to update this book" });
        // } else {
        if (review) {
            const book = await Book.findById(req.params.id);
            book.reviews.push(review);
            await book.save();
            res.json(book);
        }
        if (available) {
            const book = await Book.findById(req.params.id);
            book.available = available;
            await book.save();
            res.json(book);
        }
        // }
    } catch (error) {

    }
}

// only logged in user can delete their own books
const deleteSingle = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            res.status(404).json({ message: "Book not found" });
        } else {
            if (book.owner != req.user._id) {
                res.status(403).json({ message: "You are not authorized to delete this book" });
            } else {
                await Book.findByIdAndDelete(req.params.id);
                res.json({ message: "Book deleted" });
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