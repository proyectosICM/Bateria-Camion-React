import React from 'react';
import { render, screen } from '@testing-library/react';
import { CamionesItem } from '../VistaSupervisor/camionesItem';
import { MemoryRouter } from 'react-router-dom';

// Mock manual de axios
jest.mock('axios', () => ({
  get: jest.fn(),
}));

describe('CamionesItem', () => {
  test('renders the component', async () => {
    // Mock the necessary data and props
    const id = 1;
    const placa = 'ABC123';
    const baterias = [
      { voltaje: 12, carga: 50, corriente: 10 },
      { voltaje: 12, carga: 75, corriente: 5 },
    ];
    const incidencias = [
      { id: 1, descripcion: 'Incidencia 1' },
      { id: 2, descripcion: 'Incidencia 2' },
    ];
    const arranques = [
      { id: 1, fecha: '2023-01-01', exito: true },
      { id: 2, fecha: '2023-01-02', exito: false },
    ];

    // Render the component
    render(
      <MemoryRouter>
        <CamionesItem id={id} placa={placa} />
      </MemoryRouter>
    );

    // Assert that the rendered content matches the expected values
    expect(screen.getByText(`Placa: ${placa}`)).toBeInTheDocument();
    expect(screen.getByText('Ver detalles de registros')).toBeInTheDocument();

    // Assert that the Bateria information is present
  });
});
