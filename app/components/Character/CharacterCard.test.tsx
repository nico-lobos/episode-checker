import { screen, fireEvent, customRender } from '@/utils/test-utils';
import CharacterCard from '@/components/Character/CharacterCard';
import { characterCard } from '@/mock/characters';

describe('CharacterCard', () => {
  it('renders character info', () => {
    customRender(<CharacterCard character={characterCard} selected={false} onClick={() => {}} />);
    expect(screen.getByRole('img', { name: 'Rick Sanchez'})).toBeInTheDocument();
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByTestId('status')).toHaveTextContent('Alive');
    expect(screen.getByTestId('specie')).toHaveTextContent('Human');
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    customRender(<CharacterCard character={characterCard} selected={false} onClick={onClick} />);
    fireEvent.click(screen.getByText('Rick Sanchez'));
    expect(onClick).toHaveBeenCalled();
  });

  it('shows selected style', () => {
    customRender(<CharacterCard character={characterCard} selected={true} onClick={() => {}} />);
    const card = screen.getByText('Rick Sanchez').closest('div');
    expect(card).toHaveClass('selected');
  });

  it('shows disabled message when disabled', () => {
    customRender(<CharacterCard character={characterCard} selected={false} disabled={true} onClick={() => {}} />);
    expect(screen.getByText('Already Selected')).toBeInTheDocument();
    expect(screen.queryByText('Alive')).not.toBeInTheDocument();
    expect(screen.queryByText('Human')).not.toBeInTheDocument();
  });

  it('does not call onClick when disabled', () => {
    const onClick = jest.fn();
    customRender(<CharacterCard character={characterCard} selected={false} disabled={true} onClick={onClick} />);
    fireEvent.click(screen.getByText('Rick Sanchez'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('shows disabled style when disabled', () => {
    customRender(<CharacterCard character={characterCard} selected={false} disabled={true} onClick={() => {}} />);
    const card = screen.getByText('Rick Sanchez').closest('div');
    expect(card).toHaveClass('disabled');
  });
}); 