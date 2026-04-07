import { describe, it, expect, beforeEach, mock } from 'bun:test';
import { renderHook, act } from '../test-utils';
import { db } from '../../src/lib/db';
import { useAddBookForm } from '../../src/hooks/useAddBookForm';

mock.module('../../src/lib/db', () => ({
  db: {
    books: {
      add: mock(),
    },
  },
}));

describe('useAddBookForm', () => {
  const onClose = mock();

  beforeEach(() => {
    onClose.mockClear();
  });

  it('initializes with default values', () => {
    const { result } = renderHook(() => useAddBookForm(onClose));

    expect(result.current.form.title).toBe('');
    expect(result.current.form.shelf).toBe('want-to-read');
  });

  it('updates form values', () => {
    const { result } = renderHook(() => useAddBookForm(onClose));

    act(() => {
      result.current.handleChange('title', 'Dune');
    });

    expect(result.current.form.title).toBe('Dune');
  });

  it('submits and calls db + onClose', async () => {
    const { result } = renderHook(() => useAddBookForm(onClose));

    act(() => {
      result.current.handleChange('author', 'Frank Herbert');
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(db.books.add).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it('uses "Unknown" author fallback', async () => {
    const { result } = renderHook(() => useAddBookForm(onClose));

    act(() => {
      result.current.handleChange('author', '   ');
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(db.books.add).toHaveBeenCalledWith(
      expect.objectContaining({
        author: 'Unknown',
      }),
    );
  });
});
