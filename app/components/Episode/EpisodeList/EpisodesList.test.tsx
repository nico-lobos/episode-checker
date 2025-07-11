import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { customRender } from '@/utils/test-utils';
import EpisodesList from '@/components/Episode/EpisodeList/EpisodesList';
import { episodes } from '@/mock/episodes';
import { EPISODES_PER_PAGE } from '@/constants/pagination';

describe('EpisodesList', () => {
  it('renders episode items with correct format', () => {
    customRender(<EpisodesList episodes={episodes} title="Test Title" />);

    expect(screen.getByRole('heading', { name: 'Test Title' })).toBeInTheDocument();

    const ep1 = screen.getByTestId('episode-1');
    expect(within(ep1).getByTestId('episode-code')).toHaveTextContent('S01E01');
    expect(within(ep1).getByTestId('episode-name')).toHaveTextContent('Pilot');
    expect(within(ep1).getByTestId('episode-air-date')).toHaveTextContent('2013-12-02');

    const ep4 = screen.getByTestId('episode-4');
    expect(within(ep4).getByTestId('episode-code')).toHaveTextContent('S01E04');
    expect(within(ep4).getByTestId('episode-name')).toHaveTextContent('M. Night Shaym-Aliens!');
    expect(within(ep4).getByTestId('episode-air-date')).toHaveTextContent('2014-01-13');
  });

  it('shows empty message if no episodes', () => {
    customRender(<EpisodesList episodes={[]} title="Empty Title" />);
    expect(screen.getByText('No episodes to show.')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /next/i })).not.toBeInTheDocument();
  });

  it('disables Previous button on first page', () => {
    const bigList = Array.from({ length: EPISODES_PER_PAGE + 1 }, (_, i) => ({
      id: i + 1,
      name: `Ep ${i + 1}`,
      episode: `S01E${i + 1}`,
      air_date: '2023-01-01',
      characters: [],
      url: '',
      created: '',
    }));

    customRender(<EpisodesList episodes={bigList} title="Paginated" />);
    const prevButton = screen.getByRole('button', { name: /previous page/i });
    expect(prevButton).toBeDisabled();
  });

  it('disables Next button on last page', async () => {
    const bigList = Array.from({ length: EPISODES_PER_PAGE + 1 }, (_, i) => ({
      id: i + 1,
      name: `Ep ${i + 1}`,
      episode: `S01E${i + 1}`,
      air_date: '2023-01-01',
      characters: [],
      url: '',
      created: '',
    }));

    customRender(<EpisodesList episodes={bigList} title="Paginated" />);
    const nextButton = screen.getByRole('button', { name: /next page/i });
    expect(nextButton).not.toBeDisabled();

    await userEvent.click(nextButton);

    expect(screen.getByRole('button', { name: /next page/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /previous page/i })).not.toBeDisabled();
  });

  it('resets to first page if episodes change', async () => {
    const shortList = episodes.slice(0, 2);
    const longList = Array.from({ length: EPISODES_PER_PAGE + 1 }, (_, i) => ({
      id: i + 100,
      name: `Ep ${i + 1}`,
      episode: `S02E${i + 1}`,
      air_date: '2023-02-01',
      characters: [],
      url: '',
      created: '',
    }));

    const { rerender } = customRender(<EpisodesList episodes={longList} title="Reset Test" />);

    await userEvent.click(screen.getByRole('button', { name: /next page/i }));
    expect(screen.getByText(/page 2 of 2/i)).toBeInTheDocument();

    rerender(<EpisodesList episodes={shortList} title="Reset Test" />);
    expect(screen.queryByText(/page 2 of/i)).not.toBeInTheDocument();
  });
});

describe('EpisodesList - extra coverage', () => {
  it('renders default title if none is provided', () => {
    customRender(<EpisodesList episodes={episodes} title={''} />);
    expect(screen.getByRole('heading', { name: 'Episodes' })).toBeInTheDocument();
  });

  it('does not show pagination if episodes.length === 6', () => {
    const sixEpisodes = episodes.slice(0, 6);
    customRender(<EpisodesList episodes={sixEpisodes} title="Six" />);
    expect(screen.queryByRole('button', { name: /next page/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /previous page/i })).not.toBeInTheDocument();
  });

  it('shows pagination if episodes.length > 6', () => {
    const longList = Array.from({ length: 7 }, (_, i) => ({
      id: i + 1,
      name: `Ep ${i + 1}`,
      episode: `S01E${i + 1}`,
      air_date: '2023-01-01',
      characters: [],
      url: '',
      created: '',
    }));
  
    customRender(<EpisodesList episodes={longList} title="Test" />);
  
    expect(screen.getByRole('button', { name: /next page/i })).toBeInTheDocument();
  });

  it('clicking previous on page 2 goes back to page 1', async () => {
    const bigList = Array.from({ length: 8 }, (_, i) => ({
      id: i + 1,
      name: `Ep ${i + 1}`,
      episode: `S01E${i + 1}`,
      air_date: '2023-01-01',
      characters: [],
      url: '',
      created: '',
    }));
    customRender(<EpisodesList episodes={bigList} title="Paginated" />);
    const nextButton = screen.getByRole('button', { name: /next page/i });
    await userEvent.click(nextButton);
    expect(screen.getByText(/page 2 of/i)).toBeInTheDocument();
    const prevButton = screen.getByRole('button', { name: /previous page/i });
    await userEvent.click(prevButton);
    expect(screen.getByText(/page 1 of/i)).toBeInTheDocument();
  });

  it('pagination buttons have correct aria-labels', () => {
    const bigList = Array.from({ length: 8 }, (_, i) => ({
      id: i + 1,
      name: `Ep ${i + 1}`,
      episode: `S01E${i + 1}`,
      air_date: '2023-01-01',
      characters: [],
      url: '',
      created: '',
    }));
    customRender(<EpisodesList episodes={bigList} title="Paginated" />);
    expect(screen.getByRole('button', { name: /previous page/i })).toHaveAttribute('aria-label', 'Previous page');
    expect(screen.getByRole('button', { name: /next page/i })).toHaveAttribute('aria-label', 'Next page');
  });
});
