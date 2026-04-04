import type { Book } from '../types/Book';
import { BookCover } from './BookCover';
import { StarRating } from './StarRating';

export function BookDetails({ book }: { book: Book }) {
  return (
    <section className="flex flex-col gap-2 m-5 lg:w-[50vw]">
      <BookCover coverUrl={book.coverUrl} title={book.title} />

      {/** Book Fields */}
      <section className="flex flex-col gap-4 border-slate-500 border-1 p-2">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-bold">{book.title}</h3>
          <p className="font-semibold text-slate-400">{book.author}</p>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <p> Shelf </p>
            <p> {book.shelf}</p>
          </div>

          <div className="flex justify-between">
            <p> Rating:</p>
            <StarRating rating={book.rating ?? 0} />
          </div>

          <div className="flex justify-between">
            <p> Genre </p>
            <p> {book.genre}</p>
          </div>

          <div className="flex justify-between">
            <p> Added </p>
            <p>
              {book.dateAdded !== undefined
                ? new Date(book.dateAdded).toLocaleString()
                : 'No date available'}
            </p>
          </div>
        </div>
      </section>
    </section>
  );
}
