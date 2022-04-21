const asyncHandler = require("express-async-handler")
const Book = require("../models/Book")

const addBook = asyncHandler(async (req, res) => {
    // router.route("/").post(protect, addBook);

})

const removeBook = asyncHandler(async (req, res) => {
    // router.route("/").delete(protect, removeBook);

})

const searchBook = asyncHandler(async (req, res) => {
    // router.route("/").get(protect, searchBook);

})

const getBook = asyncHandler(async (req, res) => {
    // router.route("/:id").get(protect, getBook);

})

const updateBook = asyncHandler(async (req, res) => {
    // router.route("/:id").put(protect, updateBook);

})

module.exports = { addBook, removeBook, searchBook, getBook, updateBook }