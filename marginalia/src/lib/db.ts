import { Dexie, type EntityTable } from "dexie"
import type { Book } from "../types/Book"


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
