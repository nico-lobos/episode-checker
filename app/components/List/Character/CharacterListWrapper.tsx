import React from 'react';
import CharacterList from './CharacterList';
import type { Character } from '../../../types';
import styles from '../../../page.module.css';
import EpisodesSection from '../Episode/EpisodesSection/EpisodesSection';

interface CharacterListWrapperProps {
  characters: Character[];
  char1: Character | null;
  setChar1: (c: Character | null) => void;
  char2: Character | null;
  setChar2: (c: Character | null) => void;
}

export default function CharacterListWrapper({ characters, char1, setChar1, char2, setChar2 }: CharacterListWrapperProps) {
  const handleClearSelection = () => {
    setChar1(null);
    setChar2(null);
  };

  return (
    <>
      <div className={styles.clearButtonContainer} data-testid="clear-button-container">
        {(char1 || char2) && (
          <button 
            onClick={handleClearSelection}
            className={styles.clearButton}
            aria-label="Limpiar personajes seleccionados"
          >
            Limpiar Selección
          </button>
        )}
      </div>
      <div className={styles.characterColumns}>
        <div className={styles.characterColumn}>
          <CharacterList
            title="Character #1"
            characters={characters}
            selectedId={char1?.id ?? null}
            otherSelectedId={char2?.id ?? null}
            onSelect={setChar1}
          />
        </div>
        <div className={styles.characterColumn}>
          <CharacterList
            title="Character #2"
            characters={characters}
            selectedId={char2?.id ?? null}
            otherSelectedId={char1?.id ?? null}
            onSelect={setChar2}
          />
        </div>
      </div>
      <EpisodesSection char1={char1} char2={char2} />
    </>
  );
} 