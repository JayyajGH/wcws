import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import RootLayout from './layout';

vi.mock('next/font/google', () => ({
  Geist: () => ({ variable: '--font-geist-sans-mock' }),
  Geist_Mono: () => ({ variable: '--font-geist-mono-mock' }),
}));

describe('RootLayout', () => {
  it('wraps children with html and body tags', () => {
    render(
      <RootLayout>
        <div data-testid="child-content">Hello</div>
      </RootLayout>,
    );

    expect(document.querySelector('html')).toBeInTheDocument();
    expect(document.querySelector('body')).toBeInTheDocument();
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
  });
});

