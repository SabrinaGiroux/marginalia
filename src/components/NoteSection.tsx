import { useState, useEffect } from 'react';
import { db } from '../lib/db';
import type { Note } from '../types/Note';

interface NoteSectionProps {
  bookId: number;
}

export function NoteSection({ bookId }: NoteSectionProps) {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    db.notes
      .where('bookId')
      .equals(bookId)
      .toArray()
      .then((result) => setNotes(result.sort((a, b) => b.createdAt - a.createdAt)));
  }, [bookId]);

  const addNote = async () => {
    const now = Date.now();
    const id = await db.notes.add({ bookId, content: '', createdAt: now, updatedAt: now } as Note);
    setNotes([{ id, bookId, content: '', createdAt: now, updatedAt: now }, ...notes]);
  };

  const updateContent = (id: number, content: string) => {
    setNotes(notes.map((n) => (n.id === id ? { ...n, content } : n)));
  };

  const saveNote = async (id: number) => {
    const note = notes.find((n) => n.id === id);
    if (!note) return;
    try {
      await db.notes.update(id, { content: note.content, updatedAt: Date.now() });
    } catch (error) {
      console.error('Error saving note:', error);
      alert('Failed to save note.');
    }
  };

  const deleteNote = async (id: number) => {
    await db.notes.delete(id);
    setNotes(notes.filter((n) => n.id !== id));
  };

  return (
    <section className="lg:w-1/2 sm:h-[85vh] w-full mx-auto">
      <div className="card rounded-xl p-6 border border-slate-700 shadow-lg flex flex-col gap-4 h-full overflow-y-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold heading-2xl">Notes</h2>
          <button onClick={addNote} className="px-3 py-1 btn-primary text-sm active:scale-95">
            + New Note
          </button>
        </div>

        {notes.length === 0 && (
          <p className="text-sm text-slate-400">No notes yet. Add one to get started.</p>
        )}

        {notes.map((note) => (
          <div key={note.id} className="rounded-md border border-slate-700 p-3 flex flex-col gap-2">
            <textarea
              value={note.content}
              onChange={(e) => updateContent(note.id, e.target.value)}
              placeholder="Write your thoughts, quotes, or reflections..."
              className="w-full min-h-[100px] rounded-md bg-transparent px-3 py-2 text-sm leading-relaxed"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => deleteNote(note.id)} className="btn-secondary">
                Delete
              </button>
              <button onClick={() => saveNote(note.id)} className="px-4 py-1 btn-primary text-sm active:scale-95">
                Save
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}