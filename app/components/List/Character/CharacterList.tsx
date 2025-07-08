'use client'

import React from 'react';
import CharacterCard from '../../Card/CharacterCard';
import type { Character } from '../../../types';
import './CharacterList.css';

interface CharacterListProps {
  title: string;
  selectedId: number | null;
  otherSelectedId?: number | null;
  onSelect: (character: Character) => void;
  characters: Character[];
}

export default function CharacterList({ title, selectedId, otherSelectedId, onSelect, characters }: CharacterListProps) {
  return (
    <div className="character-list-root">
      <h2 className="character-list-title">{title}</h2>
      {characters.length === 0 ? null : (
        <div className="character-list-grid" data-testid="character-list-grid">
          {characters.map(character => (
            <CharacterCard
              key={character.id}
              character={character}
              selected={selectedId === character.id}
              disabled={otherSelectedId === character.id}
              onClick={() => onSelect(character)}
            />
          ))}
        </div>
      )}
    </div>
  );
} 