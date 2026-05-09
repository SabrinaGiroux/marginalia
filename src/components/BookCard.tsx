import { NavLink } from 'react-router';
import type { Book } from '../types/Book';
import { BookCover } from './BookCover';
import { StarRating } from './StarRating';

export function BookCard({ book }: { book: Book }) {
  const rating = book.rating ?? 0;

  return (
    <li className="flex flex-col h-full min-h-70 rounded-lg border border-[#2a2a2a] p-4 gap-3 hover:border-slate-600 hover:cursor-pointer transition duration-200">
      <NavLink to={`/books/${book.id}`} className="flex flex-col h-full">
        {/* Cover */}
        <BookCover coverUrl={book.coverUrl} title={book.title} />

        {/* Book Details */}
        <div className="flex flex-col justify-between items-center text-center flex-1 mt-4">
          {/* Title + Author */}
          <div className="flex flex-col gap-2">
            <div className="text-sm">{book.title}</div>

            <div className="text-xs text-gray-400 line-clamp-1">{book?.author || 'Unknown'}</div>
          </div>
          {/* Rating */}
          <div className="flex justify-center mt-3">
            <StarRating rating={rating} />
          </div>
        </div>
      </NavLink>
    </li>
  );
}
