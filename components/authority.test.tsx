import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AuthoritySection from './authority';
import { ComponentFactory } from '../test/__factories__/ComponentFactory';

class AuthoritySectionFactory extends ComponentFactory<Record<string, never>> {
  protected component = AuthoritySection;

  constructor() {
    super({});
  }
}

const factory = new AuthoritySectionFactory();

describe('AuthoritySection', () => {
  it('renders the main heading and highlight', () => {
    factory.render();

    expect(
      screen.getByText(/deep expertise in/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/regulated industries\./i),
    ).toBeInTheDocument();
  });

  it('renders all sector cards', () => {
    factory.render();

    expect(
      screen.getByRole('heading', { name: /online retail/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /financial services/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /20\+ years experience/i }),
    ).toBeInTheDocument();
  });

  it('matches the initial render snapshot', () => {
    factory.render();
    expect(factory.snapshot()).toMatchSnapshot();
  });
});

