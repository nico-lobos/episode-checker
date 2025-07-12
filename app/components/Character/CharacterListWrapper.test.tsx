import { screen, fireEvent } from '@testing-library/react';
import { customRender } from '@/utils/test-utils';
import CharacterListWrapper from '@/components/Character/CharacterListWrapper';
import type { Character } from '@/types';
import { charactersPage1 } from '@/mock/characters';

jest.mock('./CharacterList', () => ({
  __esModule: true,
  default: ({ title, onSelect }: { title: string; onSelect: (char: Character | null) => void }) => (
    <div data-testid={`character-list-${title}`}>
      <h3>{title}</h3>
      <button onClick={() => onSelect(charactersPage1[0])}>
        Select Rick
      </button>
    </div>
  ),
}));

jest.mock('../Episode/EpisodesSection/EpisodesSection', () => ({
  __esModule: true,
  default: () => <div data-testid="episodes-section">Episodes Section</div>,
}));

jest.mock('../../../page.module.css', () => ({
  characterColumns: 'characterColumns',
  characterColumn: 'characterColumn',
  clearButtonContainer: 'clearButtonContainer',
  clearButton: 'clearButton',
}));

describe('CharacterListWrapper', () => {
  const setup = (overrides = {}) => {
    const props = {
      characters: charactersPage1,
      firstCharacter: null,
      setFirstCharacter: jest.fn(),
      secondCharacter: null,
      setSecondCharacter: jest.fn(),
      ...overrides,
    };
    customRender(<CharacterListWrapper {...props} />);
    return props;
  };

  it('renders character lists and episodes section', () => {
    setup();
    expect(screen.getByTestId('character-list-Character #1')).toBeInTheDocument();
    expect(screen.getByTestId('character-list-Character #2')).toBeInTheDocument();
    expect(screen.getByTestId('episodes-section')).toBeInTheDocument();
    expect(screen.getByTestId('clear-button-container')).toBeInTheDocument();
  });

  it('does not show clear button when no characters selected', () => {
    setup();
    expect(screen.queryByRole('button', { name: 'Clean Selection' })).not.toBeInTheDocument();
  });

  it('shows clear button when firstCharacter is selected', () => {
    setup({ firstCharacter: charactersPage1[0] });
    expect(screen.getByRole('button', { name: 'Clean Selection' })).toBeInTheDocument();
  });

  it('shows clear button when secondCharacter is selected', () => {
    setup({ secondCharacter: charactersPage1[1] });
    expect(screen.getByRole('button', { name: 'Clean Selection' })).toBeInTheDocument();
  });

  it('shows clear button when both characters are selected', () => {
    setup({ firstCharacter: charactersPage1[0], secondCharacter: charactersPage1[1] });
    expect(screen.getByRole('button', { name: 'Clean Selection' })).toBeInTheDocument();
  });

  it('calls setFirstCharacter and setSecondCharacter with null when clear button is clicked', () => {
    const setFirstCharacter = jest.fn();
    const setSecondCharacter = jest.fn();
    setup({ firstCharacter: charactersPage1[0], secondCharacter: charactersPage1[1], setFirstCharacter, setSecondCharacter });

    fireEvent.click(screen.getByRole('button', { name: 'Clean Selection' }));

    expect(setFirstCharacter).toHaveBeenCalledWith(null);
    expect(setSecondCharacter).toHaveBeenCalledWith(null);
  });

  it('has proper accessibility label on clear button', () => {
    setup({ firstCharacter: charactersPage1[0] });
    const button = screen.getByRole('button', { name: 'Clean Selection' });
    expect(button).toHaveAttribute('aria-label', 'Clean Selection');
  });
});
