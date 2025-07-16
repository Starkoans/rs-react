import '@testing-library/jest-dom/vitest';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Search } from '../components/search/search';

describe('search', () => {
  const setup = () => {
    render(<Search onSearch={() => {}} value="" />);
  };
  setup();

  it('should have input', async () => {
    const input = screen.getByPlaceholderText(/search/i);
    expect(input).toBeInTheDocument();
    expect(input).toBeInstanceOf(HTMLInputElement);
  });

  it('should have button', async () => {
    const button = screen.getByRole('button', { name: /search/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeInstanceOf(HTMLButtonElement);
  });
});
