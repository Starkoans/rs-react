import { cleanup, render, screen } from '@testing-library/react';
import { messages } from '../../app/lib/messages';
import { AboutPage } from '../../app/about/page';

describe('About page', () => {
  afterEach(() => {
    cleanup();
    localStorage.clear();
    vi.clearAllMocks();
  });

  const renderAboutPage = () => {
    render(<AboutPage />);
  };

  it('should show link to author github and link to rss course', async () => {
    renderAboutPage();

    const githubLink = screen.getByRole('link', {
      name: messages.paragraphs.myGitHub,
    });

    expect(githubLink).toBeInTheDocument();
  });
});
