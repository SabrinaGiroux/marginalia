import type { Book } from '../types/Book';
import type { Note } from '../types/Note';
import { db } from './db';

type BookWithNotes = Book & { notes: Note[] };

/**
 * EXPORT FUNCTIONS
 */
type ExportPayload = {
  version: number;
  exportedAt: string;
  data: {
    books: BookWithNotes[];
  };
};

function formatDataForExport(books: BookWithNotes[]): ExportPayload {
  return {
    version: 2,
    exportedAt: new Date().toISOString(),
    data: { books },
  };
}

async function downloadJSON(data: ExportPayload, filename: string) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json',
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}

export async function exportBooks() {
  const books = await db.books.toArray();

  const booksWithNotes: BookWithNotes[] = await Promise.all(
    books.map(async (book) => {
      const notes = await db.notes.where('bookId').equals(book.id).toArray();
      return { ...book, notes };
    }),
  );

  const payload = formatDataForExport(booksWithNotes);

  const filename = `marginalia-backup-${new Date().toISOString().split('T')[0]}.json`;

  await downloadJSON(payload, filename);
}

/**
 * IMPORT FUNCTIONS
 */
export function parseAndValidate(json: string): ExportPayload {
  let parsed: unknown;

  try {
    // parse the provided json file
    parsed = JSON.parse(json);
  } catch {
    throw new Error('Invalid JSON Format');
  }

  // Validate parsed json's structure
  if (typeof parsed !== 'object' || parsed === null) {
    throw new Error('Invalid JSON structure');
  }

  // Check to make sure data + books structure is correct
  const obj = parsed as Record<string, unknown>;

  if (
    typeof obj.data !== 'object' ||
    obj.data === null ||
    !Array.isArray((obj.data as Record<string, unknown>).books)
  ) {
    throw new Error('Invalid data format');
  }

  return obj as unknown as ExportPayload;
}

export async function importBooks(json: string, replaceBooks: boolean) {
  const payload = parseAndValidate(json);
  const books = payload.data.books;

  await db.transaction('rw', db.books, db.notes, async () => {
    if (replaceBooks) {
      await db.books.clear();
      await db.notes.clear();
    }

    for (const { id, notes, note, ...bookFields } of books as (BookWithNotes & {
      note?: string;
    })[]) {
      // Remove ids to avoid primary key conflicts, then get the new id
      const newBookId = await db.books.add(bookFields as Book);

      // v1 have a single "note" string instead of a notes array
      if (note?.trim()) {
        const now = Date.now();
        await db.notes.add({
          bookId: newBookId,
          content: note,
          createdAt: now,
          updatedAt: now,
        } as Note);
      }

      // v2+ backups have a notes array
      for (const { id: noteId, bookId, ...noteFields } of notes ?? []) {
        await db.notes.add({ ...noteFields, bookId: newBookId } as Note);
      }
    }
  });
}
