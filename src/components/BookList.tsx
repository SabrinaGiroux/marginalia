import type { Book } from '../types/Book';
import { AddBookCard } from './AddBookCard';
import { BookCard } from './BookCard';

export function BookList({ books, onAddBook }: { books: Book[]; onAddBook?: () => void }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 auto-rows-fr">
      {books.map((book) => (
        <div className="card" key={book.id}>
          <BookCard book={book} />
        </div>
      ))}

      {onAddBook && <AddBookCard onClick={onAddBook} />}
    </ul>
  );
}
