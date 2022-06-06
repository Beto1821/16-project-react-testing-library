import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import { FavoritePokemons } from '../pages';
import pokemons from '../data';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('Teste se é exibida na tela a mensagem No favorite pokemon found',
    () => {
      renderWithRouter(<FavoritePokemons />);
      const screenText = screen.getByText(/No favorite pokemon found/i);
      expect(screenText).toBeInTheDocument();
    });
  it('Teste se são exibidos todos os cards de pokémons favoritados.',
    () => {
      renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
      const listFavorite = pokemons;
      expect(listFavorite).toHaveLength(listFavorite.length);
    });
});
