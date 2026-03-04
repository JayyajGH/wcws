import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Hero from './hero';
import { ComponentFactory } from '../../test/__factories__/ComponentFactory';

class HeroFactory extends ComponentFactory<Record<string, never>> {
  protected component = Hero;

  constructor() {
    super({});
  }
}

const factory = new HeroFactory();

describe('Hero', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders headline and supporting copy', () => {
    factory.render();

    expect(screen.getByText(/expert web design for/i)).toBeInTheDocument();
    expect(screen.getByText(/small businesses\./i)).toBeInTheDocument();
    expect(
      screen.getByText(/20 years building high-performance systems/i),
    ).toBeInTheDocument();
  });

  it('renders hero image with descriptive alt text', () => {
    factory.render();

    expect(screen.getByAltText(/local retail boutique/i)).toBeInTheDocument();
  });

  it('scrolls to contact section when "Get Started" is clicked', () => {
    factory.render();

    const mockScrollIntoView = vi.fn();
    const contactElement = document.createElement('div');
    contactElement.id = 'contact';
    contactElement.scrollIntoView = mockScrollIntoView;
    document.body.appendChild(contactElement);

    fireEvent.click(screen.getByRole('button', { name: /get started/i }));

    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('matches the initial render snapshot', () => {
    factory.render();
    expect(factory.snapshot()).toMatchSnapshot();
  });
});

