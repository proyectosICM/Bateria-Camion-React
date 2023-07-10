import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { CamionDetalle } from '../VistasComunes/camiondetalle';

describe('CamionDetalle', () => {
    afterEach(cleanup);
  
    it('should render the component', () => {
      // Render the component with props
      const { getByText } = render(
        <CamionDetalle
          camion="Camion 1"
          idc="1"
          placa="ABC123"
          incidencias={[]}
        />
      );
  
      // Assert that the component is rendered correctly
      expect(getByText('DETALLES')).toBeInTheDocument();
    });
  
    // Add more tests for other functionality
  });
  