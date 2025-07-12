import type { Episode, Character } from '@/types';

export function extractEpisodeId(url: string): string {
  const match = url.match(/(\d+)\/?$/);
  return match?.[1] ?? url;
}

export async function fetchAllEpisodes(): Promise<Episode[]> {
  let allEpisodes: Episode[] = [];
  let nextUrl: string | null = '/api/episode';

  while (nextUrl) {
    const res = await fetch(nextUrl);

    if (!res.ok) {
      throw new Error(`Failed to fetch episodes from ${nextUrl}`);
    }

    const data: { info?: { next?: string | null }; results?: Episode[] } = await res.json();
    const results = Array.isArray(data.results) ? data.results : [];

    allEpisodes = allEpisodes.concat(results);
    nextUrl = data.info?.next ?? null;
  }

  return allEpisodes;
}

export function filterEpisodesByCharacters(
  episodes: Episode[],
  id1: number,
  id2: number
) {
  const shared: Episode[] = [];
  const onlyFirstCharacter: Episode[] = [];
  const onlySecondCharacter: Episode[] = [];

  episodes.forEach((ep) => {
    const characterIds = (ep.characters as (Character | string)[]).map((c) =>
      typeof c === 'object' ? c.id : Number((c as string).split('/').pop())
    );

    const has1 = characterIds.includes(id1);
    const has2 = characterIds.includes(id2);

    if (has1 && has2) shared.push(ep);
    else if (has1) onlyFirstCharacter.push(ep);
    else if (has2) onlySecondCharacter.push(ep);
  });

  return { shared, onlyFirstCharacter, onlySecondCharacter };
}

export async function fetchEpisodes(urls: string[]): Promise<Episode[]> {
  if (urls.length === 0) return [];
  const ids = Array.from(new Set(urls.map(extractEpisodeId))).join(',');
  const res = await fetch(`https://rickandmortyapi.com/api/episode/${ids}`);

  if (!res.ok) throw new Error('Failed to fetch episodes');

  const data = await res.json();
  return Array.isArray(data) ? data : [data as Episode];
}
