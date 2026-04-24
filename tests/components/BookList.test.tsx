import { render, screen } from '../test-utils';
import { expect, describe, it, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import { BookList } from '../../src/components/BookList';
import type { Book } from '../../src/types/Book';

// Ensures DOM is wiped before rendering
afterEach(cleanup);

describe('BookList Component', () => {
  it('renders a list of books', () => {
    const mockBooks: Book[] = [
      {
        id: 1,
        title: 'Book One',
        author: 'Author One',
        shelf: 'reading',
        rating: 4,
        description: 'Description One',
      },
      {
        id: 2,
        title: 'Book Two',
        author: 'Author Two',
        shelf: 'read',
        rating: 5,
        description: 'Description Two',
      },
    ];

    render(<BookList books={mockBooks} />);

    // Check if the book titles are rendered
    expect(screen.getAllByText('Book One')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Book Two')[0]).toBeInTheDocument();
  });

  it('renders the add book card', () => {
    render(<BookList books={[]} />);

    // Check for add book message only
    expect(screen.getByText('ADD BOOK')).toBeInTheDocument();
  });
});
