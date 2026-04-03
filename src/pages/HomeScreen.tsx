import { BookList } from '../components/BookList';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../lib/db';

export function HomeScreen() {
  const books = useLiveQuery(() => db.books.toArray(), []);

  return (
    <>
      <section className="flex flex-col items-center justify-start py-10 gap-7">
        <h2 className="text-2xl text-gray-300"> Your Books </h2>
        <BookList books={books || []} />
      </section>
    </>
  );
}
