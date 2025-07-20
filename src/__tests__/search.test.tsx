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
  });

  it('writes value to localStorage after input change', async () => {
    render(<Search onSearch={() => {}} value="" />);

    const user = userEvent.setup();
    const input = screen.getByPlaceholderText(/search/i);

    const searchTerm = 'cornish';
    await user.type(input, searchTerm);

    expect(localStorage.getItem(LSKeys.SearchInput)).toBe(searchTerm);
  });

  it('calls onSearch with current input value when search button is clicked', async () => {
    const onSearchMock = vi.fn();

    render(<Search value="" onSearch={onSearchMock} />);

    const input = screen.getByPlaceholderText(/search/i);
    const button = screen.getByRole('button', { name: /search/i });
    const userInput = 'siamese';

    await userEvent.clear(input);
    await userEvent.type(input, userInput);

    await userEvent.click(button);

    expect(onSearchMock).toHaveBeenCalledWith(userInput);
  });
});
