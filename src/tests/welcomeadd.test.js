import { render, screen } from "@testing-library/react";
import { WelcomeAdd } from './../VistaAdministrador/welcomeadd';

jest.mock('axios', () => ({
    get: jest.fn(),
}));

describe('WelcomeAdd', () => {
    test('Renderizando bienvenida para administrador', () => {
        render(
            <WelcomeAdd />
        )
        expect(screen.getByText('Buenos dias adminisrador')).toBeInTheDocument();
    });
})