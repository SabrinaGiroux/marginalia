import { Dexie, type EntityTable } from "dexie"

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

const db = new Dexie("MarginaliaDB") as Dexie & {
  books: EntityTable<
    Book,
    "id" 
  >
}
/* Schema Declaration: 
* .stores only lists fields we want to query/filter by
*/
db.version(1).stores({
  books: "++id, title, author, shelf, dateAdded", 
})

export { db }
