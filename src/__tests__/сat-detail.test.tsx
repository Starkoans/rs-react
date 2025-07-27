import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CatDetail } from '@/components/cat-detail/cat-detail';
import { fakeCat } from './mocks/cats.mock';
import { fakeCatImg } from './mocks/cat-image.mock';
import type { Mock } from 'vitest';
import { fetchCatImageMock } from '@/__tests__/mocks/fetch-cat-image.mock';
import { fetchCatByIdMock } from '@/__tests__/mocks/fetch-cat-by-id.mock';

describe('CatDetail', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('returns null if the cat parameter is missing from the URL', () => {
    const { container } = render(<CatDetail />, { wrapper: MemoryRouter });

    expect(container.innerHTML).toBe('');
  });

  it('renders cat data', async () => {
    (fetchCatByIdMock as Mock).mockResolvedValue(fakeCat);
    (fetchCatImageMock as Mock).mockResolvedValue(fakeCatImg);

    render(<CatDetail />, {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={[`/?cat=${fakeCat.id}`]}>
          {children}
        </MemoryRouter>
      ),
    });

    const catNameHeading = await screen.findByRole('heading', {
      name: fakeCat.name,
    });
    const img = screen.getByRole('img', { name: fakeCat.name });

    expect(catNameHeading).toBeInTheDocument();
    expect(img).toHaveAttribute('src', fakeCatImg.url);
  });

  it('displays an error message when loading fails', async () => {
    const errorMessage = 'Request failed';

    (fetchCatByIdMock as Mock).mockRejectedValue(new Error(errorMessage));

    render(<CatDetail />, {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={[`/?cat=unknown`]}>
          {children}
        </MemoryRouter>
      ),
    });

    const errorElement = await screen.findByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
  });
});
