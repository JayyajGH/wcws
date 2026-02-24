import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Portfolio from './portfolio';
import { ComponentFactory } from '../test/__factories__/ComponentFactory';

class PortfolioFactory extends ComponentFactory<Record<string, never>> {
  protected component = Portfolio;

  constructor() {
    super({});
  }
}

const factory = new PortfolioFactory();

describe('Portfolio', () => {
  it('renders the section heading and intro copy', () => {
    factory.render();

    expect(screen.getByText(/selected projects/i)).toBeInTheDocument();
    expect(
      screen.getByText(/a look at how i've helped small businesses/i),
    ).toBeInTheDocument();
  });

  it('renders all project cards with titles and categories', () => {
    factory.render();

    expect(screen.getByText(/pops place/i)).toBeInTheDocument();
    expect(screen.getByText(/burger bar/i)).toBeInTheDocument();

    expect(screen.getByText(/brendan's brewtique/i)).toBeInTheDocument();
    expect(screen.getByText(/beer retailer/i)).toBeInTheDocument();

    expect(screen.getByText(/82electrical/i)).toBeInTheDocument();
    expect(screen.getByText(/electrician/i)).toBeInTheDocument();
  });

  it('matches the initial render snapshot', () => {
    factory.render();
    expect(factory.snapshot()).toMatchSnapshot();
  });
});

