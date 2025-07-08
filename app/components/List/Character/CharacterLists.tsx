import React from 'react';
import CharacterList from './../Character/CharacterList';
import type { Character } from '../../../types';
import styles from '../../page.module.css';
import EpisodesSection from '../Episode/EpisodesSection/EpisodesSection';

interface CharacterListsProps {
  characters: Character[];
  char1: Character | null;
  setChar1: (c: Character) => void;
  char2: Character | null;
  setChar2: (c: Character) => void;
}

export default function CharacterLists({ characters, char1, setChar1, char2, setChar2 }: CharacterListsProps) {
  return (
    <>
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