import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '../components/error-boundary/error-boundary';
import { messages } from '../sources/messages';
import { SimulateError } from '../components/simulate-error';
import userEvent from '@testing-library/user-event';

describe('Error boundary', () => {
  it('should catch error and show fallback UI when user clicked simulate error button', async () => {
    render(
      <ErrorBoundary>
        <SimulateError />
      </ErrorBoundary>
    );

    const user = userEvent.setup();
    const simulateErrorBtn = screen.getByRole('button', {
      name: messages.buttons.simulateError,
    });

    await user.click(simulateErrorBtn);

    const errorMessage = screen.getByText(messages.errors.oops);
    const reloadBtn = screen.getByRole('button', {
      name: messages.buttons.reload,
    });

    expect(errorMessage).toBeInTheDocument();
    expect(reloadBtn).toBeInTheDocument();
  });
});
