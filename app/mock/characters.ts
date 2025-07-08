import type { Character } from '../types';

export const charactersPage1: Character[] = [
  { id: 1, name: 'Rick', status: 'Alive', species: 'Human', type: '', gender: 'Male', origin: { name: '', url: '' }, location: { name: '', url: '' }, image: 'img1', episode: [], url: '', created: '' },
  { id: 2, name: 'Morty', status: 'Alive', species: 'Human', type: '', gender: 'Male', origin: { name: '', url: '' }, location: { name: '', url: '' }, image: 'img2', episode: [], url: '', created: '' },
];

export const charactersPage2: Character[] = [
  { id: 3, name: 'Summer', status: 'Alive', species: 'Human', type: '', gender: 'Female', origin: { name: '', url: '' }, location: { name: '', url: '' }, image: 'img3', episode: [], url: '', created: '' },
];

export const characterCard: Character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: { name: '', url: '' },
  location: { name: '', url: '' },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: [],
  url: '',
  created: '',
}; 