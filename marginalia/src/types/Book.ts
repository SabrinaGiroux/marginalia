export type Shelf = 'reading' | 'read' | 'want-to-read'

export interface Book {
  id: number
  title: string
  author: string
  coverUrl?: string
  genre?: string
  rating?: number
  shelf: Shelf
  note: string
  dateAdded: Date
}