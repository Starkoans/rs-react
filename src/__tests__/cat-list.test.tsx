import { render, screen } from '@testing-library/react';
import { CatsList } from '../components/cat-list/cats-list';
import { mockCats } from './mocks/cats.mock';
import { messages } from '../sources/messages';

describe('Cat list', () => {
  it('should show message if no cats found', () => {
    render(<CatsList cats={[]} />);
    const message = screen.getByText(messages.noCatsFound);
    expect(message).toBeInTheDocument();
  });

  it('should not show cats while loading', () => {
    render(<CatsList cats={[]} isLoading={true} />);
    expect(screen.queryByTestId('card')).not.toBeInTheDocument();
  });

  it('should show error message', () => {
    render(<CatsList cats={[]} error={'Error'} />);
    expect(screen.getByText(messages.errors.oops)).toBeInTheDocument();
  });

  it('should show list of cats', () => {
    render(<CatsList cats={mockCats} />);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });
});
