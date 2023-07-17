import React from 'react';
import { render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';

import { BsBatteryHalf } from 'react-icons/bs';
 
import { InfoTReal } from '../Common/infoReal';

describe('InfoTReal', () => {
  it('debería mostrar el título y el valor correctamente de la bateria en tiempo real', () => {
    const titulo = 'Voltaje';
    const valor = '10 v';

    render(<InfoTReal titulo={titulo} valor={valor} />);

    const tituloElement = screen.getByText(titulo);
    const valorElement = screen.getByText(valor);

    expect(tituloElement).toBeInTheDocument();
    expect(valorElement).toBeInTheDocument();
  });

  it('debería mostrar el icono correspondiente según el título en la tabla de bateria', () => {
    const titulo = 'Carga';

    render(<InfoTReal titulo={titulo} valor="50 %" />);

    const iconoElement = screen.getByTestId(`icono-${titulo}`);
    const cargaIcono = renderToString(<BsBatteryHalf />);

    expect(iconoElement).toBeInTheDocument();
    expect(iconoElement.innerHTML).toEqual(cargaIcono);
  });
});
