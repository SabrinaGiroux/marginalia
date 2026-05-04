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
  // try catch, make sure file provided is json
}

function isExportPayload(json: string): boolean {
  // ensures that parsed json file is actually an export payload
  // check version, only version 1 supported for now

  return true;
}

export async function importBooks(json: string) {
  // get payload by parsing json
  // remove ids so theres no conflicts
  // add them to db (currently just merge)
}
