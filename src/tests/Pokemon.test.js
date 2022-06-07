import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pokemon } from '../components';
import renderWithRouter from '../RenderWithRouter';
// import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon',
    () => {
      renderWithRouter(<Pokemon
        pokemon={ pokemons[0] }
        isFavorite
      />);
      screen.getByText(/pikachu/i);
      screen.getByText('Electric');
      screen.getByText(/average weight/i);
      screen.getByTestId('pokemon-name');

      const pokeImage = screen.getAllByRole('img')[0];
      const { name, image } = pokemons[0];
      expect(pokeImage).toBeInTheDocument();
      expect(pokeImage).toHaveProperty('src', image);
      expect(pokeImage).toHaveProperty('alt', `${name} sprite`);
    });

  it('Testando se há link(More Details', () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      showDetailsLink
    />);
    const linkMoreDetails = screen.queryByRole('link', { name: /more details/i });
    expect(linkMoreDetails).toBeInTheDocument();

    userEvent.click(linkMoreDetails);
    expect(history.location.pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });

  it('Teste se existe um ícone de estrela nos pokémons favoritados', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);

    const isFavoriteImage = screen.getAllByRole('img')[1];
    expect(isFavoriteImage).toBeInTheDocument();
    expect(isFavoriteImage).toHaveProperty('src', 'http://localhost/star-icon.svg');
    expect(isFavoriteImage).toHaveProperty('alt', 'Pikachu is marked as favorite');
  });
});
