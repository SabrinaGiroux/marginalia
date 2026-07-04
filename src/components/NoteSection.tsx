import { useState, useEffect } from 'react';
import { db } from '../lib/db';
import type { Note } from '../types/Note';
import { ConfirmationModal } from './ConfirmationModal';
import { NoteEditor } from './NoteEditor';


interface NoteSectionProps {
  bookId: number;
}

export function NoteSection({ bookId }: NoteSectionProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteToDelete, setNoteToDelete] = useState<number | null>(null);

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
      alert('Note successfully updated!');
    } catch (error) {
      console.error('Error saving note:', error);
      alert('Failed to save note.');
    }
  };

  const deleteNote = async (id: number) => {
    await db.notes.delete(id);
    setNotes(notes.filter((n) => n.id !== id));
    setNoteToDelete(null);
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
          <NoteEditor
            value={note.content}
            onChange={(content) => updateContent(note.id, content)}
          />
        ))}
      </div>

      {noteToDelete !== null && (
        <ConfirmationModal
          title="Delete note?"
          message="This note will be permanently removed."
          confirmText="Delete"
          cancelText="Cancel"
          danger
          onConfirm={() => deleteNote(noteToDelete)}
          onCancel={() => setNoteToDelete(null)}
        />
      )}
    </section>
  );
}
