import '@testing-library/jest-dom/vitest';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { CatCard } from '../components/cat-card/cat-card';
import { mockCats } from './mock-cats';
import { fetchCatImage } from '../api/fetch-cat-image';
import { fakeCat, fakeCatImg } from './fetch-cat-image.mock';

describe('Cat card', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render a cat card with link', () => {
    render(<CatCard cat={mockCats[0]} />);

    expect(
      screen.getByRole('link', { name: mockCats[0].name })
    ).toHaveAttribute('href', mockCats[0].wikipedia_url);
  });

  it('should fetch image and show in card if it exists', async () => {
    (fetchCatImage as ReturnType<typeof vi.fn>).mockResolvedValue(fakeCatImg);

    render(<CatCard cat={fakeCat} />);

    expect(fetchCatImage).toHaveBeenCalledWith(fakeCat.reference_image_id);
    expect(
      await screen.findByRole('img', { name: fakeCat.name })
    ).toHaveAttribute('src', fakeCatImg.url);
  });

  it('does not show cat image if image fetch fails', async () => {
    const fakeCat = mockCats[1];
    (fetchCatImage as ReturnType<typeof vi.fn>).mockResolvedValue({
      message: 'Not Found',
    });

    render(<CatCard cat={fakeCat} />);

    expect(fetchCatImage).toHaveBeenCalledWith(fakeCat.reference_image_id);
    expect(
      await screen.findByRole('link', { name: fakeCat.name })
    ).toHaveAttribute('href', fakeCat.wikipedia_url);
    expect(
      screen.queryByRole('img', { name: fakeCat.name })
    ).not.toBeInTheDocument();
  });
});
