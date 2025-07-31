import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { fetchCatImageMock } from './mocks/fetch-cat-image.mock';
import { CatCard } from '../components/cat-card/cat-card';
import { fakeCat } from './mocks/cats.mock';
import { fakeCatImg } from './mocks/cat-image.mock';
import type { Mock } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '@/store';
import type { Cat } from '@/sources/types/cat';

describe('Cat card', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  const renderCard = (cat: Cat.Breed) => {
    render(
      <Provider store={store}>
        <CatCard cat={cat} />
      </Provider>,
      { wrapper: MemoryRouter }
    );
  };

  it('should render a cat card', () => {
    renderCard(fakeCat);
    const catName = screen.getByText(fakeCat.name);

    expect(catName).toBeInTheDocument();
  });

  it('should fetch image and show in card if it exists', async () => {
    (fetchCatImageMock as Mock).mockResolvedValue(fakeCatImg);
    renderCard(fakeCat);

    const catImg = await screen.findByRole('img', { name: fakeCat.name });

    expect(fetchCatImageMock).toHaveBeenCalledWith(fakeCat.reference_image_id);
    expect(catImg).toHaveAttribute('src', fakeCatImg.url);
  });

  it('show card without image if image fetch fails', async () => {
    (fetchCatImageMock as Mock).mockResolvedValue({
      message: 'Not Found',
    });
    renderCard(fakeCat);

    const catImg = screen.queryByRole('img', { name: fakeCat.name });

    expect(fetchCatImageMock).toHaveBeenCalledWith(fakeCat.reference_image_id);
    expect(catImg).not.toBeInTheDocument();
  });
});
