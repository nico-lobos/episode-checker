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
      char1: null,
      setChar1: jest.fn(),
      char2: null,
      setChar2: jest.fn(),
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

  it('shows clear button when char1 is selected', () => {
    setup({ char1: charactersPage1[0] });
    expect(screen.getByRole('button', { name: 'Clean Selection' })).toBeInTheDocument();
  });

  it('shows clear button when char2 is selected', () => {
    setup({ char2: charactersPage1[1] });
    expect(screen.getByRole('button', { name: 'Clean Selection' })).toBeInTheDocument();
  });

  it('shows clear button when both characters are selected', () => {
    setup({ char1: charactersPage1[0], char2: charactersPage1[1] });
    expect(screen.getByRole('button', { name: 'Clean Selection' })).toBeInTheDocument();
  });

  it('calls setChar1 and setChar2 with null when clear button is clicked', () => {
    const setChar1 = jest.fn();
    const setChar2 = jest.fn();
    setup({ char1: charactersPage1[0], char2: charactersPage1[1], setChar1, setChar2 });

    fireEvent.click(screen.getByRole('button', { name: 'Clean Selection' }));

    expect(setChar1).toHaveBeenCalledWith(null);
    expect(setChar2).toHaveBeenCalledWith(null);
  });

  it('has proper accessibility label on clear button', () => {
    setup({ char1: charactersPage1[0] });
    const button = screen.getByRole('button', { name: 'Clean Selection' });
    expect(button).toHaveAttribute('aria-label', 'Clean Selection');
  });
});
