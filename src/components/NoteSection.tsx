import { useState } from 'react';
import { db } from '../lib/db';

interface NoteSectionProps {
  bookId: number;
  initialNote: string;
}

export function NoteSection({ bookId, initialNote }: NoteSectionProps) {
  const [note, setNote] = useState(initialNote);

  const handleNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(event.target.value);
  };

  const saveNote = async () => {
    try {
      await db.books.update(bookId, { note });
      alert('Note updated successfully!');
    } catch (error) {
      console.error('Error saving note:', error);
      alert('Failed to update the note.');
    }
  };

  return (
    <section className="max-w-2xl w-full mx-auto">
      <div className="bg-[#1a1a1a] rounded-xl p-6 border border-slate-700 shadow-lg flex flex-col gap-4 h-full">
        {/* Title */}
        <h2 className="text-xl font-semibold text-slate-200">Notes</h2>

        {/* Textarea */}
        <textarea
          value={note}
          onChange={handleNoteChange}
          placeholder="Write your thoughts, quotes, or reflections..."
          className="w-full lg:h-full rounded-md bg-transparent px-4 py-3 text-sm leading-relaxed text-slate-200 placeholder:text-slate-500"
        />

        {/* Footer */}
        <div className="flex justify-end">
          <button
            onClick={saveNote}
            className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 transition active:scale-95"
          >
            Save Note
          </button>
        </div>
      </div>
    </section>
  );
}
