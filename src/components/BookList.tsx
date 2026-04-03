import type { Book } from '../types/Book';
import { useState } from 'react';
import { AddBookCard } from './AddBookCard';
import { BookCard } from './BookCard';
import { AddBookModal } from './AddBookModal';

export function BookList({ books }: { books: Book[] }) {
  const [isModalOpen, showModal] = useState(false);

  return (
    <>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto px-4">
        {books.map((book) => {
          return <BookCard book={book} />;
        })}
        <AddBookCard onClick={() => showModal(true)} />
      </ul>

      {isModalOpen && <AddBookModal onClose={() => showModal(false)} />}
    </>
  );
}
