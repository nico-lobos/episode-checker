'use client'
import React, { Suspense, useState, useEffect } from 'react';
import CharacterListWrapper from './components/List/Character/CharacterListWrapper';
import Spinner from './components/List/Spinner';
import type { Character } from './types';
import styles from './page.module.css';

async function fetchCharacters() {
  const res = await fetch('https://rickandmortyapi.com/api/character');
  const data = await res.json();
  return data.results as Character[];
}

export default function HomePage() {
  const [characters, setCharacters] = useState<Character[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [char1, setChar1] = useState<Character | null>(null);
  const [char2, setChar2] = useState<Character | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchCharacters()
      .then(data => {
        setCharacters(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error al cargar los personajes');
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Rick and Morty Character Episodes Explorer</h1>
      <Suspense fallback={<Spinner />}>
        {loading ? (
          <Spinner />
        ) : error ? (
          <div style={{ textAlign: 'center', color: '#b00', margin: 32 }}>
            {error}
            <button onClick={() => window.location.reload()} style={{ marginLeft: 16 }}>Refrescar</button>
          </div>
        ) : characters ? (
          <CharacterListWrapper
            characters={characters}
            char1={char1}
            setChar1={setChar1}
            char2={char2}
            setChar2={setChar2}
          />
        ) : null}
      </Suspense>
    </div>
  );
}
