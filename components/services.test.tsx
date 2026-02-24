import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Services from './services';
import { ComponentFactory } from '../test/__factories__/ComponentFactory';

class ServicesFactory extends ComponentFactory<Record<string, never>> {
  protected component = Services;

  constructor() {
    super({});
  }
}

const factory = new ServicesFactory();

describe('Services', () => {
  it('renders the section heading and description', () => {
    factory.render();

    expect(
      screen.getByText(/bespoke digital for the local high street\./i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/i build a professional home for your business online/i),
    ).toBeInTheDocument();
  });

  it('renders all service cards with titles', () => {
    factory.render();

    expect(screen.getByText(/bespoke web design/i)).toBeInTheDocument();
    expect(screen.getByText(/small business focus/i)).toBeInTheDocument();
    expect(screen.getByText(/mobile-first build/i)).toBeInTheDocument();
    expect(screen.getByText(/20 years of speed/i)).toBeInTheDocument();
  });

  it('matches the initial render snapshot', () => {
    factory.render();
    expect(factory.snapshot()).toMatchSnapshot();
  });
});

