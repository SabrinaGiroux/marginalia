import type { Book } from '../types/Book';

export function BookCard({ book }: { book: Book }) {
  const rating = book.rating ?? 0;

  return (
    <li className="flex flex-col bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] p-4 gap-2">
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
    </li>
  );
}
