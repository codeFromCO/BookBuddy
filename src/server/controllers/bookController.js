const bookController = {};

bookController.findBook = async (req, res, next) => {
  try {
    const { queryString } = req.body;

    console.log('this is the query string', queryString);

    // sample open library search
    //openlibrary.org/search.json?q=the+lord+of+the+rings

    //remove spaces from search string and replace with +
    // let searchString = searchInut.replace(/ /g, '+');

    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = bookController;
