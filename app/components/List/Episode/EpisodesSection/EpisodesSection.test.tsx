import { screen, waitFor, customRender } from '../../../../utils/test-utils';
import EpisodesSection from '../EpisodesSection/EpisodesSection';
import { char1, char2, episodes } from '../../../../mock/episodes';
import { setDynamicHandler } from '../../../../mock/server';
import { HttpResponse } from 'msw';

beforeEach(() => {
  setDynamicHandler((req) => {
    const url = new URL(req.url as string);
    if (url.pathname.includes('/api/character')) {
      // No characters needed for estos tests
      return undefined;
    }
    if (url.pathname.includes('/api/episode/')) {
      const ids = url.pathname.split('/').pop() ?? '';
      const idArr = ids.split(',').map(Number);
      const found = episodes.filter(e => idArr.includes(e.id));
      return HttpResponse.json(found.length === 1 ? found[0] : found);
    }
    return undefined;
  });
});

describe('EpisodesSection', () => {
  it('shows message if characters are not selected', () => {
    customRender(<EpisodesSection char1={null} char2={null} />);
    expect(screen.getByText(/selecciona ambos personajes/i)).toBeInTheDocument();
  });

  it('renders all three columns and correct episodes', async () => {
    customRender(<EpisodesSection char1={char1} char2={char2} />);
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /character #1 - only episodes/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /characters #1 & #2 - shared episodes/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /character #2 - only episodes/i })).toBeInTheDocument();
    });
    // Only episodes for char1: 1
    expect(screen.getByText(/S01E01/)).toBeInTheDocument();
    // Shared episodes: 2, 3
    expect(screen.getByText(/S01E02/)).toBeInTheDocument();
    expect(screen.getByText(/S01E03/)).toBeInTheDocument();
    // Only episodes for char2: 4
    expect(screen.getByText(/S01E04/)).toBeInTheDocument();
  });
}); 