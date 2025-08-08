import { cleanup, render, screen } from '@testing-library/react';
import {
  useGetCatByIdQueryMock,
  useGetCatImgQueryMock,
} from '@/__tests__/mocks/cats.service.mock';
import { MemoryRouter } from 'react-router-dom';
import { CatDetail } from '@/components/cat-detail/cat-detail';
import { fakeCat } from '@tests/mocks/cats.mock';
import { fakeCatImg } from '@tests/mocks/cat-image.mock';
import type { Mock } from 'vitest';

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

    (useGetCatByIdQueryMock as Mock).mockReturnValue({
      currentData: undefined,
      isFetching: false,
      error: { status: 404, data: errorMessage },
      refetch: vi.fn(),
    });

    (useGetCatImgQueryMock as Mock).mockReturnValue({
      currentData: undefined,
      isFetching: false,
      error: undefined,
      refetch: vi.fn(),
    });

    render(
      <MemoryRouter initialEntries={[`/?cat=abys`]}>
        <CatDetail />
      </MemoryRouter>
    );

    const errorElement = await screen.findByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
  });
});
