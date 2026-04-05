import type { Book, Shelf } from '../types/Book';
import { BookCover } from './BookCover';
import { StarRating } from './StarRating';
import { db } from '../lib/db';
import { useNavigate } from 'react-router';
import { useState } from 'react';

export function BookDetails({ book }: { book: Book }) {
  const navigate = useNavigate();
  const [coverUrl, setCoverUrl] = useState(book.coverUrl);
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [shelf, setShelf] = useState(book.shelf);
  const [rating, setRating] = useState(book.rating ?? 0);
  const [genre, setGenre] = useState(book.genre);

  const handleDelete = async () => {
    const confirmed = window.confirm(`Are you sure you want to delete "${book.title}"?`);
    if (!confirmed) return;

    try {
      await db.books.delete(book.id);
      alert(`Deleted "${book.title}" successfully!`);
      navigate('/');
    } catch (error) {
      console.error('Error deleting book:', error);
      alert('Failed to delete the book.');
    }
  };

  const handleUpdate = async () => {
    try {
      await db.books.update(book.id, {
        title,
        author,
        shelf,
        rating,
        genre,
        coverUrl,
      });
      alert('Book details updated successfully!');
    } catch (error) {
      console.error('Error updating book details:', error);
      alert('Failed to update the book.');
    }
  };

  return (
    <section className="max-w-4xl mx-auto p-1 flex flex-col gap-6">
      <BookCover coverUrl={coverUrl} title={title} />

      {/* Book Fields Section */}
      <div className="bg-[#1a1a1a] rounded-lg p-2 border border-slate-700">
        <div className="grid grid-cols-[120px_1fr] gap-y-2 gap-x-4 items-center">
          {/* Title */}
          <label className="text-sm text-slate-400">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-md bg-transparent border border-slate-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Author */}
          <label className="text-sm text-slate-400">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full rounded-md bg-transparent border border-slate-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Shelf */}
          <label className="text-sm text-slate-400">Shelf</label>
          <select
            value={shelf}
            onChange={(e) => setShelf(e.target.value as Shelf)}
            className="w-full bg-transparent border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="reading">Reading</option>
            <option value="read">Read</option>
            <option value="want-to-read">Want to Read</option>
          </select>

          {/* Rating */}
          <label className="text-sm text-slate-400">Rating</label>
          <div>
            <StarRating rating={rating} />
          </div>

          {/* Genre */}
          <label className="text-sm text-slate-400">Genre</label>
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="w-full rounded-md bg-transparent border border-slate-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Cover URL */}
          <label className="text-sm text-slate-400">Cover URL</label>
          <input
            type="url"
            value={coverUrl}
            onChange={(e) => setCoverUrl(e.target.value)}
            className="w-full rounded-md bg-transparent border border-slate-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handleUpdate}
            className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 transition"
          >
            Save Changes
          </button>
          <button
            onClick={handleDelete}
            className="px-5 py-2 bg-red-700 text-white rounded-md hover:bg-red-600 transition"
          >
            Delete Book
          </button>
        </div>
      </div>
    </section>
  );
}
