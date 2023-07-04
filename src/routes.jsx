import { CamionesDetalles } from "./Componentes/Camiones/Detalles/camionesdetalles";
import { CamionesMenu } from "./Componentes/Camiones/Menu/caminonesmenu";
import { CamionesMenu2 } from "./Componentes/Camiones/Menu/camionesmenu2";


import { Login } from "./Login/login";
import { BateriasC } from "./TablasCRUD/BateriasCRUD/BateriasC";
import { MenuEBaterias } from "./TablasCRUD/BateriasCRUD/menuEBaterias";

import { TrabajadorC } from "./TablasCRUD/TrabajadorCRUD/TrabajadorC";

import { MenuETrabajadoresE } from "./TablasCRUD/TrabajadorCRUD/menuETrabajadores";
import { IncidenciasCamion } from "./VistaConductor/incidenciasCamion";
import { Validacion } from "./VistaConductor/validacion";
import { CamionDetalleSupervisor } from "./VistaSupervisor/camionDetalleSupervisor";
import { MenuCamion } from "./VistaSupervisor/menuCamion";
import { WelcomeAdd } from "./VistaAdministrador/welcomeadd";
import { IncidenciasCS } from "./VistasComunes/Incidencias/incidenciasCS";
import { IncidenciasGenerales } from "./VistasComunes/Incidencias/incidenciasGenerales";
import { Redirect } from "./VistasComunes/redirect";
import { MenuCRUD } from "./VistasComunes/CRUD/MenuCrud";
import { WelcomeASis } from "./VistaASistemas/welcomeasis";
import { EmpresasC } from "./VistasComunes/CRUD/EmpresasCRUD/empresaC";
import { CamionC } from "./VistasComunes/CRUD/CamionesCRUD/CamionC";
import { MenuECamiones } from "./VistasComunes/CRUD/CamionesCRUD/menuECamiones";



export const routes = [
    //Redireccion
    { path: '/redirect', component: <Redirect /> },


    //Vista  conductor
    { path: '/detalles', component: <Validacion /> },
    { path: '/incidencias', component: <IncidenciasCamion /> },

    //Vista  supervisor
    { path: '/menuCamion', component: <MenuCamion /> },
    { path: 'incidenciasxc/:id_cam', component: <IncidenciasCS />},
    { path: '/incidenciasG', component: <IncidenciasGenerales  />},
    { path: '/detallesc/:id', component: <CamionDetalleSupervisor  />},

    //Vista Administrador
    { path: '/welcomeadd', component: <WelcomeAdd />},
    { path: '/menuCRUD', component: <MenuCRUD /> },

    //vista Administrador de Sistemas
    { path: '/welcomeasis', component: <WelcomeASis />},

    { path: '/prueba1', component: <CamionesMenu /> },
    { path: '/prueba2', component: <CamionesMenu2 /> },
    { path: '/detalles/:id', component: <CamionesDetalles /> },


    // TABLAS CRUD
    //{ path: '/menuCRUD', component: <MenuCRUD /> },
    { path: '/empresasCRUD', component: <EmpresasC /> },
    { path: '/trabajadoresCRUD', component: <MenuETrabajadoresE /> },
    { path: '/camionesxemp/:id_emp', component: <CamionC /> },
    { path: '/camionesCRUD', component: <MenuECamiones /> },

    { path: '/trabajadoresxemp/:id_emp', component: <TrabajadorC /> },

    { path: '/bateriasCRUD', component: <MenuEBaterias /> },
    { path: '/bateriasxemp/:id_emp', component: <BateriasC /> },

    //PANEL DE INCIDENCIAS
    { path: '/incidenciasxc/:t/:id_cam', component: <IncidenciasCamion /> },
    { path: '/incidenciasxctrabajador/:t/:id_cam', component: <IncidenciasCamion /> },
    { path: '/incidenciasGE', component: <IncidenciasGenerales /> },

    //LOGIN
    { path: '/login', component: <Login /> }
]