export type Shelf = 'reading' | 'read' | 'want-to-read';

export interface Book {
  id: number;
  title: string;
  author: string;
  coverUrl?: string;
  genre?: string;
  rating: number | null;
  shelf: Shelf;
  note: string;
}
