import { generateBookCover } from './bookCovers';

export const updateBookCovers = (books: any[]) => {
  return books.map(book => ({
    ...book,
    cover: generateBookCover(book.title, book.id, book.category)
  }));
};