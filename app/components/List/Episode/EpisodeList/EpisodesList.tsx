import React from 'react';
import type { Episode } from '../../../../types';
import './EpisodesList.css';

interface EpisodesListProps {
  episodes: Episode[];
  title: string;
}

export default function EpisodesList({ episodes, title }: EpisodesListProps) {
  return (
    <div className="episodes-list-root">
      <h3 className="episodes-list-title">{title || 'Episodes'}</h3>
      {episodes.length === 0 ? (
        <div className="episodes-list-empty">No episodes to show.</div>
      ) : (
        <ul className="episodes-list-ul">
          {episodes.map(ep => (
            <li key={ep.id} className="episodes-list-li">
              <strong>{ep.episode}</strong>: {ep.name} <span className="episodes-list-airdate">({ep.air_date})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 