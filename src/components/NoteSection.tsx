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
    <section className="lg:w-1/2 sm:h-[85vh] w-full mx-auto">
      <div className="card rounded-xl p-6 border border-slate-700 shadow-lg flex flex-col gap-4 h-full">
        {/* Title */}
        <h2 className="text-xl font-semibold heading-2xl">Notes</h2>

        {/* Textarea */}
        <textarea
          value={note}
          onChange={handleNoteChange}
          placeholder="Write your thoughts, quotes, or reflections..."
          className="w-full lg:h-full sm:h-full rounded-md bg-transparent px-4 py-3 text-sm leading-relaxed"
        />

        {/* Footer */}
        <div className="flex justify-end">
          <button onClick={saveNote} className="px-5 py-2 btn-primary transition active:scale-95">
            Save Note
          </button>
        </div>
      </div>
    </section>
  );
}
