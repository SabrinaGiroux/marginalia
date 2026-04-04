import type { Book, Shelf } from '../types/Book';

export function AddBookForm({
  form,
  onChange,
  onSubmit,
}: {
  form: Omit<Book, 'id'>;
  onChange: (key: keyof typeof form, value: unknown) => void;
  onSubmit: () => void;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="flex flex-col gap-3 text-sm"
    >
      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) => onChange('title', e.target.value)}
        className="bg-[#121212] border border-[#2a2a2a] rounded-md p-2 text-white outline-none focus:border-[#c8a96e]"
      />
      <input
        placeholder="Author"
        value={form.author}
        onChange={(e) => onChange('author', e.target.value)}
        className="bg-[#121212] border border-[#2a2a2a] rounded-md p-2 text-white outline-none focus:border-[#c8a96e]"
      />
      <input
        placeholder="Cover URL (optional)"
        value={form.coverUrl}
        onChange={(e) => onChange('coverUrl', e.target.value)}
        className="bg-[#121212] border border-[#2a2a2a] rounded-md p-2 text-white outline-none focus:border-[#c8a96e]"
      />
      <input
        placeholder="Genre (optional)"
        value={form.genre}
        onChange={(e) => onChange('genre', e.target.value)}
        className="bg-[#121212] border border-[#2a2a2a] rounded-md p-2 text-white outline-none focus:border-[#c8a96e]"
      />
      {/* Shelf */}
      <select
        value={form.shelf}
        onChange={(e) => onChange('shelf', e.target.value as Shelf)}
        className="bg-[#121212] border border-[#2a2a2a] rounded-md p-2 text-white outline-none focus:border-[#c8a96e]"
      >
        <option value="reading">Reading</option> <option value="read">Read</option>
        <option value="want-to-read">Want to Read</option>
      </select>
      {/* Rating **/}
      <select
        value={form.rating ?? ''}
        onChange={(e) => onChange('rating', e.target.value ? Number(e.target.value) : null)}
        className="bg-[#121212] border border-[#2a2a2a] rounded-md p-2 text-white outline-none focus:border-[#c8a96e]"
      >
        <option value="">No rating</option>
        {[1, 2, 3, 4, 5].map((r) => (
          <option key={r} value={r}>
            {r} ★
          </option>
        ))}
      </select>

      {/* Description */}
      <textarea
        placeholder="Description..."
        value={form.description}
        onChange={(e) => onChange('description', e.target.value)}
        className="bg-[#121212] border border-[#2a2a2a] rounded-md p-2 text-white outline-none focus:border-[#c8a96e] resize-none"
        rows={3}
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="text-sm px-4 py-2 rounded-md bg-[#c8a96e] text-black hover:opacity-90 transition"
      >
        Add
      </button>
    </form>
  );
}
