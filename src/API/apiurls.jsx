// URL base común
export const base = "http://localhost:8080";
export const baseURL = "http://localhost:8080/api";
//const baseURL = "http://181.224.251.187:8081/api";
//const baseURL = "http://192.168.0.214:8081/api";

// Rutas específicas

//Listar Camion por conductor asociado
export const camionxtrabajador = `${baseURL}/camiones/camionxtrabajador/`
  
//Baterias 
export const bateriaxcamionURL = `${baseURL}/baterias/camiones`;

//Baterias Detalle
export const bateria1URL = `${baseURL}/detalles/bxc`;
export const bateria2URL = `${baseURL}/detalles/bxc`;
export const bateria3URL = `${baseURL}/detalles/bxc`;
export const bateria4URL = `${baseURL}/detalles/bxc`;
export const bateriaTURL = `${baseURL}/detalles/bateriaxdetalle/`;
export const regisbat = `${baseURL}/detalles/d/`;



//camiones
export const camionURL = `${baseURL}/camiones`;
export const camionesTURL = `${baseURL}/camiones/camxemp/`;
export const camionesHURL = `${baseURL}/camiones/habxemp/1/`;
export const camionesDURL = `${baseURL}/camiones/habxemp/0/`;
export const busesListado = `${baseURL}/buses/vista`;


//Empresas
export const empresasURL = `${baseURL}/empresas`;
export const empresasHURL = `${baseURL}/empresas/empresasH/1`;
export const empresasDURL = `${baseURL}/empresas/empresasH/0`;

//Trabajadores
export const trabajadorURL = `${baseURL}/trabajadores`;
export const trabajadorTURL = `${baseURL}/trabajadores/trabajadoresxEmpT/`;
export const trabajadorHURL = `${baseURL}/trabajadores/trabajadoresxEmpH/1/`;
export const trabajadorDURL = `${baseURL}/trabajadores/trabajadoresxEmpH/0/`;

//Baterias
export const bateriaURL = `${baseURL}/baterias`;
export const bateriaTURLH = `${baseURL}/baterias/bateriaxemp/`;
export const bateriaHURL = `${baseURL}/baterias/bateriaxempest/1/`;
export const bateriaDURL = `${baseURL}/baterias/bateriaxempest/0/`;

//Incidencias
export const IncidenciasURL = `${baseURL}/incidencias`;
export const IncidenciasxEmpresa = `${baseURL}/incidencias/empresa/`;
// Incidencias Generales por empresas
export const IncidenciasxEmpresaR = `${baseURL}/incidencias/empSR/1/`;
export const IncidenciasxEmpresaSR = `${baseURL}/incidencias/empSR/0/`;
// Incidencias Generales por camion
export const IncidenciasxCamionR = `${baseURL}/incidencias/camSR/1/`;
export const IncidenciasxCamionSR = `${baseURL}/incidencias/camSR/0/`;