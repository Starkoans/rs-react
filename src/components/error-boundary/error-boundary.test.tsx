import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '@components/error-boundary/error-boundary';
import { messages } from '@sources/messages';

describe('Error boundary', () => {
  it('should catch error and show fallback UI', async () => {
    const SimulateError = () => {
      throw new Error('oops');
    };

    render(
      <ErrorBoundary>
        <SimulateError />
      </ErrorBoundary>
    );

    const errorMessage = screen.getByText(messages.errors.oops);
    const reloadBtn = screen.getByRole('button', {
      name: messages.buttons.reload,
    });

    expect(errorMessage).toBeInTheDocument();
    expect(reloadBtn).toBeInTheDocument();
  });
});
