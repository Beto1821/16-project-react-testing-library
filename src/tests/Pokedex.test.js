import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../RenderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Teste o componente <Pokedex.js />', () => {
  it('Testa se um header "Encountered pokémons" é mostrado',
    () => {
      renderWithRouter(<App />);
      const headPokdex = screen.getByRole('heading', {
        level: 2,
        name: /Encountered pokémons/i,
      });
      expect(headPokdex).toBeInTheDocument();
    });

  it('Teste se é exibido o próximo pokémon da lista quando o botão é clicado',
    () => {
      renderWithRouter(<App />);
      const nextButton = screen.getByRole('button', {
        name: 'Próximo pokémon',
      });
      pokemons.forEach(({ name }) => {
        expect(screen.getByText(name)).toBeInTheDocument();
        userEvent.click(nextButton);
      });
    });

  it('Teste se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);
    expect(screen.getByText(pokemons[0].name)).toBeInTheDocument();
  });
});
