import { BookList } from '../components/BookList';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../lib/db';

export function HomeScreen() {
  const books = useLiveQuery(() => db.books.toArray(), []);
  const isLoading = books === undefined;
  const error = books === null;

  return (
    <section className="flex flex-col items-center justify-start py-10 gap-7">
      {/* Header */}
      <div className="flex items-center gap-4">
        <h2 className="text-2xl text-gray-300">Your Books</h2>

        <button
          className="text-sm px-3 py-1 border border-[#3a3530] rounded-md text-gray-300 hover:border-[#c8a96e] transition"
          onClick={() => {}}
        >
          + Add New Book
        </button>
      </div>

      {isLoading && <p className="text-gray-400">Loading books...</p>}

      {error && <p className="text-red-400">Could not load books</p>}

      {!isLoading && !error && <BookList books={books || []} />}
    </section>
  );
}
