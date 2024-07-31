import { bookSearchAPI, API_URL } from '../utils/constants';

// fetch existing books
export const fetchBooks = async () => {
  try {
    const response = await fetch(`${API_URL}/findAll`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const jsonData = await response.json();

    // handle error
    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }

    // handle event that request was successful but there are no saved books
    if (!jsonData.data || jsonData.data.length === 0) {
      return [];
    }

    return jsonData.data;
  } catch (error) {
    throw new Error('Error fetching books');
  }
};

// search books by input
export const searchBooksByInput = async (input, existingBooks) => {
  try {
    const searchString = input.replace(/ /g, '+');

    const response = await fetch(bookSearchAPI(searchString));

    const allData = await response.json();

    // books data is returned in docs property
    const docs = allData.docs;

    // create object to check for title of existing book
    const existingBooksLookup = {};

    //
    if (existingBooks) {
      for (let i = 0; i < existingBooks.length; i++) {
        existingBooksLookup[existingBooks[i].title] = existingBooks[i].author;
      }
    }

    // check through docs array until find 6 elements that contain author_name and title OR docs array is empty; add these to a new array to return
    const arrayToReturn = docs
      .filter((doc) => doc.title && doc.author_name)
      .slice(0, 6)
      .map((doc) => ({
        ...doc,
        alreadyExists: existingBooksLookup[doc.title] === doc.author_name[0],
      }));

    return arrayToReturn;
  } catch (error) {
    throw new Error('Error searching books');
  }
};

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
    throw new Error('Error adding book');
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
    throw new Error('Error updating book notes');
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
    throw new Error('Error deleting book');
  }
};
