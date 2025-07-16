import '@testing-library/jest-dom/vitest';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '../components/error-boundary/error-boundary';
import { messages } from '../sources/messages';
import { useEffect } from 'react';

const ProblemChild = () => {
  useEffect(() => {
    throw new Error('Test error');
  }, []);
  return null;
};

describe('Error boundary', () => {
  it('should catch error and show fallback UI', () => {
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(screen.getByText(messages.errors.oops)).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: messages.buttons.reload })
    ).toBeInTheDocument();
  });
});
