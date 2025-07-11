'use client'

import { useState, useEffect, useMemo } from 'react';
import CharacterCard from '@/components/Character/CharacterCard';
import type { Character } from '@/types';
import './CharacterList.css';
import { CHARACTERS_PER_PAGE } from '@/constants/pagination';

interface CharacterListProps {
  title: string;
  selectedId: number | null;
  otherSelectedId?: number | null;
  onSelect: (character: Character) => void;
  characters: Character[];
}

export default function CharacterList({ title, selectedId, otherSelectedId, onSelect, characters }: CharacterListProps) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(characters.length / CHARACTERS_PER_PAGE);

  useEffect(() => {
    setPage(1);
  }, [characters]);

  const startIdx = (page - 1) * CHARACTERS_PER_PAGE;
  const endIdx = startIdx + CHARACTERS_PER_PAGE;

  const charactersToShow = useMemo(
    () => characters.slice(startIdx, endIdx),
    [characters, page]
  );

  const handlePrev = () => setPage(p => Math.max(1, p - 1));
  const handleNext = () => setPage(p => Math.min(totalPages, p + 1));

  return (
    <div className="character-list-root">
      <h2 className="character-list-title">{title}</h2>
      {characters.length === 0 ? null : (
        <>
          <div className="character-list-grid" data-testid="character-list-grid">
            {charactersToShow.map(character => (
              <CharacterCard
                key={character.id}
                character={character}
                selected={selectedId === character.id}
                disabled={otherSelectedId === character.id}
                onClick={() => onSelect(character)}
              />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="character-list-pagination">
              <button
                className="character-list-arrow-btn"
                onClick={handlePrev}
                disabled={page === 1}
                aria-label="Previous page"
              >
                &#8592;
              </button>
              <span className="character-list-pagination-info">
                Page {page} of {totalPages}
              </span>
              <button
                className="character-list-arrow-btn"
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