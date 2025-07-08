import { render } from '@testing-library/react';
import type { Character, Episode, PaginatedCharactersResponse } from '../types';

// Custom render para envolver con providers globales si es necesario
const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, { ...options });

export * from '@testing-library/react';
export { customRender };

// Helper para mockear fetch globalmente
export function setupFetchMock(
  mockImpl: (url: string) => Promise<{
    json: () => Promise<PaginatedCharactersResponse | Character | Character[] | Episode | Episode[] | { error: string }>;
  }>
) {
  global.fetch = jest.fn(mockImpl) as jest.Mock;
} 