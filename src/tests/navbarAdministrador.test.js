import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { NavBarAdministrador } from '../VistaAdministrador/navbarAdministrador';


// Mock de la función de logout
jest.mock('../Hooks/logout', () => ({
  Logout: jest.fn(),
}));

jest.mock('axios', () => ({
    get: jest.fn(),
  }));

describe('NavBarAdministrador', () => {
  test('renderizando el navbar para el administrador', () => {
    render(
      <BrowserRouter>
        <NavBarAdministrador />
      </BrowserRouter>
    );

    // Assert que el componente se renderice correctamente
    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.getByText('Menu')).toBeInTheDocument();
    expect(screen.getByText('Incidencias')).toBeInTheDocument();
    expect(screen.getByText('Administrativo')).toBeInTheDocument();
    expect(screen.getByText('Cerrar')).toBeInTheDocument();
  });

  test('handles logout', () => {
    render(
      <BrowserRouter>
        <NavBarAdministrador />
      </BrowserRouter>
    );

    // Simular el clic en el botón de logout
    fireEvent.click(screen.getByText('Cerrar'));

    // Assert que la función de logout se llame correctamente
    expect(jest.requireMock('../Hooks/logout').Logout).toHaveBeenCalled();
  });
});
