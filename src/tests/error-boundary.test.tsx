import '@testing-library/jest-dom/vitest';
import { describe, expect, it } from 'vitest';
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

    await user.click(
      screen.getByRole('button', { name: messages.buttons.simulateError })
    );

    expect(screen.getByText(messages.errors.oops)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: messages.buttons.reload })
    ).toBeInTheDocument();
  });
});
