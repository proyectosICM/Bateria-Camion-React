import { Route, Routes, BrowserRouter as  Router} from 'react-router-dom';
import './App.css';
import { NavbarP } from './Componentes/BarraNav/navbarP';
import { Inicio } from './Componentes/Pruebas/inicio';

import { CamionesMenu } from './Componentes/Camiones/caminonesmenu';
import { CamionesMenu2 } from './Componentes/Camiones/camionesmenu2';
import { CamionesDetalles } from './Componentes/Camiones/camionesdetalles';


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
      </Routes>
    </Router>

  );
}

export default App;
