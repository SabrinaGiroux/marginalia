import { useState } from 'react';
import { db } from '../lib/db';

interface NoteSectionProps {
  bookId: number;
  initialNote: string;
}

export function NoteSection({ bookId, initialNote }: NoteSectionProps) {
  const [note, setNote] = useState(initialNote);

  // Handle note change
  const handleNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(event.target.value);
  };

  // Save the updated note to the database
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
    <section className="gap-4 m-5 flex flex-col rounded-lg p-5 bg-gray-950 overflow-auto w-[50vw]">
      <h2 className="text-2xl font-semibold"> Notes </h2>

      {/* If the note is empty and not editing, show placeholder text */}
      <div className="text-sm leading-relaxed">
        <textarea
          value={note}
          onChange={handleNoteChange}
          className="w-full p-2 rounded-md min-h-[200px]"
          rows={6}
          placeholder="Add a note here..."
        />
      </div>

      {/* Save note button*/}
      <button
        onClick={saveNote}
        className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Save Note
      </button>
    </section>
  );
}
