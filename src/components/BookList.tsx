import type { Book } from "../types/Book";
import { BookCard } from "./BookCard";

export function BookList(books : Book[]) {
  return (
    <ul className="grid [grid-template-columns:repeat(auto-fill,minmax(150px,1fr))] gap-5">
        {books.map(book=> {
            return <BookCard book={book}/>
        })}
    </ul>
  );
}