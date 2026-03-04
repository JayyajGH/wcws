import { vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

// Polyfill IntersectionObserver for framer-motion viewport features in tests
if (typeof global.IntersectionObserver === 'undefined') {
  class MockIntersectionObserver implements Partial<IntersectionObserver> {
    callback: IntersectionObserverCallback;
    options?: IntersectionObserverInit;

    constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
      this.callback = callback;
      this.options = options;
    }

    observe(target: Element) {
      // Immediately invoke callback with an intersecting entry to simulate in-view elements
      this.callback(
        [
          {
            isIntersecting: true,
            target,
            intersectionRatio: 1,
            time: Date.now(),
            boundingClientRect: target.getBoundingClientRect(),
            intersectionRect: target.getBoundingClientRect(),
            rootBounds: null,
          } as IntersectionObserverEntry,
        ],
        this as unknown as IntersectionObserver,
      );
    }

    unobserve() {
      // no-op
    }

    disconnect() {
      // no-op
    }

    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  }

  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
}
