import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, fireEvent } from '../test-utils';
import { AddBookModal } from '../../src/components/AddBookModal';

vi.mock('../../src/lib/db', () => ({
  db: { books: { add: vi.fn() } },
}));

describe('AddBookModal', () => {
  const onClose = vi.fn();

  beforeEach(() => onClose.mockClear());

  it('renders modal and form correctly', () => {
    const { getByText, getByPlaceholderText } = render(<AddBookModal onClose={onClose} />);
    expect(getByText('Add Book')).toBeTruthy();
    expect(getByPlaceholderText('Title')).toBeTruthy();
    expect(getByPlaceholderText('Author')).toBeTruthy();
  });

  it('calls onClose when clicking backdrop', () => {
    const { container } = render(<AddBookModal onClose={onClose} />);
    fireEvent.click(container.firstChild!);
    expect(onClose).toHaveBeenCalled();
  });

  it('does not call onClose when clicking modal content', () => {
    const { getByText } = render(<AddBookModal onClose={onClose} />);
    fireEvent.click(getByText('Add Book'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onClose when Cancel button is clicked', () => {
    const { getByText } = render(<AddBookModal onClose={onClose} />);
    fireEvent.click(getByText('Cancel'));
    expect(onClose).toHaveBeenCalled();
  });
});
