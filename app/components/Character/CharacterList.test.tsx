import { screen, fireEvent, waitFor, customRender } from '@/utils/test-utils';
import CharacterList from '@/components/Character/CharacterList';
import { charactersPage1 } from '@/mock/characters';
import userEvent from '@testing-library/user-event';
import { CHARACTERS_PER_PAGE } from '@/constants/pagination';

const baseProps = {
  title: 'Test List',
  selectedId: null,
  onSelect: jest.fn(),
  characters: charactersPage1,
};

const renderComponent = (props = {}) =>
  customRender(<CharacterList {...baseProps} {...props} />);

describe('CharacterList', () => {
  it('renders characters and handles selection', async () => {
    const onSelect = jest.fn();
    renderComponent({ onSelect });

    await waitFor(() => {
      expect(screen.getByText('Rick')).toBeInTheDocument();
      expect(screen.getByText('Morty')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Rick'));
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ name: 'Rick' }));
  });

  it('renders with only one character', async () => {
    renderComponent({ characters: [charactersPage1[0]] });

    await waitFor(() => {
      expect(screen.getByText('Rick')).toBeInTheDocument();
    });
  });

  it('renders the title correctly', () => {
    renderComponent({ title: 'Title' });
    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  it('disables a character if otherSelectedId matches', async () => {
    renderComponent({ otherSelectedId: 1 });

    const cards = await screen.findAllByTestId('character-card-btn');
    expect(cards[0]).toHaveAttribute('aria-disabled', 'true');
  });

  it('does not disable any character if otherSelectedId is undefined', async () => {
    renderComponent();

    const cards = await screen.findAllByTestId('character-card-btn');
    cards.forEach(card => {
      expect(card).not.toBeDisabled();
    });
  });

  it('renders nothing if characters is empty', () => {
    renderComponent({ characters: [] });
    expect(screen.queryAllByTestId('character-card-btn')).toHaveLength(0);
  });
});

describe('CharacterList pagination behavior', () => {
  const longList = Array.from({ length: CHARACTERS_PER_PAGE + 3 }, (_, i) => ({
    ...charactersPage1[0],
    id: i + 1,
    name: `Char ${i + 1}`,
  }));

  it('shows pagination when characters exceed per-page limit', () => {
    renderComponent({ characters: longList });

    expect(screen.getByRole('button', { name: /next page/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /previous page/i })).toBeInTheDocument();
    expect(screen.getByText(/page 1 of 2/i)).toBeInTheDocument();
  });

  it('disables previous button on first page', () => {
    renderComponent({ characters: longList });
    expect(screen.getByRole('button', { name: /previous page/i })).toBeDisabled();
  });

  it('disables next button on last page', async () => {
    renderComponent({ characters: longList });

    const nextBtn = screen.getByRole('button', { name: /next page/i });
    await userEvent.click(nextBtn);

    expect(screen.getByText(/page 2 of 2/i)).toBeInTheDocument();
    expect(nextBtn).toBeDisabled();
  });

  it('navigates between pages correctly', async () => {
    renderComponent({ characters: longList });

    const nextBtn = screen.getByRole('button', { name: /next page/i });
    const prevBtn = screen.getByRole('button', { name: /previous page/i });

    await userEvent.click(nextBtn);
    expect(screen.getByText(/page 2 of 2/i)).toBeInTheDocument();
    expect(prevBtn).not.toBeDisabled();

    await userEvent.click(prevBtn);
    expect(screen.getByText(/page 1 of 2/i)).toBeInTheDocument();
  });

  it('resets to first page when characters list changes', async () => {
    const { rerender } = customRender(<CharacterList {...baseProps} characters={longList} />);

    const nextBtn = screen.getByRole('button', { name: /next page/i });
    await userEvent.click(nextBtn);
    expect(screen.getByText(/page 2 of 2/i)).toBeInTheDocument();

    rerender(<CharacterList {...baseProps} characters={[charactersPage1[0]]} />);
    expect(screen.queryByText(/page 2 of/i)).not.toBeInTheDocument();
  });
});
