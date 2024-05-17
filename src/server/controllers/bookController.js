const bookController = {};

bookController.findBook = async (req, res, next) => {
  try {
    const { queryString } = req.body;

    console.log('this is the query string', queryString);

    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = bookController;
