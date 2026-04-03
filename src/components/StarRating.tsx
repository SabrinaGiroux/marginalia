export function StarRating({ rating }: { rating: number }) {
  return (
    <div className="h-[14px] flex justify-center items-center">
      {rating > 0 ? (
        // If rating is greater than 0, display stars
        [1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            className={`text-[11px] ${n <= rating ? 'text-[#c8a96e]' : 'text-[#3a3530]'}`}
          >
            ★
          </span>
        ))
      ) : (
        // Display message if rating is null
        <span className="text-sm text-gray-500">Not Rated</span>
      )}
    </div>
  );
}
