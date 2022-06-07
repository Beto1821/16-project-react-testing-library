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
});
