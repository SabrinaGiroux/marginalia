import type { Book } from '../types/Book';
import { db } from './db';

/**
 * EXPORT FUNCTIONS
 */
type ExportPayload = {
  version: number;
  exportedAt: string;
  data: {
    books: Book[];
  };
};

function formatDataForExport(books: Book[]): ExportPayload {
  return {
    version: 1,
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

  const payload = formatDataForExport(books);

  const filename = `marginalia-backup-${new Date().toISOString().split('T')[0]}.json`;

  downloadJSON(payload, filename);
}

/**
 * IMPORT FUNCTIONS
 */
function parseJson(json: string) {
  try {
    const parsed = JSON.parse(json);
    // TODO: validate parsed
    return parsed;
  } catch (error) {
    return { success: false, error: error };
  }
}

function validateExportPayload(json: string): boolean {
  // ensures that parsed json file is actually an export payload
  // check version, only version 1 supported for now

  return true;
}

export async function importBooks(json: string) {
  const payload = parseJson(json);
  const books: Book[] = payload.data.books;

  // remove ids so theres no conflicts in db
  const sanitizedBooks = books.map(({ id, ...fields }) => fields);

  // TODO: add them to db (either merge or replace)
}
