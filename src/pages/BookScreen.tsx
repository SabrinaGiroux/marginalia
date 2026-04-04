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

  useEffect(() => {
    const fetchBook = async () => {
      try {
        // Get book from the db by id
        const fetchedBook = await db.books.get(Number(id));
        setBook(fetchedBook);
      } catch (error) {
        console.error('Error fetching book:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!book) {
    return <p>Book not found!</p>;
  }

  return (
    <>
      <section className="flex flex-col lg:flex-row lg:h-[90vh]">
        <BookDetails book={book} />
        <NoteSection bookId={book.id} initialNote={book.note || ''} />
      </section>
    </>
  );
}
