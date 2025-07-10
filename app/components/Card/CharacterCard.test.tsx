import { screen, fireEvent, customRender } from './../../utils/test-utils';
import CharacterCard from './CharacterCard';
import { characterCard } from './../../mock/characters';

describe('CharacterCard', () => {
  it('renders character info', () => {
    customRender(<CharacterCard character={characterCard} selected={false} onClick={() => {}} />);
    expect(screen.getByRole('img', { name: /rick sanchez/i })).toBeInTheDocument();
    expect(screen.getByText(/rick sanchez/i)).toBeInTheDocument();
    expect(screen.getByText(/alive/i)).toBeInTheDocument();
    expect(screen.getByText(/human/i)).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    customRender(<CharacterCard character={characterCard} selected={false} onClick={onClick} />);
    fireEvent.click(screen.getByText(/rick sanchez/i));
    expect(onClick).toHaveBeenCalled();
  });

  it('shows selected style', () => {
    customRender(<CharacterCard character={characterCard} selected={true} onClick={() => {}} />);
    const card = screen.getByText(/rick sanchez/i).closest('div');
    expect(card).toHaveClass('selected');
  });

  it('shows disabled message when disabled', () => {
    customRender(<CharacterCard character={characterCard} selected={false} disabled={true} onClick={() => {}} />);
    expect(screen.getByText('Seleccionado en la otra columna')).toBeInTheDocument();
    expect(screen.queryByText(/alive/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/human/i)).not.toBeInTheDocument();
  });

  it('does not call onClick when disabled', () => {
    const onClick = jest.fn();
    customRender(<CharacterCard character={characterCard} selected={false} disabled={true} onClick={onClick} />);
    fireEvent.click(screen.getByText(/rick sanchez/i));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('shows disabled style when disabled', () => {
    customRender(<CharacterCard character={characterCard} selected={false} disabled={true} onClick={() => {}} />);
    const card = screen.getByText(/rick sanchez/i).closest('div');
    expect(card).toHaveClass('disabled');
  });
}); 