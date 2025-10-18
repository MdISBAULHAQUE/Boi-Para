import { useState, useMemo } from 'react';
import { Book } from '@/contexts/CartContext';

export const useSearch = (books: Book[]) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBooks = useMemo(() => {
    if (!searchQuery.trim()) return books;
    
    const query = searchQuery.toLowerCase();
    return books.filter(book =>
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.category.toLowerCase().includes(query) ||
      book.description.toLowerCase().includes(query)
    );
  }, [books, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredBooks,
  };
};