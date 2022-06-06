import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../RenderWithRouter';

describe('Teste o componente <App.js />', () => {
  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação:',
    () => {
      renderWithRouter(<App />);
      const linkHome = screen.getByRole('link', { name: /home/i });
      const linkAbout = screen.getByRole('link', { name: /about/i });
      const linkFavorite = screen.getByRole('link', { name: /favorite pokémons/i });

      expect(linkHome).toBeInTheDocument();
      expect(linkAbout).toBeInTheDocument();
      expect(linkFavorite).toBeInTheDocument();
    });

  it('Teste se redirecionada para a página inicial, na URL / clicar link Home;',
    () => {
      const { history } = renderWithRouter(<App />);
      expect(history.location.pathname).toBe('/');
    });
  it('Teste se redirecionada para a página About, na URL / clicar link About;',
    () => {
      const { history } = renderWithRouter(<App />);
      userEvent.click(screen.getByRole('link', { name: /about/i }));
      expect(history.location.pathname).toBe('/about');
    });
});
