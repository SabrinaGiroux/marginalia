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
        className="w-full max-w-md card rounded-xl p-6 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="text-lg">Add Book</div>

        <AddBookForm form={form} onChange={handleChange} onSubmit={handleSubmit} />

        <button onClick={onClose} className="btn-primary">
          Cancel
        </button>
      </div>
    </div>
  );
}
