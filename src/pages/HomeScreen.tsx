import { BookList } from '../components/BookList';
import type { Book } from '../types/Book';

const SAMPLE_BOOKS: Book[] = [
  {
    id: 1,
    title: 'The Stranger',
    author: 'Albert Camus',
    shelf: 'read',
    genre: 'Existentialism',
    rating: 5,
    coverUrl:
      'https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781681771359/the-stranger-9781681771359_hr.jpg',
    note: '',
  },
  {
    id: 2,
    title: 'Don Quixote',
    author: 'Miguel de Cervantes',
    shelf: 'want-to-read',
    genre: 'Classic',
    rating: null,
    coverUrl:
      'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1546112331i/3836.jpg',
    note: '',
  },
];

export function HomeScreen() {
  return (
    <>
      <section id="center">
        <h1> Marginalia - Book Lists</h1>
        <BookList books={SAMPLE_BOOKS} />
      </section>
    </>
  );
}
