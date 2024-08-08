export const bookSearchAPI = (name) => {
  return `https://openlibrary.org/search.json?q=${name}&limit=10`;
};

export const bookcoverAPI = 'https://covers.openlibrary.org/b/id/';

export const API_URL = '/api/book';
