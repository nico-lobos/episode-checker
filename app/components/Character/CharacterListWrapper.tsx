import { useCallback } from 'react';
import CharacterList from '@/components/Character/CharacterList';
import type { Character } from '@/types';
import './CharacterListWrapper.css';
import EpisodesSection from '@/components/Episode/EpisodesSection/EpisodesSection';

interface CharacterListWrapperProps {
  characters: Character[];
  firstCharacter: Character | null;
  setFirstCharacter: (c: Character | null) => void;
  secondCharacter: Character | null;
  setSecondCharacter: (c: Character | null) => void;
}

export default function CharacterListWrapper({ characters, firstCharacter, setFirstCharacter, secondCharacter, setSecondCharacter }: CharacterListWrapperProps) {
  const handleClearSelection = useCallback(() => {
    setFirstCharacter(null);
    setSecondCharacter(null);
  }, [setFirstCharacter, setSecondCharacter]);

  return (
    <>
      <div className="clearButtonContainer" data-testid="clear-button-container">
        {(firstCharacter || secondCharacter) && (
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
            selectedId={firstCharacter?.id ?? null}
            otherSelectedId={secondCharacter?.id ?? null}
            onSelect={setFirstCharacter}
          />
        </div>
        <div className="characterColumn">
          <CharacterList
            title="Character #2"
            characters={characters}
            selectedId={secondCharacter?.id ?? null}
            otherSelectedId={firstCharacter?.id ?? null}
            onSelect={setSecondCharacter}
          />
        </div>
      </div>
      <EpisodesSection firstCharacter={firstCharacter} secondCharacter={secondCharacter} />
    </>
  );
} 