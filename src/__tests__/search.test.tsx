import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Search } from '../components/search/search';
import { LSKeys } from '../sources/ls-keys';

describe('search', () => {
  afterEach(() => {
    cleanup();
    localStorage.clear();
  });

  it('should have input', async () => {
    render(<Search onSearch={() => {}} value="" />);
    const input = screen.getByPlaceholderText(/search/i);

    expect(input).toBeInTheDocument();
    expect(input).toBeInstanceOf(HTMLInputElement);
  });

  it('should have button', async () => {
    render(<Search onSearch={() => {}} value="" />);
    const button = screen.getByRole('button', { name: /search/i });

    expect(button).toBeInTheDocument();
    expect(button).toBeInstanceOf(HTMLButtonElement);
  });

  it('writes value to localStorage after input change', async () => {
    render(<Search onSearch={() => {}} value="" />);

    const user = userEvent.setup();
    const input = screen.getByPlaceholderText(/search/i);

    const searchTerm = 'cornish';
    await user.type(input, searchTerm);

    expect(localStorage.getItem(LSKeys.SearchInput)).toBe(searchTerm);
  });
});
