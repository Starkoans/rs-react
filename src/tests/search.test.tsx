import '@testing-library/jest-dom/vitest';

import { beforeAll, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Search } from '../components/search/search';
import { LSKeys } from '../sources/ls-keys';

describe('search', () => {
  beforeAll(() => {
    window.HTMLFormElement.prototype.requestSubmit = () => {};
  });

  render(<Search onSearch={() => {}} value="" />);

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

  it('writes value to localStorage after input change', async () => {
    localStorage.clear();
    const input = screen.getByPlaceholderText(/search/i);
    const user = userEvent.setup();

    const searchTerm = 'cornish';
    await user.type(input, searchTerm);

    expect(localStorage.getItem(LSKeys.SearchInput)).toBe(searchTerm);
  });
});
