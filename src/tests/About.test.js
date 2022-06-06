import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import { About } from '../pages';

describe('Teste o componente <About.js />', () => {
  it('Testa se um header é mostrado',
    () => {
      renderWithRouter(<About />);
      const headPokdex = screen.getByRole('heading', {
        level: 2,
        name: /about pokédex/i,
      });
      expect(headPokdex).toBeInTheDocument();
    });
  it('Testa se a página contém dois parágrafos',
    () => {
      renderWithRouter(<About />);
      expect(screen.getByText(/This application simulates a Pokédex/))
        .toBeInTheDocument();
    });

  it('Teste se a página contém a imágemde uma Pokédex',
    () => {
      renderWithRouter(<About />);
      const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
      const img = screen.getByRole('img');
      expect(img.src).toBe(url);
    });
});
