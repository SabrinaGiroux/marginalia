import type { Book } from '../types/Book';
import { AddBookCard } from './AddBookCard';
import { BookCard } from './BookCard';

export function BookList({ books }: { books: Book[] }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto px-4">
      {books.map((book) => {
        return <BookCard book={book} />;
      })}
      <AddBookCard/>
    </ul>
  );
}
