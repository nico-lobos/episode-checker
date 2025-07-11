'use client';

import { useState } from 'react';
import { useCharacters } from '@/hooks/useCharacters';
import CharacterListWrapper from '@/components/Character/CharacterListWrapper';
import Spinner from '@/components/shared/Spinner';
import type { Character } from '@/types';
import styles from './page.module.css';

export default function HomePage() {
  const { characters, loading, error } = useCharacters();
  const [char1, setChar1] = useState<Character | null>(null);
  const [char2, setChar2] = useState<Character | null>(null);

  if (loading) return <Spinner />;

  if (error) {
    return (
      <div style={{ textAlign: 'center', color: '#b00', margin: 32 }}>
        {error}
        <button onClick={() => window.location.reload()} style={{ marginLeft: 16 }}>
          Refrescar
        </button>
      </div>
    );
  }

  if (!characters) return null;

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Rick and Morty Character Episodes Explorer</h1>
      <CharacterListWrapper
        characters={characters}
        char1={char1}
        setChar1={setChar1}
        char2={char2}
        setChar2={setChar2}
      />
    </div>
  );
}
