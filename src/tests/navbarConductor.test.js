import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { NavBarConductor } from '../VistaConductor/navbarConductor';


// Mock de la función de logout
jest.mock('../Hooks/logout', () => ({
    Logout: jest.fn(),
}));

// Mock de la función de logout del token
jest.mock('../Hooks/logoutToken', () => ({
    LogoutToken: jest.fn(),
}));

jest.mock('axios', () => ({
    get: jest.fn(),
}));

describe('NavBarConductor', () => {
    test('rendererizado del navbar del conductor', () => {
        render(
            <BrowserRouter>
                <NavBarConductor />
            </BrowserRouter>
        );

        // Assert que el componente se renderice correctamente
        expect(screen.getByText('Inicio')).toBeInTheDocument();
        expect(screen.getByText('Incidencias')).toBeInTheDocument();
        expect(screen.getByText('Cerrar')).toBeInTheDocument();
    });

    test('handles logout', () => {
        render(
            <BrowserRouter>
                <NavBarConductor />
            </BrowserRouter>
        );

        // Simular el clic en el botón de logout
        fireEvent.click(screen.getByText('Cerrar'));

        // Assert que la función de logout se llame correctamente
        expect(jest.requireMock('../Hooks/logout').Logout).toHaveBeenCalled();
    });

    test('calls LogoutToken', () => {
        render(
            <BrowserRouter>
                <NavBarConductor />
            </BrowserRouter>
        );

        // Assert que la función de LogoutToken se llame correctamente
        expect(jest.requireMock('../Hooks/logoutToken').LogoutToken).toHaveBeenCalled();
    });
});
