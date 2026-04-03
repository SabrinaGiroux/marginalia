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
        <div className="flex flex-col">
          <div> {book.title} </div>
          <div> {book?.author || 'Unknown'} </div>
          <StarRating rating={rating} />
        </div>
        {/* Book Details */}
        <div className="flex flex-col">
          <div> {book.title} </div>
          <div> {book?.author || 'Unknown'} </div>
          <div className="h-[14px] flex justify-center">
            {rating > 0 &&
              [1, 2, 3, 4, 5].map((n) => (
                <span
                  key={n}
                  className={`text-[11px] ${n <= rating ? 'text-[#c8a96e]' : 'text-[#3a3530]'}`}
                >
                  ★
                </span>
              ))}
          </div>
        </div>
      </NavLink>
    </li>
  );
}
