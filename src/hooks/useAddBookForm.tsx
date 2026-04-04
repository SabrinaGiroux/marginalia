import { useState } from 'react';
import { db } from '../lib/db';
import type { Book } from '../types/Book';

export function useAddBookForm(onClose: () => void) {
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

  return { form, handleChange, handleSubmit };
}
