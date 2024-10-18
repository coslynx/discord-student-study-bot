const { google } = require('googleapis');
const { GOOGLE_BOOKS_API_KEY } = require('../config/env.config');

const booksService = google.books('v1');

const searchBooks = async (query) => {
  try {
    const response = await booksService.volumes.list({
      q: query,
      key: GOOGLE_BOOKS_API_KEY,
    });

    const books = response.data.items.map(book => ({
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      description: book.volumeInfo.description,
      link: book.volumeInfo.infoLink,
    }));

    return books;
  } catch (error) {
    console.error('Error searching books:', error);
    throw error;
  }
};

module.exports = {
  searchBooks,
};