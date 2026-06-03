// currently we have a fixed number of shelves, but eventually
// I might add this to the db so you can create your own shelves
export const SHELVES = ['reading', 'read', 'want-to-read'];

export type Shelf = (typeof SHELVES)[number];

export interface Book {
  id: number;
  isbn?: string;
  title: string;
  author: string;
  coverUrl?: string;
  yearPublished?: number;
  genre?: string;
  rating: number | null;
  shelf: Shelf;
  description: string;
  note?: string;
  dateAdded?: number;
}
