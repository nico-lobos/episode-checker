import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import CharacterList from './CharacterList';
import { charactersPage1 } from '../../../mock/characters';

describe('CharacterList', () => {
beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ results: charactersPage1, info: { pages: 2 } })
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.resetAllMocks();
});

  it('renders characters and handles selection', async () => {
    const handleSelect = jest.fn();
    const { getByText } = render(
      <CharacterList
        title="Test List"
        selectedId={null}
        onSelect={handleSelect}
        characters={charactersPage1}
      />
    );
    await waitFor(() => {
      expect(getByText('Rick')).toBeInTheDocument();
      expect(getByText('Morty')).toBeInTheDocument();
    });
    fireEvent.click(getByText('Rick'));
    expect(handleSelect).toHaveBeenCalledWith(expect.objectContaining({ name: 'Rick' }));
  });

  it('renders correctly with only one character', async () => {
    const { getByText } = render(
      <CharacterList title="Test List" selectedId={null} onSelect={jest.fn()} characters={[charactersPage1[0]]} />
    );
    await waitFor(() => {
      expect(getByText('Rick')).toBeInTheDocument();
    });
  });

  it('renders the title correctly', () => {
    const { getByText } = render(
      <CharacterList title="Mi Título" selectedId={null} onSelect={jest.fn()} characters={charactersPage1} />
    );
    expect(getByText('Mi Título')).toBeInTheDocument();
  });

  it('disables a character if otherSelectedId matches', async () => {
    const handleSelect = jest.fn();
    const { findAllByTestId } = render(
      <CharacterList
        title="Test List"
        selectedId={null}
        otherSelectedId={1}
        onSelect={handleSelect}
        characters={charactersPage1}
      />
    );
    const cards = await findAllByTestId('character-card-btn');
    expect(cards[0]).toHaveAttribute('aria-disabled', 'true');
  });

  it('does not disable any character if otherSelectedId is undefined', async () => {
    const { findAllByTestId } = render(
      <CharacterList title="Test List" selectedId={null} onSelect={jest.fn()} characters={charactersPage1} />
    );
    const cards = await findAllByTestId('character-card-btn');
    cards.forEach(card => {
      expect(card).not.toBeDisabled();
    });
  });

  it('renders nothing if characters is empty', () => {
    const { queryAllByTestId } = render(
      <CharacterList title="Test List" selectedId={null} onSelect={jest.fn()} characters={[]} />
    );
    expect(queryAllByTestId('character-card-btn')).toHaveLength(0);
  });
}); 