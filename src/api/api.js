import { bookSearchAPI, API_URL } from '../utils/constants';

// fetch existing books
export const fetchBooks = async () => {
  try {
    const response = await fetch(`${API_URL}/findAll`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const jsonData = await response.json();

    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }

    if (!jsonData.data || jsonData.data.length === 0) {
      throw new Error('No books found');
    }

    return jsonData.data;
  } catch (error) {
    console.error('Error fetching books', error);
    throw error;
  }
};

// search books by input
export const searchBooksByInput = async (input, existingBooks) => {
  try {
    const searchString = input.replace(/ /g, '+');

    const response = await fetch(`${bookSearchAPI}${searchString}`);

    const allData = await response.json();

    // books data is returned in docs property
    const docs = allData.docs;

    console.log('this was the search data', docs);

    // create object to check for title of existing book
    const existingBooksLookup = {};
    for (let i = 0; i < existingBooks.length; i++) {
      existingBooksLookup[existingBooks[i].title] = true;
    }

    console.log('here are the existing books', existingBooksLookup);

    // iterate through docs array until find 6 elements that contain author_name and title OR docs array is empty; add these to a new array to return
    const arrayToReturn = [];

    // sometimes author is [], sometimes not
    for (let i = 0; i < docs.length && arrayToReturn.length < 6; i++) {
      console.log('this is the doc', docs[i]);
      if (
        docs[i].hasOwnProperty('title') &&
        docs[i].hasOwnProperty('author_name')
      ) {
        const book = {
          ...docs[i],
        };

        if (existingBooksLookup[docs[i].title]) {
          book.alreadyExists = true;
        }

        arrayToReturn.push(book);
      }
    }

    return arrayToReturn;
  } catch (error) {
    console.error('Error searching books:', error);
    throw error;
  }
};

// NEED TO HANDLE IF THE BOOK ALREADY EXISTS IN DATABASE
// add a new book
export const addBook = async (book) => {
  try {
    const response = await fetch(`${API_URL}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`${response.status}: ${errorData.message}`);
    }
    const jsonData = await response.json();

    return jsonData;
  } catch (error) {
    throw error;
  }
};

// update books notes
export const updateBookNotes = async ({ _id, notes }) => {
  try {
    const response = await fetch(`${API_URL}/update`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id, notes }),
    });

    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error('Error updating book notes:', error);
    throw error;
  }
};

// delete a book
export const deleteBook = async ({ _id }) => {
  try {
    const response = await fetch(`${API_URL}/delete`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id }),
    });

    const jsonData = await response.json();
    return jsonData.data;
  } catch (error) {
    console.error('Error deleting book:', error);
    throw error;
  }
};
