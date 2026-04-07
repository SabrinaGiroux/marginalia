import { render, screen, fireEvent } from '../test-utils';
import { mock, expect, describe, it } from 'bun:test';
import { StarRating } from '../../src/components/StarRating';

describe('StarRating', () => {
  it('renders 5 stars', () => {
    render(<StarRating rating={3} />);
    const stars = screen.getAllByRole('button');
    expect(stars).toHaveLength(5);
  });

  it('calls onChange with correct value when clicked', () => {
    const onChange = mock();

    render(<StarRating rating={2} onChange={onChange} />);
    const stars = screen.getAllByRole('button');

    // Click the fourth star
    fireEvent.click(stars[3]);

    expect(onChange).toHaveBeenCalledWith(4);
  });

  it('resets rating to 0 when clicking same star', () => {
    const onChange = mock();

    render(<StarRating rating={3} onChange={onChange} />);
    const stars = screen.getAllByRole('button');

    // clicking the third star (same as current rating)
    fireEvent.click(stars[2]);

    expect(onChange).toHaveBeenCalledWith(0);
  });

  it('does nothing when not editable', () => {
    const onChange = mock();

    render(<StarRating rating={3} />);
    const stars = screen.getAllByRole('button');

    fireEvent.click(stars[4]);

    expect(onChange).not.toHaveBeenCalled();
  });

  it('applies correct star color based on rating', () => {
    render(<StarRating rating={3} />);
    const stars = screen.getAllByRole('button');

    expect(stars[0].className).toContain('text-[#c8a96e]');
    expect(stars[3].className).toContain('text-[#3a3530]');
  });
});
