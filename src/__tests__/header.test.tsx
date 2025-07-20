import { render, screen } from '@testing-library/react';
import { Header } from '../components/header/header';
import { messages } from '../sources/messages';

describe('Header', () => {
  it('should show app name', () => {
    render(<Header />);
    const appTitle = messages.headers.appName;
    expect(screen.getByRole('heading')).toHaveTextContent(appTitle);
  });
});
