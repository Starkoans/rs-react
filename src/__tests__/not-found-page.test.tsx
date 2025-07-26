import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NotFoundPage } from '@/pages/not-found-page';
import { messages } from '@/sources/messages';
import { ROUTES } from '@/router';

const navigateMock = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

describe('NotFoundPage', () => {
  beforeEach(() => {
    navigateMock.mockClear();
  });

  it('renders heading with not found message', () => {
    render(<NotFoundPage />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(messages.headers.notFound);
  });

  it('renders a button to navigate back', () => {
    render(<NotFoundPage />);
    const button = screen.getByRole('button', {
      name: messages.buttons.toMainPage,
    });

    expect(button).toBeInTheDocument();
  });

  it('calls navigate with home route on button click', async () => {
    render(<NotFoundPage />);

    const button = screen.getByRole('button', {
      name: messages.buttons.toMainPage,
    });
    await userEvent.click(button);

    expect(navigateMock).toHaveBeenCalledWith(ROUTES.home);
  });
});
