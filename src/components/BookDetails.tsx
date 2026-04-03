import type { Book } from '../types/Book';
import { BookCover } from './BookCover';

export function BookDetails({ book }: { book: Book }) {
  return (
    <section className="flex flex-col gap-2 m-5">
      <BookCover coverUrl={book.coverUrl} title={book.title} />

      {/** Book Fields */}
      <section>
        <div>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
        </div>

        <div>
          <p> Shelf: {book.shelf}</p>
          <p> Rating: {book.rating}</p>
          <p> Genre: {book.genre} </p>
          <p> Added: {book.dateAdded} </p>
        </div>
      </section>
    </section>
  );
}
