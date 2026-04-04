import { useAddBookForm } from '../hooks/useAddBookForm';
import { AddBookForm } from './AddBookForm';

export function AddBookModal({ onClose }: { onClose: () => void }) {
  const { form, handleChange, handleSubmit } = useAddBookForm(onClose);

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      {/* Modal Card */}
      <div
        className="w-full max-w-md bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="text-lg text-white">Add Book</div>

        <AddBookForm form={form} onChange={handleChange} onSubmit={handleSubmit} />

        <button
          onClick={onClose}
          className="text-sm px-4 py-2 rounded-md bg-red-900 text-white hover:opacity-90 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
