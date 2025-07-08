'use client'

import React, { useEffect, useState } from 'react';
import EpisodesList from '../EpisodeList/EpisodesList';
import type { Character, Episode } from '../../../../types';
import './EpisodesSection.css';

interface EpisodesSectionProps {
  char1: Character | null;
  char2: Character | null;
}

function getOnlyEpisodes(episodesA: string[], episodesB: string[]) {
  return episodesA.filter(ep => !episodesB.includes(ep));
}

function getSharedEpisodes(episodesA: string[], episodesB: string[]) {
  return episodesA.filter(ep => episodesB.includes(ep));
}

async function fetchEpisodes(urls: string[]): Promise<Episode[]> {
  if (urls.length === 0) return [];
  // Extraer ids únicos
  const ids = Array.from(new Set(urls.map(u => u.split('/').pop()))).join(',');
  const res = await fetch(`https://rickandmortyapi.com/api/episode/${ids}`);
  const data = await res.json();
  if (Array.isArray(data)) return data;
  return [data];
}

export default function EpisodesSection({ char1, char2 }: EpisodesSectionProps) {
  const [only1, setOnly1] = useState<Episode[]>([]);
  const [only2, setOnly2] = useState<Episode[]>([]);
  const [shared, setShared] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setOnly1([]); setOnly2([]); setShared([]);
      if (!char1 || !char2) { setLoading(false); return; }
      const only1Urls = getOnlyEpisodes(char1.episode, char2.episode);
      const only2Urls = getOnlyEpisodes(char2.episode, char1.episode);
      const sharedUrls = getSharedEpisodes(char1.episode, char2.episode);
      const [only1Eps, only2Eps, sharedEps] = await Promise.all([
        fetchEpisodes(only1Urls),
        fetchEpisodes(only2Urls),
        fetchEpisodes(sharedUrls),
      ]);
      setOnly1(only1Eps);
      setOnly2(only2Eps);
      setShared(sharedEps);
      setLoading(false);
    }
    load();
  }, [char1, char2]);

  if (!char1 || !char2) {
    return <div className="episodes-section-info">Selecciona ambos personajes para ver los episodios.</div>;
  }

  if (loading) {
    return <div className="episodes-section-loading">Loading episodes...</div>;
  }

  return (
    <div className="episodes-section-root">
      <section className="episodes-section-col">
        <h2 className="episodes-section-title">
          Character #1 - Only Episodes
        </h2>
        <EpisodesList episodes={only1} title="" />
      </section>
      <section className="episodes-section-col">
        <h2 className="episodes-section-title">
          Characters #1 & #2 - Shared Episodes
        </h2>
        <EpisodesList episodes={shared} title="" />
      </section>
      <section className="episodes-section-col">
        <h2 className="episodes-section-title">
          Character #2 - Only Episodes
        </h2>
        <EpisodesList episodes={only2} title="" />
      </section>
    </div>
  );
} 