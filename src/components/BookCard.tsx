import { NavLink } from 'react-router';
import type { Book } from '../types/Book';
import { BookCover } from './BookCover';
import { StarRating } from './StarRating';

export function BookCard({ book }: { book: Book }) {
  const rating = book.rating ?? 0;

  return (
    <li className="flex flex-col bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] p-4 gap-2 hover:border-slate-600 hover:cursor-pointer transition duration-200">
      <NavLink to={`/books/${book.id}`}>
        <BookCover coverUrl={book.coverUrl} title={book.title} />

        {/* Book Details */}
        <div className="flex flex-col gap-5 mt-5">
          <div className="flex flex-col gap-2">
            <div> {book.title} </div>
            <div> {book?.author || 'Unknown'} </div>
          </div>

          <div className="flex justify-center">
            <StarRating rating={rating} />
          </div>
        </div>
      </NavLink>
    </li>
  );
}
