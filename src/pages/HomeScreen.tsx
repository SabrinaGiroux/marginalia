import { BookList } from '../components/BookList';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../lib/db';
import { useMemo, useState } from 'react';
import { AddBookModal } from '../components/AddBookModal';
import { SearchBar } from '../components/SearchBar';
import { filterBooks } from '../lib/filterBooks';

export function HomeScreen() {
  const books = useLiveQuery(() => db.books.toArray(), []);
  const isLoading = books === undefined;
  const error = books === null;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBooks = useMemo(() => filterBooks(books || [], searchQuery), [books, searchQuery]);

  return (
    <section className="flex flex-col py-10 gap-7 max-w-5xl mx-auto px-4 w-full">
      {/* Header */}
      <div className="flex justify-between w-full">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl">Your Books</h2>

          <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
            + Add New Book
          </button>
        </div>
        <SearchBar onSearch={setSearchQuery} />
      </div>

      {/* Books / Loading / Error */}
      {isLoading && <p className="text-gray-400">Loading books...</p>}

      {error && <p className="text-red-400">Could not load books</p>}

      {!isLoading && !error && (
        <BookList books={filteredBooks || []} onAddBook={() => setIsModalOpen(true)} />
      )}

      {/* Modal */}
      {isModalOpen && <AddBookModal onClose={() => setIsModalOpen(false)} />}
    </section>
  );
}
