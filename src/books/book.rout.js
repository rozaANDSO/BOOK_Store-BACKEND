const express = require('express');
const Book = require('./book.model');
const postABook=require("../books/book.controller")
const getAllBooks = require('../books/book.controller');
const getSingleBook = require('../books/book.controller');
const UpdateBook = require('../books/book.controller');
const deleteABook = require('../books/book.controller');
const verifyAdminToken = require('../middleware/verifyAdmin');
const router =  express.Router();

// frontend => backend server => controller => book schema  => database => send to server => back to the frontend
//post = when submit something fronted to db
// get =  when get something back from db
// put/patch = when edit or update something
// delete = when delete something

// post a book
router.post("/create-book", verifyAdminToken,postABook);

// get all books
router.get("/", getAllBooks);

// single book endpoint
router.get("/:id", getSingleBook);

// update a book endpoint
router.put("/edit/:id", verifyAdminToken, UpdateBook);

router.delete("/:id", verifyAdminToken, deleteABook)


module.exports = router;