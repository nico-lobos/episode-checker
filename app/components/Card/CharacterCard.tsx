import React from 'react';
import type { Character } from '../../types';
import './CharacterCard.css';

interface CharacterCardProps {
  character: Pick<Character, 'id' | 'name' | 'status' | 'species' | 'image'>;
  selected: boolean;
  disabled?: boolean;
  onClick: () => void;
}

export default function CharacterCard({ character, selected, disabled, onClick }: CharacterCardProps) {
  return (
    <div
      onClick={disabled ? undefined : onClick}
      className={`character-card${selected ? ' selected' : ''}${disabled ? ' disabled' : ''}`}
      aria-disabled={disabled}
      data-testid="character-card-btn"
    >
      <img src={character.image} alt={character.name} className="character-card-img" />
      <h3 className="character-card-name">{character.name}</h3>
      <div className="character-card-status">Status: {character.status}</div>
      <div className="character-card-species">Species: {character.species}</div>
      {disabled && <div className="character-card-disabled-msg">Seleccionado en la otra columna</div>}
    </div>
  );
} 