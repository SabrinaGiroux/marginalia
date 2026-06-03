import type { Book, Shelf } from '../types/Book';

export function filterBooks(books: Book[], query: string, shelf?: Shelf | null): Book[] {
  // query should be case insensitive
  const q = query.trim().toLowerCase();

  return books.filter((book) => {
    // when a shelf is selected, only show books on that shelf
    if (shelf && book.shelf !== shelf) return false;

    if (!q) return true;

    // filters by title, author, note
    return (
      book.title.toLowerCase().includes(q) ||
      book.author.toLowerCase().includes(q) ||
      (book.note?.toLowerCase().includes(q) ?? false)
    );
  });
}
