import type { Episode, Character } from '../types';

export const char1: Character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: { name: 'Earth (C-137)', url: '' },
  location: { name: 'Earth (Replacement Dimension)', url: '' },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: [
    'https://rickandmortyapi.com/api/episode/1',
    'https://rickandmortyapi.com/api/episode/2',
    'https://rickandmortyapi.com/api/episode/3',
  ],
  url: '',
  created: '',
};

export const char2: Character = {
  id: 2,
  name: 'Morty Smith',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: { name: 'Earth (C-137)', url: '' },
  location: { name: 'Earth (Replacement Dimension)', url: '' },
  image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
  episode: [
    'https://rickandmortyapi.com/api/episode/2',
    'https://rickandmortyapi.com/api/episode/3',
    'https://rickandmortyapi.com/api/episode/4',
  ],
  url: '',
  created: '',
};

export const episodes: Episode[] = [
  { id: 1, name: 'Pilot', episode: 'S01E01', air_date: '2013-12-02', characters: [], url: '', created: '' },
  { id: 2, name: 'Lawnmower Dog', episode: 'S01E02', air_date: '2013-12-09', characters: [], url: '', created: '' },
  { id: 3, name: 'Anatomy Park', episode: 'S01E03', air_date: '2013-12-16', characters: [], url: '', created: '' },
  { id: 4, name: 'M. Night Shaym-Aliens!', episode: 'S01E04', air_date: '2014-01-13', characters: [], url: '', created: '' },
]; 