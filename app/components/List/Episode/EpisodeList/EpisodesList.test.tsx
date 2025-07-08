import { render, screen } from '@testing-library/react';
import EpisodesList from '../EpisodeList/EpisodesList';
import type { Episode } from '../../../../types';

describe('EpisodesList', () => {
  const episodes: Episode[] = [
    { id: 1, name: 'Pilot', episode: 'S01E01', air_date: 'December 2, 2013', characters: [], url: '', created: '' },
    { id: 2, name: 'Lawnmower Dog', episode: 'S01E02', air_date: 'December 9, 2013', characters: [], url: '', created: '' },
  ];

  it('renders episode items with correct format', () => {
    render(<EpisodesList episodes={episodes} title="Test Title" />);
    expect(screen.getByRole('heading', { name: /test title/i })).toBeInTheDocument();
    expect(screen.getByText(/S01E01/)).toBeInTheDocument();
    expect(screen.getByText(/Pilot/)).toBeInTheDocument();
    expect(screen.getByText(/December 2, 2013/)).toBeInTheDocument();
    expect(screen.getByText(/S01E02/)).toBeInTheDocument();
    expect(screen.getByText(/Lawnmower Dog/)).toBeInTheDocument();
    expect(screen.getByText(/December 9, 2013/)).toBeInTheDocument();
  });

  it('shows empty message if no episodes', () => {
    render(<EpisodesList episodes={[]} title="Empty" />);
    expect(screen.getByText(/no episodes to show/i)).toBeInTheDocument();
  });
}); 