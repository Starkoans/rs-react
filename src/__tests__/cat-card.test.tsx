import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { fetchCatImageMock } from './mocks/fetch-cat-image.mock';
import { CatCard } from '../components/cat-card/cat-card';
import { fakeCat } from './mocks/cats.mock';
import { fakeCatImg } from './mocks/cat-image.mock';
import type { Mock } from 'vitest';

describe('Cat card', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('should render a cat card', () => {
    render(<CatCard cat={fakeCat} />, { wrapper: MemoryRouter });

    const catName = screen.getByText(fakeCat.name);

    expect(catName).toBeInTheDocument();
  });

  it('should fetch image and show in card if it exists', async () => {
    (fetchCatImageMock as Mock).mockResolvedValue(fakeCatImg);
    render(<CatCard cat={fakeCat} />, { wrapper: MemoryRouter });

    const catImg = await screen.findByRole('img', { name: fakeCat.name });

    expect(fetchCatImageMock).toHaveBeenCalledWith(fakeCat.reference_image_id);
    expect(catImg).toHaveAttribute('src', fakeCatImg.url);
  });

  it('show card without image if image fetch fails', async () => {
    (fetchCatImageMock as Mock).mockResolvedValue({
      message: 'Not Found',
    });
    render(<CatCard cat={fakeCat} />, { wrapper: MemoryRouter });

    const catImg = screen.queryByRole('img', { name: fakeCat.name });

    expect(fetchCatImageMock).toHaveBeenCalledWith(fakeCat.reference_image_id);
    expect(catImg).not.toBeInTheDocument();
  });
});
