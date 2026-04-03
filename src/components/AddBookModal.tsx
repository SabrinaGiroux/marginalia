import { useState } from 'react';
import { db } from '../lib/db';
import type { Book } from '../types/Book';
import { AddBookForm } from './AddBookForm';

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

        <AddBookForm form={form}
          onChange={handleChange} onSubmit={handleSubmit}/>
      </div>
    </div>
  );
}
