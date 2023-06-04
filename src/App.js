import { Route, Routes, BrowserRouter as  Router} from 'react-router-dom';
import './App.css';
import { NavbarP } from './Componentes/BarraNav/navbarP';
import { Inicio } from './Componentes/Pruebas/inicio';


import { ContenedorTemperatura } from './Componentes/Camiones/Graficos/Temperatura/contenedorTemperatura';
import { CamionesMenu } from './Componentes/Camiones/Menu/caminonesmenu';
import { CamionesMenu2 } from './Componentes/Camiones/Menu/camionesmenu2';
import { CamionesDetalles } from './Componentes/Camiones/Detalles/camionesdetalles';


function App() {
  return (
    <Router>
      <div className="App">
        <NavbarP />
      </div>
      <Routes>
        <Route exact path='/' element={<Inicio />} />
        <Route exact path='/prueba1' element={<CamionesMenu />}/>
        <Route exact path='/prueba2' element={<CamionesMenu2 />}/>
        <Route exact path='/detalles/:id' element={<CamionesDetalles />}/>
        <Route  path='/temperatura' element={<ContenedorTemperatura />}/>
      </Routes>
    </Router>

  );
}

export default App;
