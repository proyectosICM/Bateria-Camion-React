import { CamionesDetalles } from "./Componentes/Camiones/Detalles/camionesdetalles";
import { CamionesMenu } from "./Componentes/Camiones/Menu/caminonesmenu";
import { CamionesMenu2 } from "./Componentes/Camiones/Menu/camionesmenu2";

import { PanelIncidencias } from "./Componentes/Incidencias/panelincidendias";
import { Inicio } from "./Componentes/Pruebas/inicio";
import { Login } from "./Login/login";
import { MenuCRUD } from "./MenuCrud";
import { BateriasC } from "./TablasCRUD/BateriasCRUD/BateriasC";
import { MenuEBaterias } from "./TablasCRUD/BateriasCRUD/menuEBaterias";
import { CamionC } from "./TablasCRUD/CamionesCRUD/CamionC";
import { MenuECamiones } from "./TablasCRUD/CamionesCRUD/menuECamiones";
import { EmpresasC } from "./TablasCRUD/EmpresasCRUD/empresaC";
import { TrabajadorC } from "./TablasCRUD/TrabajadorCRUD/TrabajadorC";

import { MenuETrabajadoresE } from "./TablasCRUD/TrabajadorCRUD/menuETrabajadores";
import { CamionDetalle } from "./VistaConductor/camiondetalle";
import { IncidenciasCamion } from "./VistaConductor/incidenciasCamion";
import { Validacion } from "./VistaConductor/validacion";
import { MenuCamion } from "./VistaSupervisor/menuCamion";
import { PruebaDeVista } from "./VistaSupervisor/pruebaDeVista";
import { IncidenciasGenerales } from "./VistasComunes/Incidencias/incidenciasGenerales";
import { BarraNavValidacion } from "./VistasComunes/barraNavValidacion";

export const routes = [
    //Redireccion
    { path: '/redirec', component: <BarraNavValidacion /> },


    //Vista  conductor
    { path: '/detalles', component: <Validacion /> },
    { path: '/incidencias', component: <IncidenciasCamion /> },

    //Vista  supervisor
    { path: '/menuCamion', component: <MenuCamion /> },
    { path: 'incidenciasxc/:id_cam', component: <IncidenciasCamion />},
    { path: '/incidenciasG', component: <IncidenciasGenerales  />},

    //{ path: '/menuCamion', component: <PruebaDeVista /> }, 

    { path: '/prueba1', component: <CamionesMenu /> },
    { path: '/prueba2', component: <CamionesMenu2 /> },
    { path: '/detalles/:id', component: <CamionesDetalles /> },


    // TABLAS CRUD
    { path: '/menuCRUD', component: <MenuCRUD /> },
    { path: '/empresasCRUD', component: <EmpresasC /> },
    { path: '/trabajadoresCRUD', component: <MenuETrabajadoresE /> },
    { path: '/trabajadoresxemp/:id_emp', component: <TrabajadorC /> },
    { path: '/camionesCRUD', component: <MenuECamiones /> },
    { path: '/camionesxemp/:id_emp', component: <CamionC /> },
    { path: '/bateriasCRUD', component: <MenuEBaterias /> },
    { path: '/bateriasxemp/:id_emp', component: <BateriasC /> },

    //PANEL DE INCIDENCIAS
    { path: '/incidenciasxc/:t/:id_cam', component: <IncidenciasCamion /> },
    { path: '/incidenciasxctrabajador/:t/:id_cam', component: <IncidenciasCamion /> },
    { path: '/incidenciasGE', component: <IncidenciasGenerales /> },

    //LOGIN
    { path: '/login', component: <Login /> }
]