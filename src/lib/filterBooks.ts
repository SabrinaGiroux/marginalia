import type { Book } from '../types/Book';

export function filterBooks(books: Book[], query: string): Book[] {
  // query should be case insensitive
  const q = query.trim().toLowerCase();
  if (!q) return books;

  // filters by title, author, description
  return books.filter((book) => {
    return (
      book.title.toLowerCase().includes(q) ||
      book.author.toLowerCase().includes(q) ||
      (book.description?.toLowerCase().includes(q) ?? false)
    );
  });
}
