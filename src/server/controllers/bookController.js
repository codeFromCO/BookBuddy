const Book = require('../models/bookModel');

const bookController = {};

bookController.addBook = async (req, res, next) => {
  try {
    const { title, author, cover_i } = req.body;

    // check if book already exists
    const existingBook = await Book.find({
      title,
    });

    if (existingBook.length) {
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

    if (!books || books.length === 0) {
      return res.status(200).json({ message: 'There are no books', data: [] });
    }

    res.locals.books = books;

    return next();
  } catch (error) {
    return next({
      log: 'Error on bookController.findBooks',
      message: { error: error },
    });
  }
};

bookController.findBook = async (req, res, next) => {
  try {
    const { _id } = req.body;

    const book = await Book.findOne({ _id });

    res.locals.book = book;

    return next();
  } catch (error) {
    return next({
      log: 'Error on bookController.findBook',
      message: { error: error },
    });
  }
};

bookController.updateBook = async (req, res, next) => {
  try {
    const { _id, notes } = req.body;

    if (!_id || !notes) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const result = await Book.findOneAndUpdate(
      {
        _id,
      },
      {
        $set: { notes: notes },
      }
    );

    if (!result) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.locals.book = result;

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
    const { _id } = req.body;

    if (!_id) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const result = await Book.findOneAndDelete({
      _id,
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
