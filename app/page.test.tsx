import React from 'react';
import { render, waitFor } from '@testing-library/react';
import HomePage from '@/page';

jest.mock('./components/Character/CharacterListWrapper', () => ({
  __esModule: true,
  default: () => <div data-testid="wrapper">Wrapper</div>
}));
jest.mock('./components/shared/Spinner', () => ({
  __esModule: true,
  default: () => <div>Loading...</div>
}));

describe('HomePage', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('muestra el spinner mientras carga', () => {
    (global.fetch as jest.Mock) = jest.fn(() => new Promise(() => {}));
    const { getByText } = render(<HomePage />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('muestra el mensaje de error y el botón de refrescar si fetch falla', async () => {
    (global.fetch as jest.Mock) = jest.fn(() => Promise.reject('API error'));
    const { getByText, getByRole } = render(<HomePage />);
    await waitFor(() => {
      expect(getByText(/error/i)).toBeInTheDocument();
      expect(getByRole('button', { name: /refrescar/i })).toBeInTheDocument();
    });
  });

  it('renderiza el wrapper con personajes si fetch es exitoso', async () => {
    (global.fetch as jest.Mock) = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({ results: [{ id: 1, name: 'Rick' }], info: { pages: 1 } })
    }));
    const { getByTestId } = render(<HomePage />);
    await waitFor(() => {
      expect(getByTestId('wrapper')).toBeInTheDocument();
    });
  });
}); 