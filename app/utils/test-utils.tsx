import { render } from '@testing-library/react';
import type { Character, Episode, PaginatedCharactersResponse } from '@/types';

const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, { ...options });

export * from '@testing-library/react';
export { customRender };

export function setupFetchMock(
  mockImpl: (url: string) => Promise<{
    json: () => Promise<PaginatedCharactersResponse | Character | Character[] | Episode | Episode[] | { error: string }>;
  }>
) {
  global.fetch = jest.fn(mockImpl) as jest.Mock;
} 