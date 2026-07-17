import { useState, useEffect } from 'react';
import { db, updateNote } from '../lib/db';
import type { Note } from '../types/Note';
import { ConfirmationModal } from './ConfirmationModal';
import { NoteEditor } from './NoteEditor';

interface NoteSectionProps {
  bookId: number;
}

export function NoteSection({ bookId }: NoteSectionProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteToDelete, setNoteToDelete] = useState<number | null>(null);
  const [showSavedToast, setShowSavedToast] = useState(false);

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
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, content } : n)));
  };

  const saveNote = async (id: number, content: string) => {
    try {
      await updateNote(id, content);
      setShowSavedToast(true);
      setTimeout(() => setShowSavedToast(false), 1500);
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
          <div key={note.id} className="flex flex-col gap-2">
            <NoteEditor
              value={note.content}
              onChange={(content) => updateContent(note.id, content)}
              onSave={() => saveNote(note.id, note.content)}
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setNoteToDelete(note.id)} className="btn-secondary text-sm">
                Delete Note
              </button>
              <button
                onClick={() => saveNote(note.id, note.content)}
                className="px-4 py-1 btn-primary text-sm active:scale-95"
              >
                Save
              </button>
            </div>
          </div>
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

      {showSavedToast && (
        <div className="fixed bottom-6 right-6 btn-primary px-4 py-2 rounded-lg shadow-lg text-sm">
          Saved!
        </div>
      )}
    </section>
  );
}
