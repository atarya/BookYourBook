const Book = require('../models/book');
const fs = require('fs');

module.exports.create = async (req, res) => {

    console.log("req.fields", req.fields);
    console.log("req.files", req.files);
    try {
        let fields = req.fields;
        let files = req.files;

        let book = new Book(fields);
        // handle image
        if (files.image) {
            book.image.data = fs.readFileSync(files.image.path);
            book.image.contentType = files.image.type;
        }

        book.save((err, result) => {
            if (err) {
                console.log("saving book err => ", err);
                res.status(400).send("Error saving");
            }
            res.json(result);
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            err: err.message,
        });
    }
};
