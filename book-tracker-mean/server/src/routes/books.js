const express = require('express');
const Book = require('../models/Book');

const router = express.Router();

function normalizePayload(body) {
  const pageCountNumber = Number(body.pageCount);
  const ratingNumber = Number(body.rating);

  return {
    title: String(body.title || '').trim(),
    author: String(body.author || '').trim(),
    genre: String(body.genre || '').trim(),
    pageCount:
      Number.isFinite(pageCountNumber) && pageCountNumber > 0
        ? pageCountNumber
        : null,
    status: body.status,
    rating:
      Number.isFinite(ratingNumber) && ratingNumber >= 0 ? ratingNumber : 0,
    notes: String(body.notes || '').trim(),
    startDate: body.startDate ? new Date(body.startDate) : null,
    finishDate: body.finishDate ? new Date(body.finishDate) : null,
    coverUrl: String(body.coverUrl || '').trim()
  };
}

router.get('/', async (req, res) => {
  try {
    const books = await Book.find().sort({ updatedAt: -1 });
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch books.', error });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found.' });
    }
    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch book.', error });
  }
});

router.post('/', async (req, res) => {
  try {
    const createdBook = await Book.create(normalizePayload(req.body));

    return res.status(201).json(createdBook);
  } catch (error) {
    return res.status(400).json({ message: 'Failed to create book.', error });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const payload = normalizePayload(req.body);
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      payload,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found.' });
    }

    return res.status(200).json(updatedBook);
  } catch (error) {
    return res.status(400).json({ message: 'Failed to update book.', error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found.' });
    }

    return res.status(200).json({ message: 'Book deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete book.', error });
  }
});

module.exports = router;
