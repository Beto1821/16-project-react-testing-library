import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from '../RenderWithRouter';
import App from '../App';

const ekansInfo = '/pokemons/25';

describe('Teste o componente <PokemonDetails.js />', () => {
  beforeEach(() => {
    RenderWithRouter(<App />);
  });

  it('Teste se as informações detalhadas do pokémon selecionado são mostradas na tela:',
    () => {
      userEvent.click(screen.getByRole('button', { name: /electric/i }));
      userEvent.click(screen.getByRole('link', { name: /more details/i }));

      const moreDetails = screen.queryByRole('link', { name: /more details/i });
      expect(moreDetails).toEqual(null);

      const summaryText = screen.getByRole('heading', { name: /summary/i });
      expect(summaryText).toBeInTheDocument();

      const ekansText = screen.getByText(/This intelligent Pokémon roasts hard berries/);
      expect(ekansText).toBeInTheDocument();
    });

  it('Teste se existe uma seção com os mapas contendo as localizações do pokémon:',
    () => {
      const { history } = RenderWithRouter(<App />);
      history.push(ekansInfo);

      const locations = screen.getByRole('heading',
        { name: /Game Locations of Pikachu/ });
      expect(locations).toBeInTheDocument();

      const divImageLocations = document.querySelectorAll('.pokemon-habitat');
      expect(() => (divImageLocations.length > 0)).toBeTruthy();

      const imageLocation = screen.getAllByRole('img', { name: /pikachu location/i });
      imageLocation.forEach((element) => {
        expect(element).toHaveAttribute('src', `${element.src}`);
        expect(element).toHaveProperty('alt', `${element.alt}`);
      });
    });

  it('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const { history } = RenderWithRouter(<App />);
    history.push(ekansInfo);

    const checkBox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(checkBox).toBeInTheDocument();

    userEvent.click(checkBox);
    const startIcon = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(startIcon).toBeInTheDocument();

    userEvent.click(checkBox);
    expect(startIcon).not.toBeInTheDocument();

    const labelText = screen.getByText(/pokémon favoritado\?/i);
    expect(labelText).toBeInTheDocument();
  });
});