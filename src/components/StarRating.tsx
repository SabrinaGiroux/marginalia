export function StarRating({
  rating,
  onChange,
}: {
  rating: number;
  onChange?: (value: number) => void;
}) {
  const isEditable = !!onChange;

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange?.(n)}
          className={`text-lg transition ${n <= rating ? 'text-[#c8a96e]' : 'text-[#3a3530]'} ${
            isEditable ? 'hover:scale-110 cursor-pointer' : 'cursor-default'
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
