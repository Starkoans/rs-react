import { act, cleanup, render, screen, waitFor } from '@testing-library/react';
import { fetchCatsBreedsMock } from './mocks/fetch-cats.mock';
import userEvent from '@testing-library/user-event';
import { messages } from '../sources/messages';
import { fakeCat } from './mocks/cats.mock';
import type { Mock } from 'vitest';
import {
  PAGINATION_DEFAULT_LIMIT,
  PAGINATION_START_PAGE,
} from '@/sources/constants';
import { HomePage } from '@/pages/home-page/home-page';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@/store';

describe('Home page', () => {
  afterEach(() => {
    cleanup();
    localStorage.clear();
    vi.clearAllMocks();
  });

  const renderHomePage = () => {
    render(
      <Provider store={store}>
        <HomePage />
      </Provider>,
      { wrapper: MemoryRouter }
    );
  };

  it('should call fetch with correct data', async () => {
    (fetchCatsBreedsMock as Mock).mockResolvedValue({
      data: [fakeCat],
      pagination: {
        page: PAGINATION_START_PAGE,
        limit: PAGINATION_DEFAULT_LIMIT,
        totalItems: 1,
        totalPages: 1,
      },
    });
    renderHomePage();
    const input = screen.getByPlaceholderText(/search/i);
    const button = screen.getByRole('button', { name: /search/i });

    await act(async () => {
      await userEvent.type(input, fakeCat.name);
      await userEvent.click(button);
    });

    await waitFor(() => {
      expect(fetchCatsBreedsMock).toHaveBeenCalledWith(
        fakeCat.name,
        PAGINATION_START_PAGE,
        PAGINATION_DEFAULT_LIMIT
      );
    });
  });

  it('displays cats after search', async () => {
    (fetchCatsBreedsMock as Mock).mockResolvedValue({
      data: [fakeCat],
      pagination: {
        page: PAGINATION_START_PAGE,
        limit: PAGINATION_DEFAULT_LIMIT,
        totalItems: 1,
        totalPages: 1,
      },
    });
    renderHomePage();

    const input = screen.getByPlaceholderText(/search/i);
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.type(input, fakeCat.name);
    await userEvent.click(button);

    await waitFor(async () => {
      const catName = await screen.findByText(fakeCat.name);
      expect(catName).toBeInTheDocument();
    });
  });

  it('displays message if no cats found', async () => {
    (fetchCatsBreedsMock as Mock).mockResolvedValue({
      data: [],
      pagination: {
        page: PAGINATION_START_PAGE,
        limit: 0,
        totalItems: 0,
        totalPages: 0,
      },
    });
    renderHomePage();

    const input = screen.getByPlaceholderText(/search/i);
    const button = screen.getByRole('button', { name: /search/i });
    const userInput = 'nonexistent breed';

    await userEvent.type(input, userInput);
    await userEvent.click(button);

    await waitFor(async () => {
      const noCatsMessage = await screen.findByText(messages.noCatsFound);
      expect(noCatsMessage).toBeInTheDocument();
    });
  });

  it('displays error message', async () => {
    const errorMessage = 'Request failed with status code 404';
    (fetchCatsBreedsMock as Mock).mockRejectedValue(
      new Error(errorMessage, { cause: { code: 404 } })
    );
    renderHomePage();

    const input = screen.getByPlaceholderText(/search/i);
    const button = screen.getByRole('button', { name: /search/i });
    const userInput = 'nonexistent breed';

    await userEvent.type(input, userInput);
    await userEvent.click(button);

    await waitFor(async () => {
      const defaultErrorMessage = await screen.findByText(messages.errors.oops);
      const currentErrorMessage = await screen.findByText(errorMessage);

      expect(defaultErrorMessage).toBeInTheDocument();
      expect(currentErrorMessage).toBeInTheDocument();
    });
  });
});
