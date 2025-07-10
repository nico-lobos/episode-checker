import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CharacterListWrapper from './CharacterListWrapper';
import type { Character } from '../../../types';

// Mock the CharacterList component
jest.mock('./CharacterList', () => {
  return function MockCharacterList({ title, onSelect }: { title: string; onSelect: (char: Character | null) => void }) {
    return (
      <div data-testid={`character-list-${title}`}>
        <h3>{title}</h3>
        <button onClick={() => onSelect({ id: 1, name: 'Rick', image: 'rick.jpg' } as Character)}>
          Select Rick
        </button>
      </div>
    );
  };
});

// Mock the EpisodesSection component
jest.mock('../Episode/EpisodesSection/EpisodesSection', () => {
  return function MockEpisodesSection() {
    return <div data-testid="episodes-section">Episodes Section</div>;
  };
});

// Mock the CSS module
jest.mock('../../../page.module.css', () => ({
  characterColumns: 'characterColumns',
  characterColumn: 'characterColumn',
  clearButtonContainer: 'clearButtonContainer',
  clearButton: 'clearButton',
}));

describe('CharacterListWrapper', () => {
  const mockCharacters: Character[] = [
    { id: 1, name: 'Rick', image: 'rick.jpg' } as Character,
    { id: 2, name: 'Morty', image: 'morty.jpg' } as Character,
  ];

  const mockSetChar1 = jest.fn();
  const mockSetChar2 = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders two character lists', () => {
    render(
      <CharacterListWrapper
        characters={mockCharacters}
        char1={null}
        setChar1={mockSetChar1}
        char2={null}
        setChar2={mockSetChar2}
      />
    );

    expect(screen.getByTestId('character-list-Character #1')).toBeInTheDocument();
    expect(screen.getByTestId('character-list-Character #2')).toBeInTheDocument();
    expect(screen.getByTestId('clear-button-container')).toBeInTheDocument();
  });

  it('renders episodes section', () => {
    render(
      <CharacterListWrapper
        characters={mockCharacters}
        char1={null}
        setChar1={mockSetChar1}
        char2={null}
        setChar2={mockSetChar2}
      />
    );

    expect(screen.getByTestId('episodes-section')).toBeInTheDocument();
    expect(screen.getByTestId('clear-button-container')).toBeInTheDocument();
  });

  it('does not show clear button when no characters are selected', () => {
    render(
      <CharacterListWrapper
        characters={mockCharacters}
        char1={null}
        setChar1={mockSetChar1}
        char2={null}
        setChar2={mockSetChar2}
      />
    );

    expect(screen.queryByText('Limpiar Selección')).not.toBeInTheDocument();
    // The container should still be rendered but empty
    expect(screen.getByTestId('clear-button-container')).toBeInTheDocument();
  });

  it('shows clear button when char1 is selected', () => {
    render(
      <CharacterListWrapper
        characters={mockCharacters}
        char1={mockCharacters[0]}
        setChar1={mockSetChar1}
        char2={null}
        setChar2={mockSetChar2}
      />
    );

    expect(screen.getByText('Limpiar Selección')).toBeInTheDocument();
    expect(screen.getByTestId('clear-button-container')).toBeInTheDocument();
  });

  it('shows clear button when char2 is selected', () => {
    render(
      <CharacterListWrapper
        characters={mockCharacters}
        char1={null}
        setChar1={mockSetChar1}
        char2={mockCharacters[1]}
        setChar2={mockSetChar2}
      />
    );

    expect(screen.getByText('Limpiar Selección')).toBeInTheDocument();
    expect(screen.getByTestId('clear-button-container')).toBeInTheDocument();
  });

  it('shows clear button when both characters are selected', () => {
    render(
      <CharacterListWrapper
        characters={mockCharacters}
        char1={mockCharacters[0]}
        setChar1={mockSetChar1}
        char2={mockCharacters[1]}
        setChar2={mockSetChar2}
      />
    );

    expect(screen.getByText('Limpiar Selección')).toBeInTheDocument();
    expect(screen.getByTestId('clear-button-container')).toBeInTheDocument();
  });

  it('calls setChar1 and setChar2 with null when clear button is clicked', () => {
    render(
      <CharacterListWrapper
        characters={mockCharacters}
        char1={mockCharacters[0]}
        setChar1={mockSetChar1}
        char2={mockCharacters[1]}
        setChar2={mockSetChar2}
      />
    );

    const clearButton = screen.getByText('Limpiar Selección');
    fireEvent.click(clearButton);

    expect(mockSetChar1).toHaveBeenCalledWith(null);
    expect(mockSetChar2).toHaveBeenCalledWith(null);
  });

  it('has proper accessibility attributes on clear button', () => {
    render(
      <CharacterListWrapper
        characters={mockCharacters}
        char1={mockCharacters[0]}
        setChar1={mockSetChar1}
        char2={null}
        setChar2={mockSetChar2}
      />
    );

    const clearButton = screen.getByText('Limpiar Selección');
    expect(clearButton).toHaveAttribute('aria-label', 'Limpiar personajes seleccionados');
  });
}); 