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
        className="w-full max-w-md card border border-[#2a2a2a] rounded-xl p-6 flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-2">
          <h2 className="text-lg  font-medium">Import Books</h2>

          <p className="text-sm">This backup contains {bookCount} books.</p>

          <p className="text-sm">How would you like to import them?</p>
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 btn-primary ">
            Cancel
          </button>

          <button onClick={onAdd} className="px-4 py-2 btn-primary">
            Add Books
          </button>

          <button onClick={onReplace} className="px-4 py-2 btn-secondary">
            Replace All
          </button>
        </div>
      </div>
    </div>
  );
}
