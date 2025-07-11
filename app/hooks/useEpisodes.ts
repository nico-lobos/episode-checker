import { useEffect, useState } from 'react';
import type { Character, Episode } from '@/types';
import { fetchAllEpisodes, filterEpisodesByCharacters } from '@/utils/getEpisodes';

interface EpisodeGroups {
  only1: Episode[];
  only2: Episode[];
  shared: Episode[];
}

export function useEpisodes(char1: Character | null, char2: Character | null) {
  const [episodes, setEpisodes] = useState<EpisodeGroups>({
    only1: [],
    only2: [],
    shared: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    if (!char1 || !char2) {
      setEpisodes({ only1: [], only2: [], shared: [] });
      return;
    }

    const loadEpisodes = async () => {
      setLoading(true);
      setError(null);

      try {
        const allEpisodes = await fetchAllEpisodes();
        if (isCancelled) return;

        const grouped = filterEpisodesByCharacters(allEpisodes, char1.id, char2.id);
        setEpisodes(grouped);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        if (!isCancelled) setError('Failed to load episodes');
      } finally {
        if (!isCancelled) setLoading(false);
      }
    };

    loadEpisodes();

    return () => {
      isCancelled = true;
    };
  }, [char1, char2]);

  return {
    episodes,
    isLoading: loading,
    error,
    hasData: !!char1 && !!char2 && episodes.shared.length + episodes.only1.length + episodes.only2.length > 0,
  };
}
