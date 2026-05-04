import type { Book } from '../types/Book';

function formatDataForExport(books: Book[]) {
  const payload = {
    version: 1,
    exportedAt: new Date().toISOString(),
    data: {
      books,
    },
  };

  return payload;
}
