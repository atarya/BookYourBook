const asyncHandler = require("express-async-handler")
const Book = require("../models/Book")

const addBook = asyncHandler(async (req, res) => { })

const removeBook = asyncHandler(async (req, res) => { })

const searchBook = asyncHandler(async (req, res) => { })

const getBook = asyncHandler(async (req, res) => { })

const updateBook = asyncHandler(async (req, res) => { })

module.exports = { addBook, removeBook, searchBook, getBook, updateBook }