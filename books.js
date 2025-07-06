const express = require('express');
const router = express.Router();
const Book = require('../models/bookSchema');

// View all books
router.get('/', async (req, res) => {
  const books = await Book.find();
  res.render('books/index', {books});
});

// Show form to create a new book
router.get('/new', (req, res) => {
  res.render('books/addBook');
});

// Create a new book
router.post('/', async (req, res) => {
  try {
    await Book.create(req.body);
    res.redirect('/books');
  } catch(err) {
    res.status(400).send(err);
  }
});

// Show book details
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.render('books/showBook', { book });
  } catch (err) {
    console.error(err);
    res.status(404).send("Book not found");
  }
});

// Show form to edit a book
router.get('/:id/edit', async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.render('books/updateBook', { book });
});

// Update book
router.put('/:id', async (req, res) => {
  try {
    await Book.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/books');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Show confirmation to delete
router.get('/:id/delete', async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.render('books/deleteBook', { book });
});

// Delete book
router.delete('/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.redirect('/books');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;