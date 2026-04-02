import type { Book } from '../types/Book';

export function BookCard({ book }: { book: Book }) {
  const rating = book.rating ?? 0;

  return (
    <li>
      {/* Book Cover */}
      {book.coverUrl ? (
        <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover block" />
      ) : (
        <div className="w-full h-full flex items-center justify-center p-4">
          <span className="font-[Playfair_Display] text-[13px] text-[#6b6560] text-center leading-[1.4]">
            {book.title}
          </span>
        </div>
      )}

      {/* Book Details */}
      <div>
        <div> {book.title} </div>
        <div> {book?.author || 'Unknown'} </div>
        {rating > 0 && (
          <div className="mt-8 flex gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <span
                key={n}
                className={`text-[11px] ${n <= rating ? 'text-[#c8a96e]' : 'text-[#3a3530]'}`}
              >
                ★
              </span>
            ))}
          </div>
        )}
      </div>
    </li>
  );
}
