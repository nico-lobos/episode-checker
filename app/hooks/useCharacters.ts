import { useEffect, useState } from 'react';
import type { Character } from '@/types';
import { API_ENDPOINTS } from '@/constants/api';

export function useCharacters() {
  const [characters, setCharacters] = useState<Character[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const res = await fetch(API_ENDPOINTS.CHARACTERS);
        const data = await res.json();
        setCharacters(data.results);
      } catch {
        setError('Error on loading characters');
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  return { characters, loading, error };
}
