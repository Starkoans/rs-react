import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CatsList } from './cats-list';
import { mockCats } from '../../__tests__/mocks/cats.mock';
import { messages } from '../../sources/messages';
import type { Cat } from '@/sources/types/cat';
import { Provider } from 'react-redux';
import { store } from '@/store';

describe('Cat list', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  const renderList = (props: {
    cats?: Cat.Breed[];
    error?: string | null;
    isLoading?: boolean | undefined;
  }) => {
    render(
      <Provider store={store}>
        <CatsList
          cats={props.cats}
          error={props.error}
          isLoading={props.isLoading}
        />
      </Provider>,
      { wrapper: MemoryRouter }
    );
  };
  it('should show message if no cats found', () => {
    renderList({ cats: [] });
    const message = screen.getByText(messages.noCatsFound);
    expect(message).toBeInTheDocument();
  });

  it('should not show cats while loading', () => {
    renderList({ cats: [], isLoading: true });
    expect(screen.queryByTestId('card')).not.toBeInTheDocument();
  });

  it('should show error message', () => {
    renderList({ cats: [], error: 'error' });
    expect(screen.getByText(messages.errors.oops)).toBeInTheDocument();
  });

  it('should show list of cats', () => {
    renderList({ cats: mockCats });
    expect(screen.getByRole('list')).toBeInTheDocument();
  });
});
