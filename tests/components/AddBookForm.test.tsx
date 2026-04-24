import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../test-utils';
import { AddBookForm } from '../../src/components/AddBookForm';
import type { Book } from '../../src/types/Book';

const defaultForm: Omit<Book, 'id'> = {
  title: '',
  author: '',
  coverUrl: '',
  genre: '',
  shelf: 'want-to-read',
  rating: null,
  description: '',
};

describe('AddBookForm', () => {
  it('renders all form fields', () => {
    render(<AddBookForm form={defaultForm} onChange={vi.fn()} onSubmit={vi.fn()} />);

    expect(screen.getByPlaceholderText('Title')).toBeTruthy();
    expect(screen.getByPlaceholderText('Author')).toBeTruthy();
    expect(screen.getByPlaceholderText('Cover URL (optional)')).toBeTruthy();
    expect(screen.getByPlaceholderText('Genre (optional)')).toBeTruthy();
    expect(screen.getByPlaceholderText('Description...')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Add' })).toBeTruthy();
  });

  it('calls onChange when typing in text inputs', () => {
    const onChange = vi.fn();
    render(<AddBookForm form={defaultForm} onChange={onChange} onSubmit={vi.fn()} />);

    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Dune' } });
    expect(onChange).toHaveBeenCalledWith('title', 'Dune');

    fireEvent.change(screen.getByPlaceholderText('Author'), { target: { value: 'Frank Herbert' } });
    expect(onChange).toHaveBeenCalledWith('author', 'Frank Herbert');
  });

  it('calls onChange with shelf value when shelf is changed', () => {
    const onChange = vi.fn();
    render(<AddBookForm form={defaultForm} onChange={onChange} onSubmit={vi.fn()} />);

    const selects = screen.getAllByRole('combobox');
    fireEvent.change(selects[0], { target: { value: 'read' } });
    expect(onChange).toHaveBeenCalledWith('shelf', 'read');
  });

  it('calls onChange with numeric rating when rating is selected', () => {
    const onChange = vi.fn();
    render(<AddBookForm form={defaultForm} onChange={onChange} onSubmit={vi.fn()} />);

    const selects = screen.getAllByRole('combobox');
    fireEvent.change(selects[1], { target: { value: '4' } });
    expect(onChange).toHaveBeenCalledWith('rating', 4);
  });

  it('calls onChange with null when rating is cleared', () => {
    const onChange = vi.fn();
    render(
      <AddBookForm form={{ ...defaultForm, rating: 3 }} onChange={onChange} onSubmit={vi.fn()} />,
    );

    const selects = screen.getAllByRole('combobox');
    fireEvent.change(selects[1], { target: { value: '' } });
    expect(onChange).toHaveBeenCalledWith('rating', null);
  });

  it('calls onSubmit when form is submitted', () => {
    const onSubmit = vi.fn();
    render(
      <AddBookForm
        form={{ ...defaultForm, title: 'Dune' }}
        onChange={vi.fn()}
        onSubmit={onSubmit}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Add' }));
    expect(onSubmit).toHaveBeenCalled();
  });
  it('displays current form values', () => {
    render(
      <AddBookForm
        form={{ ...defaultForm, title: 'Dune', author: 'Frank Herbert' }}
        onChange={vi.fn()}
        onSubmit={vi.fn()}
      />,
    );

    expect((screen.getByPlaceholderText('Title') as HTMLInputElement).value).toBe('Dune');
    expect((screen.getByPlaceholderText('Author') as HTMLInputElement).value).toBe('Frank Herbert');
  });
});
