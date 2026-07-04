import { Dexie, type EntityTable } from 'dexie';
import type { Book } from '../types/Book';
import type { Note } from '../types/Note';

const db = new Dexie('MarginaliaDB') as Dexie & {
  books: EntityTable<Book, 'id'>;
  notes: EntityTable<Note, 'id'>;
};
/* Schema Declaration:
 * .stores only lists fields we want to query/filter by
 */
db.version(1).stores({
  books: '++id, title, author, shelf, dateAdded',
});

db.version(2)
  .stores({
    books: '++id, title, author, shelf, dateAdded',
    notes: '++id, bookId, createdAt',
  })
  .upgrade(async (tx) => {
    // Move any existing single note into its own record
    const books = await tx.table('books').toArray();
    for (const book of books) {
      if (book.note?.trim()) {
        const now = Date.now();
        await tx.table('notes').add({
          bookId: book.id,
          content: book.note,
          createdAt: now,
          updatedAt: now,
        });
      }
    }
  });

export { db };
