import { cleanup, render, screen } from '@testing-library/react';
import { Layout } from './layout';
import { messages } from '@/sources/messages';
import { ThemeProvider } from '@/theme/theme-context';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@/store';

describe('Layout', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  const renderLayout = () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter>
            <Layout />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );
  };

  it('should show app name', () => {
    renderLayout();

    const appName = screen.getByRole('link', {
      name: messages.headers.appName,
    });

    expect(appName).toBeInTheDocument();
  });

  it('should show toggle theme button', () => {
    renderLayout();

    const toggleThemeButton = screen.getByRole('button', {
      name: messages.buttons.toggleTheme,
    });

    expect(toggleThemeButton).toBeInTheDocument();
  });
});
