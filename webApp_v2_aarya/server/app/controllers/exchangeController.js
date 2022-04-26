const Exchange = require('../models/Exchange');
const Book = require('../models/Book');
const Membership = require('../models/Membership');

const initialize = async (req, res) => {
    const { book_id } = req.params;
    const book = await Book.findOne({ _id: book_id });
    const owner_membership = await Membership.find({ user: book.owner });
    const owner_active = owner_membership.expiry > new Date() ? true : false;
    try {
        if (book.available && owner_active) {
            const exchange = new Exchange({
                book_id: book_id,
                borrower: req.user._id,
                lender: book.owner
            });
            await exchange.save();
            res.status(200).json({
                message: 'Exchange initialized successfully',
                exchange
            })
        } else {
            res.status(500).json({
                message: 'Book is not available',
            })
        }
    } catch (err) {
        res.status(500).json({
            message: 'Error occured while initializing exchange',
            error: err
        })
    }
}

const getBorrowed = async (req, res) => {
    const { count, page } = req.query;
    try {
        const exchanges = await Exchange.find({ borrower: req.user._id })
            .sort({ updatedAt: -1 })
            .limit(count)
            .skip(count * (page - 1));

        res.status(200).json(exchanges, pages = Math.ceil(exchanges.length / count));

    } catch (err) {
        res.status(500).json({
            message: 'Error occured while getting borrowed books',
            error: err
        })
    }
}

const getLent = async (req, res) => {
    const { count, page } = req.query;
    try {
        const exchanges = await Exchange.find({ lender: req.user._id })
            .sort({ updatedAt: -1 })
            .limit(count)
            .skip(count * (page - 1));

        res.status(200).json(exchanges, pages = Math.ceil(exchanges.length / count));

    } catch (err) {
        res.status(500).json({
            message: 'Error occured while getting borrowed books',
            error: err
        })
    }
}

const updateExchange = async (req, res) => {
    const { status } = req.query;
    try {
        const exchange = await Exchange.findOne({ _id: req.params.book_id });
        const book = await Book.findOne({ _id: exchange.book_id });

        if (status === 'approved' && exchange.status === 'requested' && exchange.lender.toString() === req.user._id.toString() && book.owner.toString() === exchange.lender.toString() && book.available) {
            exchange.status = status;
            exchange.borrow_date = new Date();
            exchange.return_date = new Date(new Date().setDate(new Date().getDate() + 10));
            await exchange.save();

            book.available = false;
            await book.save();

            res.status(200).json({
                message: 'Exchange approved successfully',
                exchange
            })
        } else if (status === 'rejected' && exchange.status === 'requested' && exchange.lender.toString() === req.user._id.toString()) {
            exchange.status = status;
            await exchange.save();
            res.status(200).json({
                message: 'Exchange rejected successfully',
                exchange
            })
        } else if (status === 'returned' && exchange.status === 'approved' && exchange.lender.toString() === req.user._id.toString()) {
            exchange.status = status;
            exchange.return_date = new Date();
            await exchange.save();

            book.available = true;
            book.count = book.count + 1;
            await book.save();

            res.status(200).json({
                message: 'Exchange returned successfully',
                exchange
            })
        } else {
            res.status(500).json({
                message: 'Invalid status',
            })
        }
    } catch (err) {
        res.status(500).json({
            message: 'Error occured while updating exchange',
            error: err
        })
    }
}

module.exports = { initialize, updateExchange, getLent, getBorrowed }