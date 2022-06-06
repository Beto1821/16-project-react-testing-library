import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import App from '../App';
import { NotFound } from '../pages';

describe('Teste o componente <NotFound.js />', () => {
  it('Teste se a página contém um heading h2 com o texto Page requested not found',
    () => {
      renderWithRouter(<NotFound />);
      const headingEl = screen.getByRole('heading', {
        name: /page requested not found/i,
        level: 2,
      });
      expect(headingEl).toBeInTheDocument();
    });
  it('Teste se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    () => {
      renderWithRouter(<NotFound />);
      const imageNotFound = screen.getByRole('img', {
        name: /pikachu crying because the page requested was not found/i,
      });
      expect(imageNotFound).toHaveProperty('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    });
});
