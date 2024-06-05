const Book = require('../models/bookModel');

const bookController = {};

bookController.addBook = async (req, res, next) => {
  try {
    const { title, author, cover_i } = req.body;

    // check if book already exists
    const existingBook = await Book.find({
      title,
    });

    if (existingBook) {
      return res.status(400).json({ message: 'Book already exists' });
    }

    await Book.create({
      title,
      author,
      cover_i,
    });

    return next();
  } catch (err) {
    return next({
      log: 'Error on bookController.addBook',
      message: { error: err },
    });
  }
};

bookController.findBooks = async (req, res, next) => {
  try {
    const books = await Book.find({});

    if (!books) {
      return res.status(400).json({ message: 'There are no books' });
    }

    return next();
  } catch (error) {
    return next({
      log: 'Error on bookController.findBooks',
      message: { error: err },
    });
  }
};

bookController.updateBook = async (req, res, next) => {
  try {
    const { title, author, notes } = req.body;

    if ((!title, author, notes)) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const result = await Book.findOneAndUpdate(
      {
        title,
        author,
      },
      {
        $set: notes,
      }
    );

    return next();
  } catch (err) {
    return next({
      log: 'Error on bookController.updateBook',
      message: { error: err },
    });
  }
};

bookController.deleteBook = async (req, res, next) => {
  try {
    const { title, author } = req.body;

    if ((!title, author)) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const result = await Book.findOneAndDelete({
      title,
      author,
    });

    if (result) {
      return next();
    } else {
      return res.status(400).json({ message: 'Book does not exist' });
    }
  } catch (err) {
    return next({
      log: 'Error on bookController.deleteBook',
      message: { error: err },
    });
  }
};

module.exports = bookController;
