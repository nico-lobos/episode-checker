'use client';

import React from 'react';
import EpisodesList from '@/components/Episode/EpisodeList/EpisodesList';
import type { Character, Episode } from '@/types';
import './EpisodesSection.css';
import { useEpisodes } from '@/hooks/useEpisodes';

interface EpisodesSectionProps {
  firstCharacter: Character | null;
  secondCharacter: Character | null;
}

export default function EpisodesSection({ firstCharacter, secondCharacter }: EpisodesSectionProps) {
  const { episodes, isLoading } = useEpisodes(firstCharacter, secondCharacter);

  if (!firstCharacter || !secondCharacter) {
    return <div className="episodes-section-info">Select two characters to see their episodes.</div>;
  }

  if (isLoading) {
    return <div className="episodes-section-loading">Loading episodes...</div>;
  }

  return (
    <div className="episodes-section-root">
      <EpisodeColumn title="Character #1 - Unique Episodes" episodes={episodes.onlyFirstCharacter} />
      <EpisodeColumn title="Characters #1 & #2 - Shared Episodes" episodes={episodes.shared} />
      <EpisodeColumn title="Character #2 - Unique Episodes" episodes={episodes.onlySecondCharacter} />
    </div>
  );
}

function EpisodeColumn({ title, episodes }: { title: string; episodes: Episode[] }) {
  return (
    <section className="episodes-section-col">
      <h2 className="episodes-section-title">{title}</h2>
      <EpisodesList episodes={episodes} title="" />
    </section>
  );
}
