import { Login } from "./login/login";

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
import { MenuEBaterias } from "./VistasComunes/CRUD/BateriasCRUD/menuEBaterias";
import { BateriasC } from "./VistasComunes/CRUD/BateriasCRUD/BateriasC";
import { TrabajadorC } from "./VistasComunes/CRUD/TrabajadorCRUD/TrabajadorC";
import { MenuETrabajadoresE } from "./VistasComunes/CRUD/TrabajadorCRUD/menuETrabajadores";
import { NoAutorizado } from "./VistasComunes/noAutorizado";
import { IncidenciasDetalles } from "./VistasComunes/Incidencias/incidenciasDetalles";
import { MenuEIncidencias } from "./VistaASistemas/menuEIncidencias";
import { MenuCamionesAS } from "./VistaASistemas/menuCamionesAS";
import { MenuECamiones } from "./VistasComunes/CRUD/CamionesCRUD/menuECamiones";
import { GraficosDetallados } from "./VistasComunes/Graficos/graficosDetallados";
import { ContenedorArranque } from "./VistasComunes/Graficos/Arranques/contenedorArranque";

export const routes = [
  //LOGIN
  { path: "/login", component: <Login /> },

  //Redireccion
  { path: "/redirect", component: <Redirect /> },

  //Vista  conductor
  { path: "/detalles", component: <Validacion /> },
  { path: "/incidencias", component: <IncidenciasCamion /> },

  //Vista  supervisor
  { path: "/menuCamion/:id", component: <MenuCamion /> },
  { path: "incidenciasxc/:id", component: <IncidenciasCS /> },
  { path: "/menuIncidencias", component: <MenuEIncidencias /> },
  { path: "/incidenciasG/:id", component: <IncidenciasGenerales /> },
  { path: "/detallesc/:id", component: <CamionDetalleSupervisor /> },
  { path: "/incidenciasdetalles/:id", component: <IncidenciasDetalles /> },

  //Vista Administrador
  { path: "/welcomeadd", component: <WelcomeAdd /> },
  { path: "/menuCRUD", component: <MenuCRUD /> },

  //vista Administrador de Sistemas
  { path: "/welcomeasis", component: <WelcomeASis /> },
  { path: "/menuECamion", component: <MenuCamionesAS /> },

  //Graficos detallados
  { path: "/GraficosDetallados/:id", component: <GraficosDetallados /> },

  // TABLAS CRUD
  //{ path: '/menuCRUD', component: <MenuCRUD /> },
  { path: "/empresasCRUD", component: <EmpresasC /> },

  { path: "/camionesCRUD", component: <MenuECamiones /> },
  { path: "/camionesxemp/:id", component: <CamionC /> },
  { path: "/bateriasCRUD", component: <MenuEBaterias /> },
  { path: "/bateriasxemp/:id", component: <BateriasC /> },

  { path: "/trabajadoresCRUD", component: <MenuETrabajadoresE /> },
  { path: "/trabajadoresxemp/:id", component: <TrabajadorC /> },

  //PANEL DE INCIDENCIAS
  { path: "/incidenciasxc/:t/:id", component: <IncidenciasCamion /> },
  { path: "/incidenciasxctrabajador/:t/:id", component: <IncidenciasCamion /> },
  { path: "/incidenciasGE", component: <IncidenciasGenerales /> },

  //No autorizado
  { path: "/notAuthorized", component: <NoAutorizado /> },

  //Grafico de arranques
  { path: "/arranques/:id", component: <ContenedorArranque /> },
  { path: "/arranquesc/:id", component: <ContenedorArranque c={"c"} /> },
];
