type ImportBooksModalProps = {
  onClose: () => void;
  onAdd: () => void;
  onReplace: () => void;
  bookCount: number;
};

export function ImportBooksModal({ onClose, onAdd, onReplace, bookCount }: ImportBooksModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-2">
          <h2 className="text-lg text-white font-medium">Import Books</h2>

          <p className="text-sm text-zinc-400">This backup contains {bookCount} books.</p>

          <p className="text-sm text-zinc-400">How would you like to import them?</p>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-zinc-800 text-white hover:bg-zinc-700 transition"
          >
            Cancel
          </button>

          <button
            onClick={onAdd}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-500 transition"
          >
            Add Books
          </button>

          <button
            onClick={onReplace}
            className="px-4 py-2 rounded-md bg-red-900 text-white hover:bg-red-800 transition"
          >
            Replace All
          </button>
        </div>
      </div>
    </div>
  );
}
