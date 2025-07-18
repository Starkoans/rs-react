import '@testing-library/jest-dom/vitest';

import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as api from '../api/fetch-cats-breed';
import { fetchCats } from '../api/fetch-cats-breed';
import App from '../App';
import { mockCats } from './mock-cats';
import { messages } from '../sources/messages';

vi.mock('../api/fetch-cats-breed', () => ({
  fetchCats: vi.fn(),
}));

describe('search', () => {
  afterEach(() => {
    cleanup();
    localStorage.clear();
  });

  it('fetches and displays cats after search', async () => {
    (api.fetchCats as ReturnType<typeof vi.fn>).mockResolvedValue(mockCats);
    render(<App />);
    const input = screen.getByPlaceholderText(/search/i);
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.type(input, 'british');
    await userEvent.click(button);

    expect(fetchCats).toHaveBeenCalledWith('british');
    expect(await screen.findByText(/British Shorthair/i)).toBeInTheDocument();
  });

  it('fetches and displays message if no cats found', async () => {
    (api.fetchCats as ReturnType<typeof vi.fn>).mockResolvedValue([]);
    render(<App />);
    const input = screen.getByPlaceholderText(/search/i);
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.type(input, 'unknown cat');
    await userEvent.click(button);

    expect(fetchCats).toHaveBeenCalledWith('unknown cat');
    expect(await screen.findByText(messages.noCatsFound)).toBeInTheDocument();
  });

  it('handles fetch error', async () => {
    (fetchCats as ReturnType<typeof vi.fn>).mockRejectedValue({
      message: 'Request failed with status code 404',
      response: { status: 404 },
    });

    render(<App />);
    const input = screen.getByPlaceholderText(/search/i);
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.type(input, 'nonexistentbreed');
    await userEvent.click(button);

    expect(fetchCats).toHaveBeenCalled();
    expect(await screen.findByText(messages.errors.oops)).toBeInTheDocument();
  });
});
