import { useParams } from 'react-router';
import { BookDetails } from '../components/BookDetails';
import { db } from '../lib/db';
import { useState, useEffect } from 'react';
import type { Book } from '../types/Book';
import { NoteSection } from '../components/NoteSection';

export function BookScreen() {
  const { id } = useParams();

  const [book, setBook] = useState<Book | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        if (!id) throw new Error('Missing book id');

        const fetchedBook = await db.books.get(Number(id));

        if (!fetchedBook) {
          setError('Book not found.');
        } else {
          setBook(fetchedBook);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load book.');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return <p className="text-gray-400 p-5">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-400 p-5">{error}</p>;
  }

  return (
    <section className="flex flex-col lg:flex-row lg:h-[85vh] p-5 gap-5">
      <BookDetails book={book!} />
      <NoteSection bookId={book!.id} initialNote={book!.note || ''} />
    </section>
  );
}
