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
function parseAndValidate(json: string): ExportPayload {
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

export async function importBooks(json: string) {
  const result = parseAndValidate(json);

  const books = result.data.data.books;

  // remove ids so theres no conflicts in db
  const sanitizedBooks = books.map(({ id, ...fields }) => fields);

  // TODO: add them to db (either merge or replace)
}
