import { useEffect, useState } from 'react';
import type { Character, Episode } from '@/types';
import { fetchAllEpisodes, filterEpisodesByCharacters } from '@/utils/getEpisodes';

interface EpisodeGroups {
  onlyFirstCharacter: Episode[];
  onlySecondCharacter: Episode[];
  shared: Episode[];
}

export function useEpisodes(firstCharacter: Character | null, secondCharacter: Character | null) {
  const [episodes, setEpisodes] = useState<EpisodeGroups>({
    onlyFirstCharacter: [],
    onlySecondCharacter: [],
    shared: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    if (!firstCharacter || !secondCharacter) {
      setEpisodes({ onlyFirstCharacter: [], onlySecondCharacter: [], shared: [] });
      return;
    }

    const loadEpisodes = async () => {
      setLoading(true);
      setError(null);

      try {
        const allEpisodes = await fetchAllEpisodes();
        if (isCancelled) return;

        const grouped = filterEpisodesByCharacters(allEpisodes, firstCharacter.id, secondCharacter.id);
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
  }, [firstCharacter, secondCharacter]);

  return {
    episodes,
    isLoading: loading,
    error,
    hasData: !!firstCharacter && !!secondCharacter && episodes.shared.length + episodes.onlyFirstCharacter.length + episodes.onlySecondCharacter.length > 0,
  };
}
