import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Search } from '../components/search/search';
import { LSKeys } from '../sources/ls-keys';

describe('search', () => {
  afterEach(() => {
    cleanup();
    localStorage.clear();
  });

  const mockGetCatsByBreed = vi.fn();

  it('should have input', async () => {
    render(<Search getCatsByBreed={mockGetCatsByBreed} />);
    const input = screen.getByPlaceholderText(/search/i);

    expect(input).toBeInTheDocument();
    expect(input).toBeInstanceOf(HTMLInputElement);
  });

  it('should have button', async () => {
    render(<Search getCatsByBreed={mockGetCatsByBreed} />);
    const button = screen.getByRole('button', { name: /search/i });

    expect(button).toBeInTheDocument();
  });

  it('writes value to localStorage after input change', async () => {
    render(<Search getCatsByBreed={mockGetCatsByBreed} />);

    const user = userEvent.setup();
    const input = screen.getByPlaceholderText(/search/i);

    const searchTerm = 'cornish';
    await user.type(input, searchTerm);

    expect(localStorage.getItem(LSKeys.SearchInput)).toBe(searchTerm);
  });

  it('calls onSearch with current input value when search button is clicked', async () => {
    render(<Search getCatsByBreed={mockGetCatsByBreed} />);

    const input = screen.getByPlaceholderText(/search/i);
    const button = screen.getByRole('button', { name: /search/i });
    const userInput = 'siamese';

    await userEvent.clear(input);
    await userEvent.type(input, userInput);

    await userEvent.click(button);

    expect(mockGetCatsByBreed).toHaveBeenCalledWith(userInput);
  });
});
