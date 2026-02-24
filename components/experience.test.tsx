import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ExperienceSection from './experience';
import { ComponentFactory } from '../test/__factories__/ComponentFactory';

class ExperienceSectionFactory extends ComponentFactory<Record<string, never>> {
  protected component = ExperienceSection;

  constructor() {
    super({});
  }
}

const factory = new ExperienceSectionFactory();

describe('Experience section', () => {
  it('renders the primary headings', () => {
    factory.render();

    expect(screen.getByText(/designed to be/i)).toBeInTheDocument();
    expect(screen.getByText(/built for/i)).toBeInTheDocument();
  });

  it('renders the feature labels', () => {
    factory.render();

    expect(screen.getByText(/aesthetic/i)).toBeInTheDocument();
    expect(screen.getByText(/architecture/i)).toBeInTheDocument();
  });

  it('renders illustrative images with alt text', () => {
    factory.render();

    expect(screen.getByAltText(/design detail/i)).toBeInTheDocument();
    expect(screen.getByAltText(/code detail/i)).toBeInTheDocument();
  });

  it('matches the initial render snapshot', () => {
    factory.render();
    expect(factory.snapshot()).toMatchSnapshot();
  });
});

