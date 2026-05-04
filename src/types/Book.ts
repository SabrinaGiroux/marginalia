export type Shelf = 'reading' | 'read' | 'want-to-read';

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
