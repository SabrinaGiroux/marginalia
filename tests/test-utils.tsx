import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

// Functions used in testing
const customRender = (ui: React.ReactNode, options = {}) =>
  render(<MemoryRouter>{ui}</MemoryRouter>, options);

export { screen } from '@testing-library/react';
export { customRender as render };
