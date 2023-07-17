import React from 'react';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import { MenuCamion } from '../VistaSupervisor/menuCamion';
import { MemoryRouter } from 'react-router-dom';

// Mock manual de axios
jest.mock('axios', () => ({
  get: jest.fn(),
}));

describe('MenuCamion', () => {
  test('renders the menu of camiones', async () => {
    // Mock the API response

    const mockData = [
      { id_cam: 1, placa_cam: 'ABC123' },
      { id_cam: 2, placa_cam: 'XYZ789' },
    ];
    axios.get.mockResolvedValueOnce({ data: mockData });

    // Render the component
    render(
      <MemoryRouter>
        <MenuCamion />
      </MemoryRouter>
    );

    // Wait for the API call to be resolved
    await screen.findByText(/Placa: ABC123/);
    await screen.findByText(/Placa: XYZ789/);

    // Assert that the camiones items are rendered
    expect(screen.getByText(/Placa: ABC123/)).toBeInTheDocument();
    expect(screen.getByText(/Placa: XYZ789/)).toBeInTheDocument();
  });
});
