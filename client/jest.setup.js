/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-undef */
import '@testing-library/jest-dom';

// These are to fix an Ant Design error.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

Object.defineProperty(window, 'matchMedia', {
  value: () => {
    return {
      matches: false,
      addListener: () => {},
      removeListener: () => {},
    };
  },
});

jest.mock('./pages-main/Dashboard/ChartContainer/ChartContainer.main', () => ({
  __esModule: true,
  default: () => null,
}));
