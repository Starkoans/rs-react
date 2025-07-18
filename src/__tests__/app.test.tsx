import { cleanup, render, screen } from '@testing-library/react';
import { fetchCatsMock } from './mocks/fetch-cats.mock';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { messages } from '../sources/messages';
import { fakeCat } from './mocks/cats.mock';
import type { Mock } from 'vitest';

describe('app', () => {
  afterEach(() => {
    cleanup();
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('fetches and displays cats after search', async () => {
    (fetchCatsMock as Mock).mockResolvedValue([fakeCat]);
    render(<App />);

    const input = screen.getByPlaceholderText(/search/i);
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.type(input, fakeCat.name);
    await userEvent.click(button);

    const catLink = await screen.findByRole('link', { name: fakeCat.name });
    expect(catLink).toBeInTheDocument();
    expect(fetchCatsMock).toHaveBeenCalledWith(fakeCat.name);
  });

  it('fetches and displays message if no cats found', async () => {
    (fetchCatsMock as Mock).mockResolvedValue([]);
    render(<App />);

    const input = screen.getByPlaceholderText(/search/i);
    const button = screen.getByRole('button', { name: /search/i });
    const userInput = 'nonexistent breed';

    await userEvent.type(input, userInput);
    await userEvent.click(button);

    const noCatsMessage = await screen.findByText(messages.noCatsFound);
    expect(noCatsMessage).toBeInTheDocument();
    expect(fetchCatsMock).toHaveBeenCalledWith(userInput);
  });

  it('handles fetch error and displays error message', async () => {
    const errorMessage = 'Request failed with status code 404';
    (fetchCatsMock as Mock).mockRejectedValue(
      new Error(errorMessage, { cause: { code: 404 } })
    );
    render(<App />);

    const input = screen.getByPlaceholderText(/search/i);
    const button = screen.getByRole('button', { name: /search/i });
    const userInput = 'nonexistent breed';

    await userEvent.type(input, userInput);
    await userEvent.click(button);

    const defaultErrorMessage = await screen.findByText(messages.errors.oops);
    const currentErrorMessage = await screen.findByText(errorMessage);

    expect(defaultErrorMessage).toBeInTheDocument();
    expect(currentErrorMessage).toBeInTheDocument();
    expect(fetchCatsMock).toHaveBeenCalledWith(userInput);
  });
});
