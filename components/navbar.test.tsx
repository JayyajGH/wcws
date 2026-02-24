import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Navbar from './navbar';
import { ComponentFactory } from '../test/__factories__/ComponentFactory';

class NavbarFactory extends ComponentFactory<Record<string, never>> {
  protected component = Navbar;

  constructor() {
    super({});
  }
}

const factory = new NavbarFactory();

describe('Navbar', () => {
  it('renders the brand wordmark', () => {
    factory.render();

    expect(screen.getByText(/west country/i)).toBeInTheDocument();
    expect(screen.getByText(/web solutions/i)).toBeInTheDocument();
  });

  it('renders the primary call-to-action link', () => {
    factory.render();

    const link = screen.getByRole('link', { name: /get in touch/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#contact');
  });

  it('matches the initial render snapshot', () => {
    factory.render();
    expect(factory.snapshot()).toMatchSnapshot();
  });
});

