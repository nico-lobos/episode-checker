import type { Character } from '@/types/character';
import type { Episode } from '@/types/episode';

export type ApiInfo = {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
};

export type PaginatedCharactersResponse = {
  info: ApiInfo;
  results: Character[];
};

export type PaginatedEpisodesResponse = {
  info: ApiInfo;
  results: Episode[];
}; 