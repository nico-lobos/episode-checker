export const API_BASE = 'https://rickandmortyapi.com/api';

export const API_ENDPOINTS = {
  CHARACTERS: `${API_BASE}/character`,
  EPISODES: `${API_BASE}/episode`,
  EPISODES_BY_IDS: (ids: string) => `${API_BASE}/episode/${ids}`,
};