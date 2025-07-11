import { useCallback } from 'react';
import CharacterList from '@/components/Character/CharacterList';
import type { Character } from '@/types';
import './CharacterListWrapper.css';
import EpisodesSection from '@/components/Episode/EpisodesSection/EpisodesSection';

interface CharacterListWrapperProps {
  characters: Character[];
  char1: Character | null;
  setChar1: (c: Character | null) => void;
  char2: Character | null;
  setChar2: (c: Character | null) => void;
}

export default function CharacterListWrapper({ characters, char1, setChar1, char2, setChar2 }: CharacterListWrapperProps) {
  const handleClearSelection = useCallback(() => {
    setChar1(null);
    setChar2(null);
  }, [setChar1, setChar2]);

  return (
    <>
      <div className="clearButtonContainer" data-testid="clear-button-container">
        {(char1 || char2) && (
          <button 
            onClick={handleClearSelection}
            className="clearButton"
            aria-label="Clean Selection"
          >
            Clean Selection
          </button>
        )}
      </div>
      <div className="characterColumns">
        <div className="characterColumn">
          <CharacterList
            title="Character #1"
            characters={characters}
            selectedId={char1?.id ?? null}
            otherSelectedId={char2?.id ?? null}
            onSelect={setChar1}
          />
        </div>
        <div className="characterColumn">
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