import { useState, useEffect } from 'react';
import type { Episode } from '@/types';
import './EpisodesList.css';
import { EPISODES_PER_PAGE } from '@/constants/pagination';

interface EpisodesListProps {
  episodes: Episode[];
  title: string;
}

export default function EpisodesList({ episodes, title }: EpisodesListProps) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(episodes.length / EPISODES_PER_PAGE);

  useEffect(() => {
    setPage(1);
  }, [episodes]);

  const startIdx = (page - 1) * EPISODES_PER_PAGE;
  const endIdx = startIdx + EPISODES_PER_PAGE;
  const episodesToShow = episodes.slice(startIdx, endIdx);

  const handlePrev = () => setPage(p => Math.max(1, p - 1));
  const handleNext = () => setPage(p => Math.min(totalPages, p + 1));

  return (
    <div className="episodes-list-root">
      <h3 className="episodes-list-title">{title || 'Episodes'}</h3>

      {episodes.length === 0 ? (
        <div className="episodes-list-empty">No episodes to show.</div>
      ) : (
        <>
          <ul className="episodes-list-ul">
            {episodesToShow.map(ep => (
              <li key={ep.id} className="episodes-list-li" data-testid={`episode-${ep.id}`}>
                <p data-testid="episode-code"><strong>{ep.episode}</strong></p>
                <p data-testid="episode-name">{ep.name}</p>
                <p data-testid="episode-air-date" className="episodes-list-airdate">
                  {ep.air_date}
                </p>
              </li>
            ))}
          </ul>

          {episodes.length > 6 && (
            <div className="episodes-list-pagination">
              <button
                className="episodes-list-arrow-btn"
                onClick={handlePrev}
                disabled={page === 1}
                aria-label="Previous page"
              >
                &#8592;
              </button>
              <span className="episodes-list-pagination-info">
                Page {page} of {totalPages}
              </span>
              <button
                className="episodes-list-arrow-btn"
                onClick={handleNext}
                disabled={page === totalPages}
                aria-label="Next page"
              >
                &#8594;
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
