import { BookList } from '../components/BookList';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../lib/db';
import { useState } from 'react';
import { AddBookModal } from '../components/AddBookModal';

export function HomeScreen() {
  const books = useLiveQuery(() => db.books.toArray(), []);
  const isLoading = books === undefined;
  const error = books === null;

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="flex flex-col items-center justify-start py-10 gap-7">
      {/* Header */}
      <div className="flex items-center gap-4">
        <h2 className="text-2xl">Your Books</h2>

        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          + Add New Book
        </button>
      </div>

      {/* Books / Loading / Error */}
      {isLoading && <p className="text-gray-400">Loading books...</p>}

      {error && <p className="text-red-400">Could not load books</p>}

      {!isLoading && !error && (
        <BookList books={books || []} onAddBook={() => setIsModalOpen(true)} />
      )}

      {/* Modal */}
      {isModalOpen && <AddBookModal onClose={() => setIsModalOpen(false)} />}
    </section>
  );
}
