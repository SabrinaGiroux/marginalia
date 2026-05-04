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

async function downloadJSON(data: unknown, filename: string) {
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
