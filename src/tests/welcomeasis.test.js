import { render, screen } from "@testing-library/react"
import { WelcomeASis } from "../VistaASistemas/welcomeasis"

jest.mock('axios', () => ({
    get: jest.fn(),
}));

describe('WelcomeAsis', () => {
    test('renderizando la bienvenida para administrador de sistemas', () => {
        render(
            <WelcomeASis />
        )
        expect(screen.getByText('Buenos dias Administrador de sistema')).toBeInTheDocument();
    });


})