import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';
import './App.css';
import { NavbarP } from './Componentes/BarraNav/navbarP';

// Rutas
import { routes } from './routes';
import { Login } from './Login/login';
import { Welcome } from './Login/welcome';

function App() {
  const token = localStorage.getItem('token');
  return (
    <Router>
      <div className="App">
      </div>
      <Routes>
      <Route
          path="/"
          element={token ? <Navigate to="/welcome" /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />

        {routes.map((route, index) => (
          <Route key={index} exact path={route.path} element={route.component} />
        ))}
      </Routes>
    </Router>

  );
}

export default App;
