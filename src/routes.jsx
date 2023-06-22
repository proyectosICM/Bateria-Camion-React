import { CamionesDetalles } from "./Componentes/Camiones/Detalles/camionesdetalles";
import { ContenedorTemperatura } from "./Componentes/Camiones/Graficos/Temperatura/contenedorTemperatura";
import { CamionesMenu } from "./Componentes/Camiones/Menu/caminonesmenu";
import { CamionesMenu2 } from "./Componentes/Camiones/Menu/camionesmenu2";
import { Inicio } from "./Componentes/Pruebas/inicio";
import { MenuCRUD } from "./MenuCrud";
import { EmpresasC } from "./TablasCRUD/EmpresasCRUD/empresaC";
import { TrabajadorC } from "./TablasCRUD/TrabajadorCRUD/TrabajadorC";

import { MenuETrabajadoresE } from "./TablasCRUD/TrabajadorCRUD/menuETrabajadores";



export const routes = [
    {path: '/', component: <Inicio /> },
    {path: '/prueba1', component:<CamionesMenu />},
    {path: '/prueba2', component:<CamionesMenu2 />},
    {path: '/detalles/:id', component: <CamionesDetalles />},
    {path: '/temperatura', component: <ContenedorTemperatura /> },

    // TABLAS CRUD
    { path: '/menuCRUD', component: <MenuCRUD /> },
    { path: '/empresasCRUD', component: <EmpresasC /> },
    { path: '/trabajadoresCRUD', component: <MenuETrabajadoresE /> },
    { path: '/trabajadoresxemp/:id_emp', component: <TrabajadorC /> }
]