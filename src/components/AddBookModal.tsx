import { useState } from 'react';
import { db } from '../lib/db'
import type { Book, Shelf } from '../types/Book';

export function AddBookModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<Omit<Book, 'id'>>({
    title: '',
    author: '',
    coverUrl: '',
    genre: '',
    rating: null,
    shelf: 'want-to-read',
    description: '',
  });

  const handleChange = (key: keyof typeof form, value: unknown) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    await db.books.add({
        ...form,
        author: form.author.trim() || 'Unknown',
        dateAdded: Date.now(),
    });

  onClose();
};

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
      
      {/* Modal Card */}
      <div className="w-full max-w-md bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 flex flex-col gap-4">
        
        {/* Header */}
        <div className="text-lg text-white">Add Book</div>

        {/* Inputs */}
        <div className="flex flex-col gap-3 text-sm">
          
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="bg-[#121212] border border-[#2a2a2a] rounded-md p-2 text-white outline-none focus:border-[#c8a96e]"
          />

          <input
            placeholder="Author"
            value={form.author}
            onChange={(e) => handleChange('author', e.target.value)}
            className="bg-[#121212] border border-[#2a2a2a] rounded-md p-2 text-white outline-none focus:border-[#c8a96e]"
          />

          <input
            placeholder="Cover URL (optional)"
            value={form.coverUrl}
            onChange={(e) => handleChange('coverUrl', e.target.value)}
            className="bg-[#121212] border border-[#2a2a2a] rounded-md p-2 text-white outline-none focus:border-[#c8a96e]"
          />

          <input
            placeholder="Genre (optional)"
            value={form.genre}
            onChange={(e) => handleChange('genre', e.target.value)}
            className="bg-[#121212] border border-[#2a2a2a] rounded-md p-2 text-white outline-none focus:border-[#c8a96e]"
          />

          {/* Shelf */}
          <select
            value={form.shelf}
            onChange={(e) => handleChange('shelf', e.target.value as Shelf)}
            className="bg-[#121212] border border-[#2a2a2a] rounded-md p-2 text-white outline-none focus:border-[#c8a96e]"
          >
            <option value="reading">Reading</option>
            <option value="read">Read</option>
            <option value="want-to-read">Want to Read</option>
          </select>

          {/* Rating **/}
          <select
            value={form.rating ?? ''}
            onChange={(e) =>
              handleChange('rating', e.target.value ? Number(e.target.value) : null)
            }
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
            onChange={(e) => handleChange('description', e.target.value)}
            className="bg-[#121212] border border-[#2a2a2a] rounded-md p-2 text-white outline-none focus:border-[#c8a96e] resize-none"
            rows={3}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={onClose}
            className="text-sm text-[#6b6560] hover:text-white transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="text-sm px-4 py-2 rounded-md bg-[#c8a96e] text-black hover:opacity-90 transition"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}