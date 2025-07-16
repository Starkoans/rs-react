import '@testing-library/jest-dom/vitest';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CatCard } from '../components/cat-card/cat-card';
import { mockCats } from './mock-cats';

describe('Cat card', () => {
  it('should render a cat card with link', () => {
    render(<CatCard cat={mockCats[0]} />);
    expect(
      screen.getByRole('link', { name: mockCats[0].name })
    ).toHaveAttribute('href', mockCats[0].wikipedia_url);
  });
});
